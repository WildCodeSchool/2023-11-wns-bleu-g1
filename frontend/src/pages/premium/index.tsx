import AuthLayout from "@/components/elements/auth-layout";
import ExternalLinkIcon from "@/components/elements/icons/external-link-arrow";
import CheckCircleIcon from "@/components/elements/icons/check-circle";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { memo, useState } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	useGetUserProfileQuery,
	useUpdateUserIsPremiumMutation,
} from "@/graphql/generated/schema";
import { toast } from "@/components/ui/use-toast";
import { BadgeCheck } from "lucide-react";
import { ApolloError } from "@apollo/client";

interface PricingOption {
	name: string;
	price: string;
	yearlyPrice: string;
	description: string;
	features: string[];
	extraBenefits?: string;
	link?: string;
	btn?: string;
	external?: boolean;
}

interface PricingToggleProps {
	enabled: boolean;
	setEnabled: (e: boolean) => void;
	color?: string;
}

interface PricingCardProps {
	option: PricingOption;
	enabled: boolean;
	isPremium: boolean;
}

const PricingToggle = memo(
	({ enabled, setEnabled, color }: PricingToggleProps) => (
		<div className="flex items-center">
			<span
				className={`mr-2 font-bold ${enabled ? "text-neutral-500/60" : ""}`}
			>
				Mensuel
			</span>
			<Switch checked={enabled} onCheckedChange={setEnabled} />
			<span
				className={`ml-2 font-bold ${enabled ? "" : "text-neutral-500/60"}`}
			>
				Annuel
			</span>
		</div>
	)
);
PricingToggle.displayName = "PricingToggle";

const PricingCard = memo(({ option, enabled, isPremium }: PricingCardProps) => (
	<div className="grid h-full w-full grid-cols-1 rounded-xl border border-neutral-700/50 lg:grid-cols-5">
		{!isPremium && (
			<Card className="col-span-2">
				<CardHeader>
					<CardTitle className="mb-1">{option.name}</CardTitle>
					<CardDescription>{option.description}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-y-2">
						<h3 className="text-sm font-medium text-white mb-1">
							<span className="text-3xl font-[620] text-white">
								{enabled ? option.yearlyPrice : option.price}
								<span className="text-sm font-medium text-neutral-400">
									{enabled ? "/an" : "/mois"}
								</span>
							</span>
						</h3>
						<Link href={`${option.link}`} className={buttonVariants()}>
							<span className="tracking-tight">{option.btn}</span>
							{/* {option.external && <ExternalLinkIcon className="h-4 w-4 ml-2" />} */}
						</Link>
					</div>
				</CardContent>
			</Card>
		)}
		<div className="col-span-3 flex flex-col justify-center gap-y-5 p-5 lg:pl-10">
			{option.extraBenefits && !isPremium && (
				<p className="text-[15px] font-medium text-neutral-500">
					{option.extraBenefits}
				</p>
			)}
			{option.features.map((feature, index) => (
				<div key={index} className="flex gap-x-3">
					<div
						className={`h-6 w-6 flex items-center justify-center ${option.name == "Gratuit" ? "text-primary" : "text-green-500"}`}
					>
						<CheckCircleIcon />
					</div>
					<p className="font-medium text-neutral-900 dark:text-white">
						{feature}
					</p>
				</div>
			))}
		</div>
	</div>
));
PricingCard.displayName = "PricingCard";

