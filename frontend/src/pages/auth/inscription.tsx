import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignUpMutation } from "@/graphql/generated/schema";
import { ApolloError } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	pseudo: z
		.string()
		.min(2, {
			message: "Le pseudo doit contenir au moins 2 caractères.",
		})
		.max(50, {
			message: "Le pseudo doit contenir au plus 50 caractères.",
		}),
	email: z
		.string()
		.min(1, {
			message: "L'adresse email est requise.",
		})
		.email({
			message: "Adresse email invalide.",
		}),
	password: z.string().min(3, {
		message: "Le mot de passe doit contenir au moins 3 caractères.",
	}),
});

const SignUpPage = () => {
	const router = useRouter();

	const [errorMessageFormatted, setErrorMessageFormatted] = useState("");

	const [signUpMutation, signUpMutationResult] = useSignUpMutation({
		onCompleted: () => {
			router.push("/auth/connexion");
		},
		onError: (err: ApolloError) => {
			console.error(err);
			// const [errorExtensions]: any =
			// 	err.graphQLErrors[0].extensions["validationErrors"];
			// console.error(errorExtensions.constraints.isStrongPassword);
			// if (errorExtensions.constraints.isStrongPassword) {
			// 	setErrorMessageFormatted("Mot de passe");
			// }
		},
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			pseudo: "",
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		signUpMutation({
			variables: {
				data: {
					email: values.email,
					pseudo: values.pseudo,
					password: values.password,
				},
			},
		});
	}

	return (
		<div className="container mx-auto w-full min-h-screen py-8 space-y-6 md:space-y-10">
			<Image
				src="/logo.svg"
				alt="Wild Code Online Logo"
				className="mx-auto"
				width={150}
				height={100}
				priority
			/>
			<Card className="h-fit sm:w-[350px] xl:w-[400px] m-auto">
				<CardHeader>
					<CardTitle>Inscription</CardTitle>
					<CardDescription>Enregistrez vos informations ici.</CardDescription>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<CardContent className="space-y-3">
							<FormField
								control={form.control}
								name="pseudo"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pseudo</FormLabel>
										<FormControl>
											<Input placeholder="Pseudo" {...field} />
										</FormControl>
										<FormDescription>Ce sera votre nom public.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="john.doe@gmail.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mot de passe</FormLabel>
										<FormControl>
											<Input
												placeholder="********"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{signUpMutationResult.error && (
								<Alert variant="error">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>Erreur</AlertTitle>
									<AlertDescription>
										{errorMessageFormatted}
										{/* Une erreur est survenue lors de l&apos;inscription. Veuillez
										réessayer. */}
									</AlertDescription>
								</Alert>
							)}
							{signUpMutationResult.data && (
								<Alert variant="success">
									<BadgeCheck className="h-4 w-4" />
									<AlertTitle>Inscription Réussie</AlertTitle>
									<AlertDescription>
										Vous allez être redirigé vers la page de connexion.
									</AlertDescription>
								</Alert>
							)}
						</CardContent>
						<CardFooter className="justify-between">
							<Button
								type="button"
								variant={"outline"}
								disabled={signUpMutationResult.loading}
							>
								Annuler
							</Button>
							<Button
								type="submit"
								isLoading={signUpMutationResult.loading}
								disabled={signUpMutationResult.data ? true : false}
							>
								S&apos;inscrire
							</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	);
};

export default SignUpPage;
