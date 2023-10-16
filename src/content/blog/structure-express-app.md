---
title: 'How to structure your back-end code in Express.js'
description: 'Lorem ipsum dolor sit amet'
pubDate: 'Oct 16 2023'
heroImage: '/blog-placeholder-3.jpg'
---
```js
📁
  ├── 📄 app.js
  ├── 📁 bin
  ├── 📁 config
  ├── 📁 controllers
  │   ├── 📄 customer.js
  │   ├── 📄 product.js
  │   └── ...
  ├── 📁 middleware
  │   ├── 📄 auth.js
  │   ├── 📄 logger.js
  │   └── ...
  ├── 📁 models
  │   ├── 📄 customer.js
  │   ├── 📄 Product.js
  │   └── ...
  ├── 📁 routes
  │   ├── 📄 api.js
  │   ├── 📄 auth.js
  │   └── ...
  ├── 📁 public
  │   ├── 📁 css
  │   ├── 📁 js
  │   ├── 📁 images
  │   └── ...
  ├── 📁 views
  │   ├── 📄 index.ejs
  │   ├── 📄 product.ejs
  │   └── ...
  ├── 📁 tests
  │   ├── 📁 unit
  │   ├── 📁 integration
  │   ├── 📁 e2e
  │   └── ...
  ├── 📁 utils
  │   ├── 📄 validation.js
  │   ├── 📄 helpers.js
  │   └── ...
  └── 📁 node_modules
```
<br>
app.js : It's like the control center of your web application. It's where you set up and manage everything.

bin : Think of this as a place for starting your web server. It's where you have scripts that make your website work.

config : These are like settings for your website, such as where your database is or how your website should behave.

controllers : This is where you put the brains of your website explains the name controllers. Each file here handles a different part of your site, like customer stuff or product stuff.

middleware : Imagine these as helpers that help your website do things like checking if you're logged in or keeping a record of what people do on your site.

models : This is where you describe what your data looks like. If your website is a store, this is where you say what a product is or what a customer is.

routes : These are like the paths to different parts of the website. If the website is a city, these are the streets and highways.

public : Think of this as your storage room for things everyone can see, like images, styles, and scripts.

views : If your website is like a book, these are the pages. This is where you put together what people see on the screen.

tests : These are like exams for your website to make sure it works correctly. You create different kinds of tests to check different parts of your site.

utils : These are like handy tools you use to make your website better, like checking if someone's email is valid or formatting dates nicely.

node_modules : This is like your toolbox filled with tools (libraries and code) that you use to build your website. It's automatically filled with things your project needs.