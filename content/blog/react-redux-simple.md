---
external: false
draft: false
title: ✅ React Redux example
description: React Redux example
date: 2024-03-12
readingMinutes: "10"
---

# Creando el store de Redux

#### src/store/store.js

This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.

```jsx
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
   },
});
```

#### src/store/auth/authSlice.js

```jsx
import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
   name: "auth",
   initialState: {
      status: "checking",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: null,
   },
   reducers: {
      login: (state, { payload }) => {
         state.status = "authenticated";
         state.uid = payload.uid;
         state.email = payload.email;
         state.displayName = payload.displayName;
         state.photoURL = payload.photoURL;
         state.errorMessage = null;
      },
      logout: (state, { payload }) => {
         state.status = "not-authenticated";
         state.uid = null;
         state.email = null;
         state.displayName = null;
         state.photoURL = null;
         state.errorMessage = payload?.errorMessage;
      },
      checkingCredentials: (state) => {
         state.status = "checking";
      },
   },
});
```

#### src/main.jsx

Once the store is created, we can make it available to our React components by putting a React Redux <Provider>.

```jsx
import { Provider } from "react-redux";
import { store } from "./store";
ReactDOM.createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <App />
   </Provider>
);
```

# Usando el store y sus respectivas funciones

### src/components/authStatus.jsx

```jsx
const { status, errorMessage } = useSelector((state) => state.auth);
return (
   <div>
      <p>Status: {status}</p>
      {errorMessage && <p>Error: {errorMessage}</p>}
   </div>
);
```

### src/components/logoutButton.jsx

```jsx
import { useDispatch } from "react-redux";
import { logout } from "./store/auth/authSlice";

const LogoutButton = () => {
   const dispatch = useDispatch();

   const handleLogout = () => {
      dispatch(logout({ errorMessage: null }));
   };
   return <button onClick={handleLogout}>Logout</button>;
};
export default LogoutButton;
```
