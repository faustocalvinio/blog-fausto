---
external: false
draft: false
title: React project with Vite
description: It's a beautiful world out there.
date: 2023-11-05
readingMinutes: '5'
---

### What is vite?

Vite (French word for "quick", pronounced /vit/, like "veet") is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:

A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).

A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.


### Why vite?

Check this link [https://vitejs.dev/guide/why.html](https://vitejs.dev/guide/why.html)

```bash
npm install vite @vitejs/plugin-react
```
This will create `/package.json` , `/package-lock.json` and a folder named `node_modules`  

We will focus on the first one, the lock file shouldn't be modified


```js
{
  "dependencies": {
    "@vitejs/plugin-react": "^4.2.0",    
    "vite": "^5.0.3"
  }
}
```

Add the following line

```js
{
    "dependencies": {
        "@vitejs/plugin-react": "^4.2.0",    
        "vite": "^5.0.3"
    },
    "type": "module"
}
```

Create file named `/vite.config.js`

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
})

```

Create `/index.html` file
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Creating a React app from 0</title>
</head>
<body>
    <!-- create root element -->
    <div id="root"></div>
    <!-- import script module -->
    <script type="module" src="./src/main.jsx"></script>
</body>
</html>
```
Install react and react-dom modules

```bash
npm install react react-dom
```
This will add de following dependencies in our `package.json` file

```js
{
  "dependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.3"
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "type": "module",
}
```
Create `src/App.jsx` file
```js
import { useState } from 'react';
import './App.styles.css';
const App = () => {
    const [count, setCount] = useState(14);
    return (
        <>
            <h1>React Project With vite from 0</h1>
            <div id="count-container">
                <button                    
                    onClick={()=>setCount(count-1)}
                >
                    -
                </button>
                <h2>{count}</h2>
                <button                    
                    onClick={()=>setCount(count+1)}
                >
                    +
                </button>
            </div>
        </>
    )
}

export default App

```
Create `src/App.styles.css` file

```css
body{
    background-color: black;
    color: white;
    display: grid;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    place-items: center;    
}
#count-container{
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
}
button{
    height: fit-content;
    background-color: black;
    color: white;
    font-size: 20px;
    border: 1px solid white;
    cursor: pointer;
}
```

Create `src/main.jsx` file


```js
import { createRoot } from 'react-dom/client';
import App from './App';
// Access to the Target HTML Element 
const rootElement = document.getElementById('root');
// Create the Root Point of our App with the Root Element
const root = createRoot(rootElement);
// Render the App Component
root.render(<App />);

```

Add the scripts config in our package jsooooon

```js
{
  "dependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "vite": "^5.0.4"
  },
  "scripts": {
    "dev":"vite"
  },
  "type": "module",
}

```


Run `npm run dev`

Open [http://localhost:5173/](http://localhost:5173/) and you should see the App running

![App](/images/react-app-from-0-1.png)

![App](/images/react-app-from-0-2.png)

Directory structure must see like this


```js
node_modules/
src/
---main.jsx
index.html
vite.config.mjs
```