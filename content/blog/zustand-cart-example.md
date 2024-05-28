---
external: false
draft: false
title: ✅ Cart with Zustand
description: Cart with Zustand
date: 2024-03-05
readingMinutes: "4"
---

# Creando el estado global

Your store is a hook! You can put anything in it: primitives, objects, functions. The set function merges state.

#### src/store/cart-store.ts

```ts
// interfaz exclusiva del producto en el carrito,
// porque no voy a querer almacenar toda la informacion
interface CartProduct {
   id: string;
   slug: string;
   title: string;
   price: number;
   quantity: number;
   size: Size;
   image: string;
}
// interfaz del estado global
interface CartState {
   // interfaz del carrito de compras (un arreglo de la interfaz definida anteriormente)
   cart: CartProduct[];
   // funcion de agregar un producto al carrito
   addProductToCart: (product: CartProduct) => void;
   // funcion para obtener la cantidad total diferente de productos
   // (no contando la cantidad de cada uno)
   getTotalItems: () => number;
   // funcion para simplemente quitar un producto del carrito
   removeProduct: (product: CartProduct) => void;
   // funcion para limpiar el carrito y dejarlo como un arreglo vacio
   clearCart: () => void;
   // funcion para actualizar la cantidad de un producto
   updateProductQuantity: (product: CartProduct, quantity: number) => void;
   getSummaryInformation: () => {
      subTotal: number;
      tax: number;
      itemsInCart: number;
      totalPrice: number;
   };
}

export const useCartStore = create<State>()(
   // persist nos permite almacenarlo en local storage de una manera sencilla
   persist(
      (set, get) => ({
         cart: [],
         addProductToCart: (product: CartProduct) => {
            // obtenemos el estado actual del carrito
            const { cart } = get();
            // segun el id del producto que recibimos, buscamos un boolean
            // que nos diga si ya tenemos algun producto en el carrito
            const productInCart = cart.some(
               (item) => item.id === product.id && item.size === product.size
            );
            // si no lo tenemos simplemente lo agregamos
            if (!productInCart) {
               set({ cart: [...cart, product] });
               return;
            }
            // si lo tenemos nos encargamos de recorrer el carrito mediante un map
            // y cuando encontremos el id y el tamanio del producto aumentamos la cantidad
            const updatedCartProducts = cart.map((item) => {
               if (item.id === product.id && item.size === product.size) {
                  return {
                     ...item,
                     quantity: item.quantity + product.quantity,
                  };
               }
               return item;
            });
            // seteamos el carrito con el carrito actualizado
            set({ cart: updatedCartProducts });
         },
         removeProduct: (product: CartProduct) => {
            // obtenemos el estado actual del carrito
            const { cart } = get();
            // creamos un nuevo arreglo sin el producto que recibimos
            // este nuevo arreglo contiene todos los productos anterioress
            // salvo los que coincidan con el id y el tamanio del producto que recibimos como parametro
            const updatedCartProducts = cart.filter(
               (item) => item.id !== product.id || item.size !== product.size
            );
            // seteamos el carrito con el carrito actualizado
            set({ cart: updatedCartProducts });
         },
         clearCart: () => {
            // simplemente seteamos el carrito como un arreglo vacio
            set({ cart: [] });
         },
         getTotalItems: () => {
            // obtenemos el estado actual del carrito
            const { cart } = get();
            return cart.reduce((total, item) => total + item.quantity, 0);
         },
         updateProductQuantity: (product: CartProduct, quantity: number) => {
            // obtenemos el estado actual del carrito
            const { cart } = get();
            const updatedCartProducts = cart.map((item) => {
               if (item.id === product.id && item.size === product.size) {
                  return {
                     ...item,
                     quantity: quantity,
                  };
               }
               return item;
            });
            // seteamos el carrito con el carrito actualizado
            set({ cart: updatedCartProducts });
         },
         getSummaryInformation: () => {
            // obtenemos el estado actual del carrito
            const { cart } = get();

            const subTotal = cart.reduce(
               (subTotal, product) =>
                  product.quantity * product.price + subTotal,
               0
            );
            const tax = subTotal * 0.15;
            const totalPrice = subTotal + tax;
            const itemsInCart = cart.reduce(
               (total, item) => total + item.quantity,
               0
            );
            return { subTotal, tax, itemsInCart, totalPrice };
         },
      }),
      {
         name: "shopping-cart",
      }
   )
);
```

# Utilizando el estado en la aplicacion

You can use the hook anywhere, without the need of providers. Select your state and the consuming component will re-render when that state changes.

#### src/App.tsx

```tsx
const totalItemsInCart = useCartStore((state) => state.getTotalItems());
const { itemsInCart, subTotal, tax, totalPrice } = useCartStore((state) =>
   state.getSummaryInformation()
);
const productsInCart = useCartStore((state) => state.cart);
```
