---
external: false
draft: false
title: Client vs Server Components 
description: What are they and when to use them.
date: 2024-05-21
readingMinutes: '8'
---

# Client

- refers to the browser on a user’s device that sends a request to a server for your application code. It then turns the response it receives from the server into an interface the user can interact with.
- Client Components allow you to write interactive UI that is prerendered on the server and can use client JavaScript to run in the browser. They also can use state, effects, and event listeners, meaning they can provide immediate feedback to the user and update the UI. ```++++``` have access to browser APIs, like geolocation or localStorage.

# Server

- The server refers to the computer in a data center that stores your application code, receives requests from a client, does some computation, and sends back an appropriate response.
Server Components allow you to write UI that can be rendered and optionally cached on the server. 


# Benefits

| **Server**   | **Client**     |
| --------- | -------- |
|  Data Fetching | Interactivity |
|  Security | Browser APIs |
| Caching | Immediate feedback to user + update UI |
| Performance | |
| Initial Page Load & FCP | |
| SEO & SNS | |
| Streaming | |

# When to use?

| What do you need to do? | **Server**   | **Client**     |
| --------- | -------- | --------- |
| Fetch data | X |  |
| Access backend resources (directly) | X |  |
| Keep sensitive information on the server | X |  |
| Keep large dependencies on the server / Reduce client-side JavaScript | X |  |
| Add interactivity and event listeners |  | X |
| Use State and Lifecycle Effects |  | X |
| Use browser-only APIs |  | X |
| Use custom hooks that depend on state, effects, or browser-only APIs |  | X |
| Use React Class components (deprecated) |  | X |


### Next.js

> In Next.js, the rendering work is further split by route segments to enable streaming and partial rendering, and there are three different server rendering strategies: Static Rendering , Dynamic Rendering , Streaming
