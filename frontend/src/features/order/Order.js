import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  selectUserOrders } from './orderSlice';
import { selectLoggedInUser } from '../auth/AuthSlice';

const Order = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    // dispatch(fetchLoggein(user.id))
  },[dispatch]);

  return (
    <div>
      {orders.map(order =>( 
        <>
        {order.id}
        </>
      ))}
    </div>
  );
}

export default Order;