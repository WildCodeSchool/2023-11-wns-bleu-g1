'use client';

import React, { useEffect, useState } from 'react';
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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const form = useForm();
    
    // Use the mutation hook directly in the component
    const [createPaymentIntent, { data, loading, error }] = useCreatePaymentIntentMutation();
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        // Call the mutation directly in the effect
        const fetchClientSecret = async () => {
            try {
                const response = await createPaymentIntent({
                    variables: {
                        amount: Math.round(amount * 100),
                    },
                });
                console.log(response);
                setClientSecret(response.data?.createPaymentIntent.clientSecret || null);
            } catch (err) {
                console.error("Failed to create payment intent:", err);
                setClientSecret(null);
            }
        };

        if (amount) {
            fetchClientSecret();
        }
    }, [amount, createPaymentIntent]);

    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!clientSecret) return <p>No client secret available</p>;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {};

    return (
        <div className="container mx-auto w-full min-h-screen py-10 space-y-6 md:space-y-10">
            <Link href={"/"} className="flex w-full justify-center">
				<Logo width={150} height={100} />
			</Link>
            <Card className="h-fit sm:w-[350px] xl:w-[350px] m-auto p-2">
                <Form {...form}>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-3">
                            {clientSecret && <PaymentElement />}
                            <button>Pay</button>
                        </CardContent>
                    </form>
                </Form>
            </Card>
        </div>
    );
};

export default CheckoutPage;