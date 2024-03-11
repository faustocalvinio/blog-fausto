---
external: false
draft: false
title: TC-React Router Dom simple usage
description: React Router Dom simple usage
date: 2024-03-11
readingMinutes: "10"
---

BrowserRouter stores the current location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack.

Routes will match a set of child routes from the current location.

[Official Examples](https://github.com/remix-run/react-router/tree/dev/examples)

```jsx
<BrowserRouter>
   <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
   </Routes>
</BrowserRouter>
```

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
               <Route path="/*" element={<DashboardRouter />} />
            ) : (
               <Route path="/auth/*" element={<AuthRouter />} />
            )}
            <Route path="/*" element={<Navigate to="/auth/login" />} />
         </Routes>
      </BrowserRouter>
   );
};
```
