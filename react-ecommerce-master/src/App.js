import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import {BrowserRouter as Router,Route,Routes, RouterProvider,} from 'react-router-dom';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminHome from './pages/AdminHome';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import StripeCheckout from './pages/StripeCheckout';
import ResetPasswordPage from './pages/ResetPasswordPage';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);


  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[dispatch])

  useEffect(() => {
    if (user) {  // Check if userChecked is true before dispatching
      dispatch(fetchItemsByUserIdAsync());
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user, userChecked]);

  return (
<>
{userChecked && (
<Provider template={AlertTemplate} {...options}>
   <Router>
      
      <Routes>
    <Route exact path= '/' element={ <Protected><Home/></Protected> } />
    <Route exact path= '/login' element={ <LoginPage/> } />
    <Route exact path= '/signup' element={ <SignupPage/>} />
    <Route exact path= '/cart' element={<> <Protected> <CartPage/> </Protected> </>} />
    <Route exact path= '/checkout' element={<><Protected> <Checkout/> </Protected> </>} />
    <Route exact path= '/stripe-checkout/' element={<><Protected> <StripeCheckout/> </Protected> </>} />
    <Route exact path= '/product-detail/:id'
                 element={<> <ProductDetailPage/>  </>} />
    <Route exact path= '/admin'
                 element={ <ProtectedAdmin> <AdminHome/> </ProtectedAdmin>} />
    <Route exact path= '/admin/orders'
                 element={ <ProtectedAdmin> <AdminOrdersPage/> </ProtectedAdmin>} />
    <Route exact path= '/admin/product-form' 
                 element={ <ProtectedAdmin> <AdminProductFormPage/> </ProtectedAdmin> } />
    <Route exact path= '/admin/product-form/edit/:id' 
                 element={ <ProtectedAdmin> <AdminProductFormPage/> </ProtectedAdmin> } />
    <Route exact path= '/admin/product-detail/:id' 
                 element={<ProtectedAdmin><AdminProductDetailPage/></ProtectedAdmin>} />
    <Route exact path= '/order-success/:id' 
                 element={<> <Protected> <OrderSuccessPage/> </Protected>  </>} />
    <Route exact path= '/my-orders' element={<> <Protected>  <UserOrdersPage/></Protected> </>} />
    <Route exact path= '/profile' element={<> <Protected> <UserProfilePage/> </Protected>  </>} />
    <Route exact path= '/logout' element={<> <Logout/></>} />
    <Route exact path= '/forgot-password' element={<> <ForgotPasswordPage/></>} />
    <Route exact path= '/reset-password' element={<> <ResetPasswordPage/></>} />
    <Route exact path= '*' element={<> <PageNotFound/></>} />
    </Routes></Router>
</Provider>)}
   
</>
  );
}

export default App;