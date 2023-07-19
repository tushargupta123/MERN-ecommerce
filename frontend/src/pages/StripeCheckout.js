import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";
import "./Stripe.css";

const stripePromise = loadStripe(
  "pk_test_51NS13iSCXLoy346Z0F82nga3PmKQLdQeXOo75blXuf3c8RE74S37Gr51hE8qgo3rfojg6k2QAWFOS9D4nXOQnBml00yBHBP6aL"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    setInterval(() => {
      if (currentOrder) {
        fetch("https://mern-ecommerce-front-psi.vercel.app/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ totalAmount: currentOrder.totalAmount ,orderId:currentOrder.id}),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }
    }, [1000]);
  }, [currentOrder]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
