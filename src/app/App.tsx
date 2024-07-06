import React from "react";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import { HomePage } from "./screens/homePage";
import { ProductsPage } from "./screens/productsPage";
import { OrdersPage } from "./screens/orders";
import { UserPage } from "./screens/userPage";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/products">Products Page</Link>
          </li>
          <li>
            <Link to="/orders">Orders Page</Link>
          </li>
          <li>
            <Link to="/member-page">User Page</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/member-page" element={<UserPage />} />

        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