export default function Pricing() {
	const { data, refetch } = useGetUserProfileQuery();
	const isPremium = data?.getUserProfile?.isPremium || false;
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = () => {
			refetch();
		};

		// Add event listener to handle route change
		router.events.on("routeChangeComplete", handleRouteChange);

		// Clean up event listener on component unmount
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [refetch, router.events]);

	const [updateUserIsPremiumMutation, updateUserIsPremiumMutationResult] =
		useUpdateUserIsPremiumMutation({
			onCompleted: () => {
				console.log(
					"updateUserIsPremiumResult",
					updateUserIsPremiumMutationResult
				);
				toast({
					icon: <BadgeCheck className="h-5 w-5" />,
					title: "Vous n'êtes plus Premium.",
					className: "text-danger",
				});
				refetch();
			},
			onError: (err: ApolloError) => {
				console.error(err);
				if (err.message.includes("already exist")) {
					toast({
						icon: <BadgeCheck className="h-5 w-5" />,
						title: "Une erreur est survenue.",
						className: "text-danger",
					});
					return;
				}
			},
		});

	function unsubscribe() {
		updateUserIsPremiumMutation({
			variables: {
				isPremium: false,
			},
		});
	}

	const [enabled, setEnabled] = useState(false);
	const pricingOptions: PricingOption[] = [
		{
			name: "Gratuit",
			price: "0€",
			yearlyPrice: "0€",
			description:
				"Profitez d'un éditeur de code gratuit pour développer vos projets. Accédez à toutes les fonctionnalités essentielles pour écrire, tester et déboguer votre code.",
			features: [
				"Accès à toutes les fonctionnalités",
				"Auto-complétion",
				"50 exécutions de code par jour",
				"Limite de 5 projets",
			],
			link: "/profile",
			external: false,
			btn: "Continuer avec le plan gratuit",
		},
		{
			name: "Pro",
			price: "9,99€",
			yearlyPrice: "99,99€",
			description:
				"En plus de toutes les fonctionnalités de la version gratuite, vous bénéficiez d'un support prioritaire, et bien plus encore avec notre abonnement Pro.",
			features: [
				"Exécutions de code illimitées",
				"Projets illimités",
				"Travail en équipe",
				"Accès anticipé aux nouvelles fonctionnalités",
			],
			link: "/premium/checkout/" + (enabled ? "annual" : "monthly"),
			btn: "Passer premium",
			external: false,
			extraBenefits: "Tout ce qui est inclus dans le plan gratuit, plus",
		},
	];

	return (
		<AuthLayout>
			{isPremium ? (
				// Render premium content here
				<section className="mx-auto max-w-5xl">
					<div className="flex flex-col gap-y-2">
						<div className="mx-auto max-w-5xl text-center">
							<h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
								Vous êtes{" "}
								<span className="text-primary uppercase">premium</span>,
							</h2>

							<p className="mt-4 text-2xl leading-8 text-white">
								profitez de notre éditeur de code <strong>puissant</strong> et{" "}
								<strong>intuitif</strong> sans limites.
							</p>
						</div>
						<div className="mt-5 flex justify-center">
							<div className="mx-auto grid h-full w-full max-w-4xl place-content-center items-center gap-6 md:px-10 py-6 lg:items-start">
								<ul>
									<PricingCard
										option={pricingOptions[1]}
										enabled={enabled}
										isPremium={isPremium}
									/>
								</ul>
							</div>
						</div>
						<div className="flex justify-center">
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant={"destructive"}
									className="mt-4 gap-1 w-fit"
									// onClick={unsubscribe}
								>
									Se désabonner
								</Button>
							</AlertDialogTrigger>

							<AlertDialogContent>
								<p className="text-center text-white">
									Êtes-vous sûr de vouloir vous désabonner ?
								</p>
								
								<div className="flex justify-center gap-2">
									<Button
										variant={"destructive"}
										className="mt-4 gap-1 w-fit"
										onClick={unsubscribe}
									>
										Oui
									</Button>
									<Button
										variant={"outline"}
										className="mt-4 gap-1 w-fit"
									>
										Non
									</Button>
								</div>
							</AlertDialogContent>
						</AlertDialog>
						</div>
					</div>
				</section>
			) : (
				// Render non-premium content here
				<section className="mx-auto max-w-5xl">
					<div className="flex flex-col gap-y-2">
						<div className="mx-auto max-w-5xl text-center">
							<h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
								Développez sans limite
							</h2>

							<p className="mt-4 text-2xl leading-8 text-white">
								avec notre éditeur de code <strong>puissant</strong> et{" "}
								<strong>intuitif</strong>.
							</p>
						</div>
						<div className="mt-5 flex justify-center">
							<PricingToggle
								enabled={enabled}
								setEnabled={setEnabled}
								color="bg-primary"
							/>
						</div>
						<div className="mx-auto grid h-full w-full max-w-4xl place-content-center items-center gap-6 md:px-10 py-6 lg:items-start">
							{pricingOptions.map((option, index) => (
								<PricingCard
									key={index}
									option={option}
									enabled={enabled}
									isPremium={isPremium}
								/>
							))}
						</div>
					</div>
				</section>
			)}
		</AuthLayout>
	);
}
