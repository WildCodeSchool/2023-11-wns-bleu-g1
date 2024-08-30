'use client';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from 'next/router';

import CheckoutPage from "@/components/elements/CheckoutPage";

export default function Checkout() {

    if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
      throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
    }
    
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

    const router = useRouter();
    const { plan } = router.query;
    
    const amount = plan === "annual" ? 99.99 : 9.99;

    return (
        <Elements 
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: Math.round(amount * 100),
            currency: "eur",
        }}>
            <CheckoutPage amount={amount} />
        </Elements>
    );
}