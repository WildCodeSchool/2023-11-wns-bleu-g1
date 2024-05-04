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
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: "L'adresse email est requise.",
		})
		.email({
			message: "L'adresse email est invalide.",
		}),
	password: z.string().min(1, {
		message: "Le mot de passe est requis.",
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
		<div className="container mx-auto w-full min-h-screen py-10 space-y-10 md:space-y-20 flex flex-col justify-center">
			<Link href={"/"}>
				<Image
					src="/logo.svg"
					alt="Wild Code Online Logo"
					className="mx-auto"
					width={150}
					height={100}
					priority
				/>
			</Link>
			<Card className="h-fit sm:w-[350px] xl:w-[350px] m-auto">
				<CardHeader>
					<CardTitle className="text-center">Content de vous revoir !</CardTitle>
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
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mot de passe*</FormLabel>
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

export default SignInPage;
