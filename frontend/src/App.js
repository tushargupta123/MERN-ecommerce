import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Cart from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPassword from './features/auth/components/ForgotPassword';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminProductListPage from './pages/AdminProductListPage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductForm';
import AdminOrdersPage from './pages/AdminOrdersPage';
import {  selectLoggedInUser } from './features/auth/AuthSlice';
import StripeCheckout from './pages/StripeCheckout';

// npx json-server --watch ./src/app/data.json --port 8080

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  useEffect(() => {
    if(user){
      dispatch(fetchItemsByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch,user]);

  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protected><Home/></Protected>}/>
          <Route path="*" element={<PageNotFound/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/cart" element={<Protected><Cart/></Protected>}/>
          <Route path="/checkout" element={<Protected><Checkout/></Protected>}/>
          <Route path="/my-orders" element={<Protected><UserOrdersPage/></Protected>}/>
          <Route path="/profile" element={<Protected><UserProfilePage/></Protected>}/>
          <Route path="/order-success/:id" element={<Protected><OrderSuccessPage/></Protected>}/>
          <Route path="/product-detail/:id" element={<Protected><ProductDetailPage/></Protected>}/>
          <Route path="/admin" element={<ProtectedAdmin><AdminProductListPage/></ProtectedAdmin>}/>
          <Route path="/admin/product-detail/:id" element={<ProtectedAdmin><AdminProductDetailPage/></ProtectedAdmin>}/>
          <Route path="/admin/product-form" element={<ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>}/>
          <Route path="/admin/product-form/edit/:id" element={<ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>}/>
          <Route path="/admin/orders" element={<ProtectedAdmin><AdminOrdersPage/></ProtectedAdmin>}/>
          <Route path="/stripe-checkout" element={<Protected><StripeCheckout/></Protected>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
