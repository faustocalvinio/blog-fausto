---
external: false
draft: false
title: Resumen general de conceptos
description: res
date: 2024-05-31
readingMinutes: "10"
---

-  [Frameworks](#frameworks)
-  [Lenguajes](#lenguajes)
-  [Gestores de estado](#gestores-estado)
-  [Biblotecas CSS](#biblotecas-css)
-  [Herramientas generales](#herramientas-generales)
-  [Bases de datos](#bases-de-datos)
-  [Librerias back-end](#librerias-back-end)
-  [Librerias front-end](#librerias-front-end)

## Frameworks

#### React (infraestructura)

Biblioteca de JavaScript de código abierto para construir interfaces de usuario
permite dividir la interfaz en piezas más pequeñas y reutilizables.
Basada en la componetización de la UI: la interfaz se divide en componentes independientes, que contienen su propio estado, cuando este cambia React vuelve a renderizar la interfaz.

#### Next.js

Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.
routing, rendering, data fetching, styling, optimizzations, typescript.

#### Astro

Web framework for building content-driven websites like blogs, marketing, and e-commerce.
islands, ui agnostic, 0 js by default, content collections, customizable.

#### Express.js

Minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## Lenguajes

#### HTML

Código que se utiliza para estructurar y desplegar una página web y sus contenidos.

#### CSS

Lenguaje de estilos utilizado para describir la presentación de documentos HTML.

#### JavaScript

Lenguaje de programación que debes usar para añadir características interactivas a tu sitio web se puede aplicar a un documento HTML y usarse para crear interactividad dinámica en los sitios web.

#### TypeScript

??

## Gestores estado

#### Redux

Librería JavaScript de código abierto para el manejo del estado de las aplicaciones. es una pequeña librería con una API simple y limitada, diseñada para ser un contenedor predecible del estado de la aplicación

#### Zustand

A small, fast, and scalable bearbones state management solution
Redux requires your app to be wrapped in context providers; Zustand does not.

## Biblotecas CSS

#### Bootstrap

A powerful, feature-packed frontend toolkit.

#### TailwindCSS

A utility-first CSS framework that can be composed to build any design, directly in your markup.
Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.

It's fast, flexible, and reliable — with zero-runtime.

#### MaterialUI

open-source React component library that implements Google's Material Design. It's comprehensive and can be used in production out of the box.
includes a comprehensive collection of prebuilt components that are ready for use in production right out of the box, and features a suite of customization options that make it easy to implement your own custom design system on top of our components.

#### StyledComponents

???

## Herramientas generales

#### Docker

Docker es una plataforma de software que le permite crear, probar e implementar aplicaciones rápidamente. Docker empaqueta software en unidades estandarizadas llamadas contenedores que incluyen todo lo necesario para que el software se ejecute, incluidas bibliotecas, herramientas de sistema, código y tiempo de ejecución.

#### Postman

Herramienta de colaboración y desarrollo que permite a los desarrolladores interactuar y probar el funcionamiento de servicios web y aplicaciones. proporcionando una interfaz gráfica intuitiva y fácil de usar para enviar solicitudes a servidores web y recibir las respuestas correspondientes.

#### TablePlus

TablePlus is a modern, native tool with elegant UI that allows you to simultaneously manage multiple databases such as MySQL, PostgreSQL, SQLite, Microsoft SQL Server and more.

#### Git

Software de control de versiones diseñado por Linus Torvalds, pensando en la eficiencia, la confiabilidad y compatibilidad del mantenimiento de versiones de aplicaciones cuando estas tienen un gran número de archivos de código fuente. Su propósito es llevar registro de los cambios en archivos de computadora incluyendo coordinar el trabajo que varias personas realizan sobre archivos compartidos en un repositorio de código.

#### GitHub

Forja (plataforma de desarrollo colaborativo) para alojar proyectos utilizando el sistema de control de versiones Git. Se utiliza principalmente para la creación de código fuente de programas de ordenador.

#### Cloudinary

Servicio en la nube que proporciona una plataforma integral para la gestión de medios digitales, como imágenes y videos. Permite a los desarrolladores almacenar, gestionar, manipular y entregar medios de forma eficiente a través de una API fácil de usar.

#### Chromatic

A visual testing & review tool that scans every possible UI state across browsers to catch visual and functional bugs.

#### Progressive Web Aplications

PWA are web application built and enhanced with modern APIs to deliver enhanced capabilities, reliability, and installability while reaching anyone, anywhere, on any device, all with a single codebase.

#### Service Workers

[MDN description](https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API)

#### Firebase

????

#### Vite

A build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:

-  A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).

-  A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.

## Bases de datos

#### MongoDB

NoSQL DB, orientado a documentos y de código abierto.

En lugar de guardar los datos en tablas, tal y como se hace en las bases de datos relacionales, MongoDB guarda estructuras de datos BSON (una especificación similar a JSON) con un esquema dinámico, haciendo que la integración de los datos en ciertas aplicaciones sea más fácil y rápida.

#### Firestore

Cloud Firestore is a NoSQL document database that lets you easily store, sync, and query data for your mobile and web apps - at global scale.

#### PostgreSQL

A powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.

## Librerias back-end

#### Mongoose

A straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

#### Prisma

Open source Node.js and TypeScript ORM with a readable data model, automated migrations, type-safety, and auto-completion.

#### Socket.io

Socket.IO is a library that enables low-latency, bidirectional and event-based communication between a client and a server.

#### Json Web Token

An open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

#### Bcrypt

Libreria para utilizar la función de hash de contraseñas y derivación de claves para contraseñas basada en el cifrado Blowfish.

## Librerias front-end

#### ReactQuery

Data-fetching library for web applications, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your web applications a breeze.

#### StoryBook

frontend workshop for building UI components and pages in isolation, it helps you develop and share hard-to-reach states and edge cases without needing to run your whole app.
Used for UI development, testing, and documentation.

#### Axios

Cliente HTTP basado en promesas para node.js y el navegador. Es isomorfico (= puede ejecutarse en el navegador y nodejs con el mismo código base). servidor -> modulo nativo http de node.js, cliente -> XMLHttpRequests.
