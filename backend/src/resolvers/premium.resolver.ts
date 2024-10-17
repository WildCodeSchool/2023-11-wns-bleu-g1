import { Arg, Field, Mutation, ObjectType } from "type-graphql";
import Stripe from "stripe";
import {
	addDescription,
	TypeRequestsEnum,
	TypeUserEnum,
} from "../script/documentationUses";

@ObjectType()
class PaymentIntentResponse {
	@Field(() => String, { nullable: true, description: "The client secret" })
	clientSecret?: string;

	@Field(() => String, { nullable: true, description: "The error message" })
	error?: string;
}

export default class PremiumResolver {
	private stripe: Stripe;

	constructor() {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
	}

	@Mutation(() => PaymentIntentResponse, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"creates a new payment intent",
			[TypeUserEnum.visitor, TypeUserEnum.admin],
			["amount: (number)"]
		),
	})
	async createPaymentIntent(
		@Arg("amount") amount: number
	): Promise<PaymentIntentResponse> {
		try {
			const paymentIntent = await this.stripe.paymentIntents.create({
				amount: amount,
				currency: "eur",
				automatic_payment_methods: { enabled: true },
			});

			return {
				clientSecret: paymentIntent.client_secret || undefined,
				error: undefined,
			};
		} catch (error) {
			console.error("Error creating payment intent:", error);
			return {
				clientSecret: undefined,
				error: `Failed to create payment intent: ${error}`,
			};
		}
	}
}
