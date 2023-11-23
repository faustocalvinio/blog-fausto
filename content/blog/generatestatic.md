---
external: false
draft: false
title: generateStaticParams in Next.js
description: It's a beautiful world out there.
date: 2023-11-05
readingMinutes: '22321'
---

[Official docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

## What is generateStaticParams in Next.js?
a function that is used to specify the dynamic routes that should be pre-rendered at build time.

To explain it in simpler terms, let's imagine you have a website with multiple blog posts, and each blog post has a unique URL. With generateStaticParams, you can tell Next.js which blog post URLs should be generated and pre-rendered during the build process.

When you implement generateStaticParams, you provide it with a function that returns an array of objects representing the dynamic paths you want to pre-render.

Each object typically contains a parameter that corresponds to the dynamic portion of the URL. For example, if your blog posts have URLs like /blog/post-1, /blog/post-2, and so on, you would return an array with objects like { params: { slug: 'post-1' } }, { params: { slug: 'post-2' } }, and so on.

In our case, we are retrieving a list of characters using the getAllCharacters() function. Then we map over the characters and return an array of objects, each containing a slug property with the character's slug value.

Next.js will then use this information to generate the static HTML files for these paths during the build process. This allows the pages to be served as static files, improving performance and SEO.

What's the purpose of dynamicParams when generating static pages in Next.js?
In Next.js, the behavior of dynamic segments that were not generated using generateStaticParams is controlled by the dynamicParams.

When dynamicParams is set to true, Next.js will attempt to fetch the corresponding page dynamically when a dynamic segment is visited.

On the other hand, if dynamicParams is set to false, Next.js will return a 404 page if it fails to find the requested page.

This setting allows you to define how Next.js handles dynamic segments that were not pre-generated, providing flexibility in handling dynamic routes in your applications.

How to generate static pages with generateStaticParams
Now that you've successfully generated a static path for each character, let's see how you can fetch data for each character.

The getCharacterBySlug function is an asynchronous function that takes the slug parameter, fetches data from the specified API endpoint using fetch, and returns the response data in JSON format. If the response is not successful (!data.ok), an error is thrown.

The Page component receives the params object as a prop, which contains the dynamic parameter values extracted from the URL. It calls the getCharacterBySlug function, passing the character's slug extracted from params to fetch the specific character's data.

The returned data is then used to populate the UI, which includes displaying the character's name, occupations, description, images, power and skills (if available), and famous quotes (if available).

Ideally, you can put getCharacterBySlug inside lib/characters.js and export it from there, but that's up to you to decide!