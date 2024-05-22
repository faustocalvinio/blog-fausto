---
external: false
draft: false
title: Storybook
description: What is Storybook?
date: 2024-05-20
readingMinutes: '10'
---

- a frontend workshop for building UI components and pages in isolation.
- helps you develop and share hard-to-reach states and edge cases without needing to run your whole app. 
- uses??? UI development, testing, and documentation
- a powerful tool that can help you with many aspects of your UI development workflow. 

## Main concepts


1. {% mark %}Stories{% /mark %} 
A story captures the rendered state of a UI component. Each component can have multiple stories, where each story describes a different component state.

2. {% mark %}Docs{% /mark %}
Storybook can analyze your components to automatically create documentation alongside your stories. This automatic documentation makes it easier for you to create UI library usage guidelines, design system sites, and more.

3. {% mark %}Testing{% /mark %}
Stories are a pragmatic starting point for your UI testing strategy. You already write stories as a natural part of UI development, so testing those stories is a low-effort way to prevent UI bugs over time.


4. {% mark %}Sharing{% /mark %}
Publishing your Storybook allows you to share your work with others. You can also embed your stories in places like Notion or Figma.

## What's a story?


A story captures the rendered state of a UI component. Developers write multiple stories per component that describe all the “interesting” states a component can support.

When you installed Storybook, the CLI created example components that demonstrate the types of components you can build with Storybook: Button, Header, and Page.

Each example component has a set of stories that show the states it supports. You can browse the stories in the UI and see the code behind them in files that end with .stories.js|ts. The stories are written in Component Story Format (CSF), an ES6 modules-based standard for writing component examples.

Let’s start with the Button component. A story is an object that describes how to render the component in question. Here’s how to render Button in the “primary” state and export a story called Primary.