---
external: false
draft: false
title: usePrefetchQuery (React Query) Example
description: usePrefetchQuery (React Query) Example
date: 2024-03-02
readingMinutes: "10"
---

# Creando el cliente de React Query

[Documentacion oficial](https://tanstack.com/query/latest/docs/reference/QueryClient)

Importante siempre utilizar el mismo.

```tsx
import { QueryClient, QueryClientProvider } from "react-query";
export const queryClient = new QueryClient();
/* const queryClient = new QueryClient({
   defaultOptions: {
     queries: {
       staleTime: Infinity,
     },
},*/

ReactDOM.createRoot(document.getElementById("root")!).render(
   <QueryClientProvider client={queryClient}>
      <App />
   </QueryClientProvider>
);
```

## Funcion para obtener un producto segun su ID

```ts
const getProductById = async (id: number) => {
   try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
         throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Fetch error:", error);
      throw error;
   }
};
```

## Creando el prefetch

The options for prefetchQuery are exactly the same as those of fetchQuery.

```tsx
const onMouseEnter = async () => {
   const cachedData = queryClient.getQueryData(["product", id]);
   if (!cachedData) {
      // Solo realizar prefetch si los datos no están en caché
      await queryClient.prefetchQuery(["product", id], async () => {
         const data = await getProductById(id);
         return data;
      });
   }
};

return <div onMouseEnter={onMouseEnter}></div>;
```

## Utilizando el prefetch

```tsx
interface ProductData {
   product: {
      id: number;
      title: string;
      price: number;
      description: string;
      category: string;
      image: string;
      rating: Rating;
   };
}
const cachedData = queryClient.getQueryData(["product", id]);

// Usa los datos en caché si están disponibles
const { data, isLoading, isSuccess } = useQuery<ProductData, Error>(
   ["product", id],
   async () => await getProductById(id),
   {
      initialData: cachedData as ProductData,
      enabled: !cachedData, // Evita realizar una segunda solicitud si los datos ya están en caché
   }
);
```
