---
external: false
title: Zustand Basic Usage
description: Lorem Ipsum Description
date: 2024-01-03
readingMinutes: "4"
---

### App.tsx

```jsx
import shallow from "zustand/shallow";
import { useCounterStore } from "./store/counterStore";

const { count, title, posts } = useCounterStore(
   (state) => ({
      count: state.count,
      title: state.title,
      posts: state.posts,
   }),
   shallow
);
const { increment, getPosts, cleanStore, multiply } = useCounterStore();
```

### store/counterStore.ts

```tsx
import create from "zustand";

export interface Post {
   id: number;
   title: string;
   body: string;
}

interface CounterState {
   count: number;
   title: string;
   posts: Post[];
   increment: (value: number) => void;
   multiply: (value: number) => void;
   cleanStore: () => void;
   getPosts: () => Promise<void>;
}

export const useCounterStore = create<CounterState>((set, get) => ({
   title: "Some title",
   count: 10,
   posts: [],
   increment: (value: number) =>
      set((state) => ({ ...state, count: state.count + value })),
   getPosts: async () => {
      const posts = await (
         await fetch("https://jsonplaceholder.typicode.com/posts")
      ).json();
      set((state) => ({ ...state, posts }));
   },
   cleanStore: () => set({}, true),
   multiply: (value: number) => {
      // const count = get().count
      const { count } = get();
      set({ count: count * value });
   },
}));
```
