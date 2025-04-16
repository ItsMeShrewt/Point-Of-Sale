import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import './assets/css/style.css'
import Login from './pages/login.tsx'
import Logout from './pages/logout.tsx'
import Dashboard from './pages/dashboard.tsx'
import Customer_Registration from './pages/inventory/register.tsx';
import Inventory_List from './pages/inventory/list.tsx';
import Inventory_List2 from './pages/inventory/list2.tsx';
import Inventory_List3 from './pages/inventory/list3.tsx';
import Sales_List from './pages/product-sale/sales.tsx';
import Sales1 from './pages/product-sale/sales1.tsx';
import Sales2 from './pages/product-sale/sales2.tsx';
import Sales3 from './pages/product-sale/sales3.tsx';
import Sales4 from './pages/product-sale/sales4.tsx';
import Sales5 from './pages/product-sale/sales5.tsx';
import Product_List from './pages/product/product.tsx';
import Damage_List from './pages/damage/damage_list.tsx';
import Order_History from './pages/history/order_history.tsx';
import Reports from './pages/reports/reports.tsx';
import Damaged_Registration from './pages/damage/register.tsx';
import Exp from './pages/experiment/exp.tsx';



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
        <Route path="/product-sales" element={<Sales_List />} />
        <Route path="/product-sales/sales1" element={<Sales1 />} />
        <Route path="/product-saleS/sales2" element={<Sales2 />} />
        <Route path="/product-sales/sales3" element={<Sales3 />} />
        <Route path="/product-sales/sales4" element={<Sales4 />} />
        <Route path="/product-sales/sales5" element={<Sales5 />} />
        <Route path="/products" element={<Product_List />} />
        <Route path="/damages/damage_list" element={<Damage_List />} />
        <Route path="/damages/create" element={<Damaged_Registration />} />
        <Route path="/history" element={<Order_History />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/experiments" element={<Exp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
