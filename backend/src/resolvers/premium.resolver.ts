import { ObjectType, Field, Mutation, Arg} from 'type-graphql';
import Stripe from 'stripe';

@ObjectType()
class PaymentIntentResponse {
    @Field(() => String, { nullable: true })
    clientSecret?: string;

    @Field(() => String, { nullable: true })
    error?: string;
}

export default class PremiumResolver {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    }

    @Mutation(() => PaymentIntentResponse)
    async createPaymentIntent(@Arg('amount') amount: number): Promise<PaymentIntentResponse> {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: amount,
                currency: 'eur',
                automatic_payment_methods: { enabled: true },
            });

            return {
                clientSecret: paymentIntent.client_secret || undefined,
                error: undefined,
            };
        } catch (error) {
            console.error('Error creating payment intent:', error);
            return {
                clientSecret: undefined,
                error: `Failed to create payment intent: ${error}`,
            };
        }
    }
}
