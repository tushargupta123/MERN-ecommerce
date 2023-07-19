import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemsFromCartAsync,
  selectItems,
  updateItemAsync,
} from "./cartSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { discountedPrice } from "../../app/constants";

export default function Cart() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({id:item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemsFromCartAsync(id));
  };

  return (
    <>
      {totalItems === 0 && <Navigate to="/"></Navigate>}
      <div className="mx-auto max-w-7xl mt-4 px-4 py-5 sm:px-6 lg:px-8 bg-white">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="mt-8">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item) => {
                return (
                  <li key={item.product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
  
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.product.id}>{item.product.title}</a>
                          </h3>
                          <p className="ml-4">$ {discountedPrice(item.product)}</p>                      </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">
                          Qty
                          <select
                            className="mx-5"
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </p>
  
                        <div className="flex">
                          <button
                            type="button"
                            onClick={(e) => handleRemove(e, item.id)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200  mx-auto max-w-7xl mt-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total items in cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
                onClick={() => {
                  navigate("/");
                }}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
