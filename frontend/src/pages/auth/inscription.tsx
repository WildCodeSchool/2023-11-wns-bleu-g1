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
import { cn } from "@/lib/utils";
import { ApolloError } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	AlertCircle,
	BadgeCheck,
	CheckCircleIcon,
	Lock,
	XCircleIcon,
} from "lucide-react";
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

	const [passwordInputFocused, setPasswordInputFocused] = useState(false);
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

	const password = form.watch("password");
	const messageKOClassName = "";
	const messageOKClassName = "text-success-200";

	const messages: Array<{
		classname: { KO: string; OK: string };
		regex: boolean | null;
		message: string;
	}> = [
		{
			classname: { KO: messageKOClassName, OK: messageOKClassName },
			regex: !password || password?.length < 8,
			message: "Contenir au moins 8 caractères",
		},
		{
			classname: { KO: messageKOClassName, OK: messageOKClassName },
			regex: !password || !/[A-Z]/.test(password),
			message: "Contenir au moins une lettre majuscule.",
		},
		{
			classname: { KO: messageKOClassName, OK: messageOKClassName },
			regex: !password || !/[a-z]/.test(password),
			message: "Contenir au moins une lettre minuscule.",
		},
		{
			classname: { KO: messageKOClassName, OK: messageOKClassName },
			regex: !password || !/[0-9]/.test(password),
			message: "Contenir au moins un chiffre.",
		},
	];

	const isPasswordValid = !messages.filter((message) => message.regex !== false)
		.length;

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
												className={cn(
													"peer",
													isPasswordValid &&
														"focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-success-200"
												)}
												onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
													setPasswordInputFocused(true);
												}}
												{...field}
											/>
										</FormControl>
										<FormMessage />
										<Alert
											variant={
												isPasswordValid ? "success-light" : "error-light"
											}
											className="hidden peer-focus:block"
										>
											<Lock className="h-4 w-4 mt-1" />
											<AlertTitle className="font-semibold text-lg">
												Le mot de passe doit :
											</AlertTitle>
											<AlertDescription>
												{messages.length > 0 &&
													messages.map((message, index) => (
														<p
															key={index}
															className={cn(
																"text-md flex gap-2",
																message.regex
																	? message.classname.KO
																	: message.classname.OK
															)}
														>
															{!message.regex ? (
																<CheckCircleIcon className="h-4 w-4 mt-1" />
															) : (
																<XCircleIcon className="h-4 w-4 mt-1" />
															)}
															{message.message}
														</p>
													))}
											</AlertDescription>
										</Alert>
									</FormItem>
								)}
							/>

							{signUpMutationResult.error && (
								<Alert variant="error">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>Erreur</AlertTitle>
									<AlertDescription>
										Une erreur est survenue lors de l&apos;inscription. Veuillez
										réessayer.
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
								disabled={
									signUpMutationResult.data ? true : false || !isPasswordValid
								}
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
