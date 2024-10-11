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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "@/components/elements/common/Logo";
import { useToast } from "@/components/ui/use-toast";

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
		})
		.max(100, {
			message: "L'adresse email doit contenir au plus 100 caractères.",
		}),
	password: z.string().min(3, {
		message: "Le mot de passe doit contenir au moins 3 caractères.",
	}),
});

const SignUpPage = () => {
	const router = useRouter();
	const { toast } = useToast();

	const defaultErrorMessage =
		"Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
	const [errorMessage, setErrorMessage] = useState<string>(defaultErrorMessage);

	const [signUpMutation, signUpMutationResult] = useSignUpMutation({
		onCompleted: () => {
			toast({
				icon: <BadgeCheck className="h-5 w-5" />,
				title: "Inscription réussie",
				className: "text-success",
			});
			router.push("/auth/connexion");
		},
		onError: (err: ApolloError) => {
			console.error(err);
			if (err.message.includes("already exist")) {
				setErrorMessage("Cette adresse email est déjà utilisée.");
				return;
			}
			setErrorMessage(defaultErrorMessage);
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
	const messageOKClassName = "text-green-700 dark:text-green-800";

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
			regex: !password || !/[@./#&+-_\\,;:!^(){}]/.test(password),
			message: "Contenir au moins un caractère spécial",
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
		<div className="container mx-auto w-full min-h-screen py-10 space-y-6 md:space-y-10">
			<Link href={"/"} className="flex w-full justify-center">
				<Logo width={150} height={100} />
			</Link>
			<Card className="h-fit sm:w-[350px] xl:w-[400px] m-auto">
				<CardHeader>
					<CardTitle className="text-center">Rejoignez-nous !</CardTitle>
					<CardDescription className="text-center">
						Inscrivez-vous pour devenir un membre.
					</CardDescription>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<CardContent className="space-y-3">
							<FormField
								control={form.control}
								name="pseudo"
								render={({ field }) => (
									<FormItem>
										<FormLabel data-testid="label-pseudo">Pseudo</FormLabel>
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
										<FormLabel data-testid="label-email">Email</FormLabel>
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
												{...field}
											/>
										</FormControl>
										<FormMessage />
										<Alert
											variant={isPasswordValid ? "success" : "error"}
											className="hidden peer-focus:block"
										>
											<Lock className="h-4 w-4 mt-1" />
											<AlertTitle className="font-bold text-lg">
												Le mot de passe doit :
											</AlertTitle>
											<AlertDescription>
												{messages.length > 0 &&
													messages.map((message, index) => (
														<p
															key={index}
															className={cn(
																"text-md font-semibold flex gap-2",
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
									<AlertTitle className="font-bold">Erreur</AlertTitle>
									<AlertDescription className="font-semibold">
										{errorMessage}
									</AlertDescription>
								</Alert>
							)}
						</CardContent>
						<CardFooter className="flex-col gap-4">
							<Button
								type="submit"
								isLoading={signUpMutationResult.loading}
								disabled={
									signUpMutationResult.data ? true : false || !isPasswordValid
								}
								className="w-full"
							>
								S&apos;inscrire
							</Button>

							<span className="text-sm">
								Déjà inscrit ?{" "}
								<Link
									href="/auth/connexion"
									className={"text-primary hover:underline"}
								>
									Connectez-vous
								</Link>
							</span>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	);
};

export default SignUpPage;
