---
title: Blob Trigger vs Event Grid Trigger
date: 2023-03-13
tags:
  - Azure
  - Blobs
social_image: /media/rocket.jpg
description: Learn about Blob Trigger vs Event Grid Trigger.
---

The Blob storage trigger starts a function when a new or updated blob is detected. The blob contents are provided as input to the function. The Event Grid trigger has built-in support for blob events and can also be used to start a function when a new or updated blob is detected. When using the Blob storage trigger, you can directly access the content of the new or updated blob. Use Event Grid instead of the Blob storage trigger for the following scenarios:

• Blob storage accounts: Blob storage accounts are supported for blob input and output bindings but not for blob triggers. Blob storage triggers require a general-purpose storage account. 

• High scale: high scale can be loosely defined as containers that have more than 100,000 blobs in them or storage accounts that have more than 100 blob updates per second. 

• Minimizing latency: if your function app is on the Consumption plan, there can be up to a 10-minute delay in processing new blobs if a function app has gone idle. To avoid this latency, you can switch to an App Service plan with Always On enabled. You can also use an Event Grid trigger with your Blob storage account. 

• Blob delete events: you cannot handle blob delete events with the Blob Storage trigger
