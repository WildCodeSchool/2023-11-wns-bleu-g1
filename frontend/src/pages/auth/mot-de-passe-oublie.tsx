import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { useSignInMutation } from "@/graphql/generated.old/schema";
import { ApolloError } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "@/components/elements/Logo";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: "L'adresse email est requise.",
		})
		.email({
			message: "L'adresse email est invalide.",
		}),
});

const ForgotPassword = () => {
	const router = useRouter();
	const { toast } = useToast();

	const defaultErrorMessage =
		"Une erreur est survenue. Veuillez réessayer.";
	const [errorMessage, setErrorMessage] = useState<string>(defaultErrorMessage);

	const [forgotPasswordMutation, forgotPasswordMutationResult] = useForgotPasswordMutation({
		onCompleted: (data) => {
			toast({
				icon: <BadgeCheck className="h-5 w-5" />,
				title: "Un email vient de vous être envoyé.",
				className: "text-success",
			});
			router.push("/auth/connexion");
		},
		onError: (err: ApolloError) => {
			console.error(err);
			if (err.message.includes("not register")) {
				setErrorMessage("Aucun utilisateur à cette adresse email.");
				return;
			}
			setErrorMessage(defaultErrorMessage);
		},
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		forgotPasswordMutation({
			variables: {
				data: {
					email: values.email,
				},
			},
		});
	}

	return (
		<div className="container mx-auto w-full min-h-screen py-10 space-y-6 md:space-y-10">
			<Link href={"/"} className="flex w-full justify-center">
				<Logo width={150} height={100} />
			</Link>
			<Card className="h-fit sm:w-[350px] xl:w-[350px] m-auto">
				<CardHeader>
					<CardTitle className="text-center">
						Content de vous revoir !
					</CardTitle>
					<CardDescription className="text-center">
						Connectez-vous pour accéder à votre compte.
					</CardDescription>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<CardContent className="space-y-3">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email*</FormLabel>
										<FormControl>
											<Input placeholder="john.doe@gmail.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{forgotPasswordMutationResult.error && (
								<Alert variant="error">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle className="font-bold">Erreur</AlertTitle>
									<AlertDescription className="font-semibold">
										{errorMessage}
									</AlertDescription>
								</Alert>
							)}
						</CardContent>
						<CardFooter className="flex-col gap-4">
							<Button type="submit" className="w-full">
								Se connecter
							</Button>
							<span className="text-sm">
								Vous n&apos;êtes pas encore inscrit ?{" "}
								<Link
									href={"/auth/inscription"}
									className="text-primary hover:underline"
								>
									Inscrivez-vous
								</Link>
							</span>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	);
};

export default ForgotPassword;
