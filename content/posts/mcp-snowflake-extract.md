---
title: Using MCP Architecture for Data Extraction into Snowflake
date: 2025-04-01
tags:
  - MCP
  - Snowflake
  - LLM
  - C#
social_image: /media/snowflake-mcp.jpg
description: Learn how to leverage the Model Context Protocol (MCP) with Snowflake and Ollama-hosted LLMs for seamless, developer-first data extraction workflows.
---

## Context

Imagine you're building a system that allows users to extract and analyse operational data from a MySQL database directly into a Snowflake staging table. Instead of building dedicated APIs or writing custom scripts for each use case, you want to enable an LLM to orchestrate this process dynamically using tools.

This is where the **Model Context Protocol (MCP)** shines—allowing you to expose rich data movement tools over a protocol interface and enabling a local LLM (powered by Ollama + LLaMA) to invoke these tools with natural language queries.

---

## Architecture Overview

The flow looks like this:

User ↔ LLM (LLaMA via Ollama) ↔ MCP Client ↔ MCP Server (MySQL + Snowflake)


- **MCP Server** connects to both MySQL and Snowflake, and exposes tools:
  - `ListTablesTool`: lists tables in MySQL
  - `CopyToSnowflakeTool`: copies MySQL table data to a Snowflake staging table
  - `SnowflakeQueryTool`: runs analytical queries on the staged data

- **MCP Client** connects to the server and exposes these tools to a local LLaMA model using Ollama.

---

## Example MCP Server Tooling (Python)

Here's a basic `server.py` that defines your tools:

```python
from mcp_sdk import McpServer
from tools.mysql_tools import ListTablesTool, CopyToSnowflakeTool
from tools.snowflake_tools import SnowflakeQueryTool

server = McpServer()
server.register_tool(ListTablesTool())
server.register_tool(CopyToSnowflakeTool())
server.register_tool(SnowflakeQueryTool())

server.run()
```

You’d implement each tool class using relevant connectors like mysql-connector-python and snowflake-connector-python.

## MCP Client in C# with Ollama

Here's how we spin up the C# client using ModelContextProtocol.Client and connect to the server and Ollama-hosted LLM:

```csharp
using OpenAI.Chat;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using ModelContextProtocol.Client;
using ModelContextProtocol.Protocol.Transport;
using Ollama;

var builder = Host.CreateEmptyApplicationBuilder(settings: null);
builder.Configuration.AddUserSecrets<Program>();

var (command, arguments) = args switch
{
    [var script] when script.EndsWith(".py") => ("python", script),
    [var script] when script.EndsWith(".js") => ("node", script),
    [var script] when Directory.Exists(script) || (File.Exists(script) && script.EndsWith(".csproj")) => ("dotnet", $"run --project {script} --no-build"),
    _ => throw new NotSupportedException("An unsupported server script was provided. Supported scripts are .py, .js, or .csproj")
};

await using var mcpClient = await McpClientFactory.CreateAsync(new()
{
    Id = "demo-server",
    Name = "Demo Server",
    TransportType = TransportTypes.StdIo,
    TransportOptions = new()
    {
        ["command"] = command,
        ["arguments"] = arguments,
    }
});

var tools = await mcpClient.ListToolsAsync();
foreach (var tool in tools)
{
    Console.WriteLine($"Connected to server with tools: {tool.Name}");
}

var ollamaChatClient = new OllamaChatClient(new Uri("http://localhost:11434"), "llama3.2:latest");
var client = new ChatClientBuilder(ollamaChatClient)
    .UseFunctionInvocation()
    .Build();

var options = new ChatOptions
{
    MaxOutputTokens = 1000,
    ModelId = "llama3.2:latest",
    Tools = [.. tools]
};

while (true)
{
    Console.WriteLine("MCP Client Started!");
    Console.WriteLine("Type your queries or 'quit' to exit.");

    string? query = Console.ReadLine();

    if (string.Equals(query, "quit", StringComparison.OrdinalIgnoreCase))
        break;

    var response = client.GetStreamingResponseAsync(query, options);

    await foreach (var message in response)
    {
        Console.Write(message.Text);
    }
    Console.WriteLine();
}
```
You can swap out Ollama with any LLM model of your choice—just make sure the package implements `IChatClient` so it can plug into the `ChatClientBuilder` without issue.

## Example Queries

Once wired up, you can start running natural language prompts like:

* Show me all the tables in the MySQL database.
* Copy the transactions table to Snowflake for March 2024.
* Run a query in Snowflake to get total sales by month.

The LLaMA model uses function calling to invoke the appropriate tool registered on the MCP server.

## Benefits
✅ No hardcoding workflows
✅ Language-native developer experience
✅ Composable tools that scale
✅ Can run locally without cloud LLMs

## Conclusion

Using MCP with Snowflake and Ollama creates a powerful, extensible developer experience where natural language queries can perform complex ETL and analytics operations. Whether you're prototyping locally or building production-grade workflows, MCP offers a clean, scalable path.

Stay tuned for a future post where we hook this up to a frontend chat interface! 🚀