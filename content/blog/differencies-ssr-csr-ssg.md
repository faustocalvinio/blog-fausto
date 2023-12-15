---
external: false
url: 
title: SSR - CSR - SSG differencies
description: Lorem Ipsum Description
date: 2023-11-28
readingMinutes: '10'
---

# SSR, CSR, SSG and ISR: Key Differences

Server-Side Rendering (SSR), Client-Side Rendering (CSR), Static Site Generation (SSG) and Incremental Static Regeneration (ISR) are all techniques used to render web pages. The main difference between these techniques is when and where the page is rendered.

**SSR (Server-Side Rendering)**

In SSR, the page is rendered on the server and the rendered HTML is sent to the client. This means that the page is complete when it reaches the client and can be displayed immediately. However, SSR can be more expensive on the server, as it requires more processing power.

![Image of SSR rendering](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/SSR_vs_CSR.svg/1200px-SSR_vs_CSR.svg.png)

**CSR (Client-Side Rendering)**

In CSR, the page is rendered on the client's browser. This means that the client has to download the HTML and then execute JavaScript to render the page. This can take longer than SSR, but it can be more efficient on the server.

![Image of CSR rendering](https://miro.medium.com/max/1400/1*2k890319133-k6294-v078.png)

**SSG (Static Site Generation)**

In SSG, the entire page is pre-rendered on the server. This means that the page is completely static and can be served to the client without any JavaScript. This can be very fast, as the server does not have to do any additional processing. However, SSG can be difficult to maintain, as it requires the page to be regenerated whenever the data changes.

![Image of SSG rendering](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/SSR_vs_CSR_vs_SSG.svg/1200px-SSR_vs_CSR_vs_SSG.svg.png)

**ISR (Incremental Static Regeneration)**

ISR is a hybrid of SSR and SSG. In ISR, the page is pre-rendered on the server, but it is also updated asynchronously. This means that the page can be served to the client quickly, and it can also be updated as needed without having to re-generate the entire page.

![Image of ISR rendering](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/SSR_vs_CSR_vs_SSG_vs_ISR.svg/1200px-SSR_vs_CSR_vs_SSG_vs_ISR.svg.png)

**Which is the right choice?**

The right choice for your project will depend on your specific needs. If you need the fastest page load times, SSG is a good option. However, if you need to be able to update the page frequently, CSR or ISR may be a better choice.

**Table summarizing the key differences between SSR, CSR, SSG and ISR:**

| Technique | When is the page rendered? | Where is the page rendered? | Benefits | Drawbacks |
|---|---|---|---|---|
| SSR | On the server | On the server | Fast initial page load times | Can be expensive on the server |
| CSR | On the client | On the client | Efficient on the server | Slower initial page load times |
| SSG | On the server | On the server | Very fast page load times | Can be difficult to maintain |
| ISR | On the server and on the client | On the server | Fast initial page load times | Can be more complex than SSG or CSR |

I hope this helps!
