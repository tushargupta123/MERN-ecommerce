import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, signOutAsync } from '../AuthSlice';
import { Navigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    useEffect(() => {
        dispatch(signOutAsync());
    },[dispatch]);

  return (
    <div>
        {!user && <Navigate replace={true} to="/login"/>}
    </div>
  )
}

export default Logout