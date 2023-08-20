---
title: Integrating CubeJS with Databricks
date: 2023-07-12
tags:
  - Databricks
  - CubeJS
social_image: /media/rocket.jpg
description: Leveraging CubeJS and Databricks for Powerful Enterprise Data Applications at the Best Price
---

In today's data-driven world, businesses are increasingly relying on robust data applications to gain valuable insights and make informed decisions. As developers, we understand the significance of such tools and have explored various combinations over time. One integration that truly impressed us is the seamless collaboration between CubeJS and Databricks. Let's dive into our personal experience and explore how this powerful combination can elevate your data engineering capabilities.

## Understanding CubeJS

CubeJS has been a game-changer for us as an open-source analytical API platform. What sets it apart is its ability to empower developers like us to create interactive data applications with ease and speed. Acting as a middleware layer between data sources and the frontend, CubeJS streamlines data retrieval and aggregation processes. It cleverly abstracts complex SQL queries and implements data pre-aggregation, resulting in faster query performance. With these powerful features, building interactive dashboards, visualizations, and real-time analytics applications becomes a breeze.

## Exploring Databricks

Our journey with Databricks has been nothing short of impressive. As a cloud-based big data processing and analytics platform, it offers a unified analytics workspace, seamlessly integrating data engineering and data science capabilities. Leveraging the power of Apache Spark, Databricks handles large-scale data processing tasks effectively. We were particularly drawn to its scalable infrastructure that effortlessly processes and analyzes data from diverse sources, including batch and streaming data.

We've even written about our positive experiences with Databricks in a blog post titled ["Unifying Your Data Culture with Databricks"](https://cjw-dev.com/blog/Unifying-Your-Data-Culture-with-Databricks/). In that blog, we delved deeper into how Databricks can bring together data teams and foster a cohesive data culture within organizations.

## Setting up CubeJS with Databricks

Integrating CubeJS with Databricks opens up new possibilities for your data engineering projects. If you want to get started quickly, you can refer to the following GitHub repository for a detailed guide on how to set up CubeJS with Databricks:

[GitHub Repo: CallumWalterWhite/databricks-cubejs](https://github.com/CallumWalterWhite/databricks-cubejs)

This repository contains step-by-step instructions and code samples to help you seamlessly integrate CubeJS with Databricks. It's a fantastic resource to get you up and running with the integration in no time.

## Personal Success with the Integration

Having used CubeJS and Databricks in tandem for a Proof of Concept (PoC), we were amazed at how well they complemented each other. The combination of CubeJS' simplified querying and aggregation with Databricks' scalable infrastructure provided us with advanced analytics capabilities that surpassed our expectations.

1. Advanced Analytics Made Easy: CubeJS took the complexity out of querying and aggregation, while Databricks efficiently processed vast datasets. This perfect synergy enabled us to perform ad hoc queries, complex aggregations, and even delve into machine learning tasks seamlessly.

2. Scaling to Handle the Data Deluge: With Databricks leveraging the power of Apache Spark, we experienced no hurdles in processing massive datasets. This scalability is invaluable for enterprise-level applications that deal with substantial data volumes and require lightning-fast query performance.

3. Cost-Effectiveness at Its Core: Building data applications need not be expensive. With CubeJS being open-source and Databricks providing a pay-as-you-go model, we appreciated the cost-effectiveness of this integration. It allowed us to create powerful data applications without breaking the bank.

4. Real-Time Data Analytics: CubeJS and Databricks together opened the doors to real-time data analytics. By configuring CubeJS to listen for data changes and Databricks to handle streaming data, we gained timely insights for critical business decisions.

## Embrace the Power of CubeJS and Databricks

In conclusion, our experience integrating CubeJS with Databricks was nothing short of transformative. This combination offers a winning solution for building comprehensive data applications with ease, efficiency, and cost-effectiveness. Whether you're working on interactive dashboards, real-time analytics, or intricate ad hoc queries, embracing the synergy of CubeJS and Databricks will elevate your data engineering efforts to new heights.

![Databricks Logo](https://cubedev-blog-images.s3.us-east-2.amazonaws.com/53a4b96e-e846-4d5e-88d7-515b3fcb407d.png)

### JavaScript Schema Example

```javascript
cube(`users`, {
  sql_table: `users`,
 
  joins: {
    organizations: {
      relationship: `many_to_one`,
      sql: `${users.organization_id} = ${organizations.id}`,
    },
  },
 
  measures: {
    count: {
      type: `count`,
      sql: `id`,
    },
  },
 
  dimensions: {
    organization_id: {
      sql: `organization_id`,
      type: `number`,
      primary_key: true,
    },
 
    created_at: {
      sql: `created_at`,
      type: `time`,
    },
 
    country: {
      sql: `country`,
      type: `string`,
    },
  },
});
```

### YAML Schema Example

```yaml
cubes:
  - name: users
    sql_table: users
 
    joins:
      - name: organizations
        relationship: many_to_one
        sql: "{CUBE.organization_id} = {organizations.id}"
 
    measures:
      - name: count
        type: count
        sql: id
 
    dimensions:
      - name: organization_id
        sql: organization_id
        type: number
        primary_key: true
 
      - name: created_at
        sql: created_at
        type: time
 
      - name: country
        sql: country
        type: string
```

Remember, what makes this combination truly exceptional is not just the technical prowess but the ability to host it yourself. So, explore and unleash the full potential of your enterprise data, and embark on a data-driven journey that yields invaluable insights for your organisation. Happy data engineering!



