import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  PencilIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
  } from "@heroicons/react/20/solid";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  const handlePage = (page) => {
    if (page > 0) setPage(page);
  };

  const handleShow = (order) => {};

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleStatus = (e,order) => {
    const updatedOrder = {...order,status:e.target.value}
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Order #</th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-center">Total Amount</th>
                  <th className="py-3 px-6 text-center">Shipping address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items.map((item) => (
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                              alt={item.product.thumbnail}
                            />
                          </div>
                          <span>
                            {item.product.title} - {item.quantity} - ${" "}
                            {discountedPrice(item.product)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        {order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <strong>{order.selectAdd[0].name}</strong> ,
                        {order.selectAdd[0].pincode}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {editableOrderId !== order.id && (
                        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                          {order.status}
                        </span>
                      )}

                      {editableOrderId === order.id && (
                        <select onChange={(e)=>handleStatus(e,order)}>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="disptached">Disptached</option>
                          <option value="failed">Failed</option>
                        </select>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <EyeIcon
                            className="w-4 h-4"
                            onClick={() => handleShow(order)}
                          ></EyeIcon>
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <PencilIcon
                            className="h-4 w-4"
                            onClick={() => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination page={page}
            totalItems={totalOrders}
            handlePage={handlePage}/>
    </div>
  );
};

export default AdminOrders;

function Pagination({ page, handlePage, totalItems }) {
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="/"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="/"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {page * ITEMS_PER_PAGE > totalItems
                  ? totalItems
                  : page * ITEMS_PER_PAGE}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                onClick={(e) => handlePage(page - 1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }).map(
                (el, index) => (
                  <div
                    onClick={(e) => handlePage(index + 1)}
                    className={`${
                      index + 1 === page
                        ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }`}
                  >
                    {index + 1}
                  </div>
                )
              )}
  
              <div
                onClick={(e) => handlePage(page + 1)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }