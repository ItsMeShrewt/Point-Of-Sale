import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './assets/css/style.css';
import Damage_List from './pages/damage/damage_list.tsx';
import Damaged_Registration from './pages/damage/register.tsx';
import Dashboard from './pages/dashboard.tsx';
import Order_History from './pages/history/order_history.tsx';
import Inventory_List from './pages/inventory/list.tsx';
import Inventory_List2 from './pages/inventory/list2.tsx';
import Inventory_List3 from './pages/inventory/list3.tsx';
import Customer_Registration from './pages/inventory/register.tsx';
import Login from './pages/login.tsx';
import Logout from './pages/logout.tsx';
import Order from './pages/order/ordermanagement.tsx';
import Orders from './pages/orders/ordermng.tsx';
import Product_List from './pages/product/product.tsx';
import Reports from './pages/reports/reports.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory_List />} />
        <Route path="/inventory/list2" element={<Inventory_List2 />} />
        <Route path="/inventory/list3" element={<Inventory_List3 />} />
        <Route path="/customer/create" element={<Customer_Registration />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Product_List />} />
        <Route path="/damages/damage_list" element={<Damage_List />} />
        <Route path="/damages/create" element={<Damaged_Registration />} />
        <Route path="/history" element={<Order_History />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
