---
external: false
draft: false
title: useSocket hook + SocketProvider in React
description: useSocket hook + SocketProvider in React
date: 2024-02-29
readingMinutes: "10"
---

custom React hook (useSocket) for managing a WebSocket connection and a context provider (SocketProvider) that provides the socket connection and online status to its descendants in the component tree.

### ./hooks/useSocket.js file

```js
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (serverPath) => {
   const [online, setOnline] = useState(false);

   const socket = useMemo(
      () =>
         io.connect(serverPath, {
            transports: ["websocket"],
         }),
      [serverPath]
   );

   useEffect(() => {
      setOnline(socket.connected);
   }, [socket]);

   useEffect(() => {
      socket.on("connect", () => {
         setOnline(true);
      });
   }, [socket]);

   useEffect(() => {
      socket.on("disconnect", () => {
         setOnline(false);
      });
   }, [socket]);

   return {
      socket,
      online,
   };
};
```

### ./context/SocketProvider.jsx file

```jsx
import { createContext } from "react";
import { useSocket } from "../hooks";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
   const { socket, online } = useSocket("http://localhost:8080/");

   return (
      <SocketContext.Provider value={{ online, socket }}>
         {children}
      </SocketContext.Provider>
   );
};
```

### Usage

```jsx
const { socket, online } = useContext(SocketContext);
```
