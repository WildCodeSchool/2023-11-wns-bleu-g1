'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useCreatePaymentIntentMutation } from "@/graphql/generated/schema";
import Link from "next/link";

import Logo from "@/components/elements/Logo";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const form = useForm();    
    
    // Use the mutation hook directly in the component
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const router = useRouter();

    useEffect(() => {
        // Call the mutation directly in the effect
        const fetchClientSecret = async () => {
            try {
                const response = await createPaymentIntent({
                    variables: {
                        amount: Math.round(amount * 100),
                    },
                });
                setClientSecret(response.data?.createPaymentIntent.clientSecret || undefined);
            } catch (err) {
                console.error("Failed to create payment intent:", err);
                setClientSecret(undefined);
            }
        };

        if (amount) {
            fetchClientSecret();
        }
    }, [amount, createPaymentIntent]);

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if(submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret: clientSecret as string,
            confirmParams: {
                return_url: `${window.origin}/premium`, // changer return route -> method back -> user is premium = true
            },
        });

        if(error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }

        setLoading(false);
    };

    if(!clientSecret || !stripe || !elements) {
        return (
            <div className="container mx-auto w-full min-h-screen py-10 space-y-6 md:space-y-10">
                <Link href={"/"} className="flex w-full justify-center">
                    <Logo width={150} height={100} />
                </Link>
                <Card className="h-fit sm:w-[350px] xl:w-[350px] m-auto p-2">
                    <CardContent className="space-y-3">
                        <div className='flex justify-center items-center mt-5'>
                            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface 
                                motion-reduce:animate-[spin_1.5s_linear_infinite] text-white' role='status'>
                                    <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !white-space-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                                        Chargement ...
                                    </span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-4">
                        <Button type="submit" className="w-full" disabled={!stripe || loading}>
                            {!loading ? `Payer ${amount}€` : "Chargement..."}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto w-full min-h-screen py-10 space-y-6 md:space-y-10">
            <Link href={"/"} className="flex w-full justify-center">
				<Logo width={150} height={100} />
			</Link>
            <Card className="h-fit sm:w-[350px] xl:w-[350px] m-auto p-2">
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-3">
                        {clientSecret && <PaymentElement />}
                        {errorMessage && <p>{errorMessage}</p>}
                    </CardContent>
                    <CardFooter className="flex-col gap-4">
                        <Button type="submit" className="w-full" disabled={!stripe || loading}>
                            {!loading ? `Payer ${amount}€` : "Chargement..."}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default CheckoutPage;