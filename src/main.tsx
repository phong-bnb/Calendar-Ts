// main.tsx hoặc index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Thêm import này
import store from "./store.ts"; // Đường dẫn đến file store
import App from "./App"; // Đường dẫn đến file App
import "./index.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
