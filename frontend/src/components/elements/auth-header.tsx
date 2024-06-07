import React from "react";
import Logo from "./Logo";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BadgeCheck, Crown, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	useGetUserProfileQuery,
	useLogoutMutation,
} from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const AuthHeader = () => {
	const router = useRouter();
	const { toast } = useToast();

	const getUserProfileQuery = useGetUserProfileQuery();

	const [logoutMutation, logoutMutationResult] = useLogoutMutation({
		onCompleted: () => {
			toast({
				icon: <BadgeCheck className="h-5 w-5" />,
				title: "Déconnexion réussie",
				className: "text-success",
			});
			router.push("/auth/connexion");
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const itemsClassName = "gap-2";
	const iconsClassName = "h-4 w-4";

	const handleLogout = async () => {
		await logoutMutation();
	};

	const profile = getUserProfileQuery?.data?.getUserProfile || null;

	const onCodingPage = router.pathname === "/coding/codingPage";
	return (
		<header className="py-4 bg-topbarbackground/[33%]">
			<nav className="container flex items-center justify-between">
				<Link href="/">
					<Logo />
				</Link>

				<div className="inline-flex gap-6">
					{!onCodingPage ? (
						<Link href={"/coding/codingPage"} className={buttonVariants()}>
							Nouveau projet
						</Link>
					) : null}
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar>
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>
									{profile?.pseudo[0].toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>{profile?.pseudo}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className={itemsClassName}>
								<User className={iconsClassName} />
								<Link href={"/tableau-de-bord"}>Mon profil</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className={cn(
									itemsClassName,
									"text-warning focus:text-warning"
								)}
							>
								<Crown className={iconsClassName} />
								Passer Premium
							</DropdownMenuItem>
							<DropdownMenuItem
								className={cn(itemsClassName, "text-error focus:text-error")}
								onClick={handleLogout}
							>
								<LogOut className={iconsClassName} />
								Déconnexion
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>
		</header>
	);
};

export default AuthHeader;
