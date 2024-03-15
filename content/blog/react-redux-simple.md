---
external: false
draft: false
title: TC-React Redux example
description: React Redux example
date: 2024-03-12
readingMinutes: "10"
---

#### src/store/store.js

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

```jsx
import { Provider } from "react-redux";
import { store } from "./store";
ReactDOM.createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <App />
   </Provider>
);
```

# como usarlo ?

```jsx
const { status, errorMessage } = useSelector((state) => state.auth);
```
