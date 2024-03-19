---
external: false
draft: false
title: React Router Dom simple usage
description: React Router Dom simple usage
date: 2024-03-11
readingMinutes: "10"
---

BrowserRouter stores the current location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack.

Routes will match a set of child routes from the current location.

[Official Examples](https://github.com/remix-run/react-router/tree/dev/examples)

### src/router/AppRouter.jsx

Manejando rutas con autenticacion

```jsx
export const AppRouter = () => {
   const status = useCheckAuth();

   if (status === "checking") {
      return <CheckingAuth />;
   }
   return (
      <BrowserRouter>
         <Routes>
            {status === "authenticated" ? (
               <Route path="/*" element={<ShopRouter />} />
            ) : (
               <Route path="/auth/*" element={<AuthRouter />} />
            )}
            <Route path="/*" element={<Navigate to="/auth/login" />} />
         </Routes>
      </BrowserRouter>
   );
};
```

Manejando rutas en general

```jsx
export const AppRouter = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
         </Routes>
      </BrowserRouter>
   );
};
```
