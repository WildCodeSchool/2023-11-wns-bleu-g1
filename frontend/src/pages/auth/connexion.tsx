import LogoImg from "@/components/logo-svg";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
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

const SignInPage = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<div className="container mx-auto w-full min-h-screen py-8 space-y-6 md:space-y-10">
			<LogoImg width={150} height={100} className="mx-auto" />
			<Card className="h-fit sm:w-[350px] xl:w-[350px] m-auto">
				<CardHeader>
					<CardTitle>Connexion</CardTitle>
					<CardDescription>Entrez vos identifiants ici.</CardDescription>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<CardContent className="space-y-3">
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
						</CardContent>
						<CardFooter className="justify-between">
							<Button type="button" variant={"outline"}>
								Annuler
							</Button>
							<Button type="submit">Se connecter</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	);
};

export default SignInPage;
