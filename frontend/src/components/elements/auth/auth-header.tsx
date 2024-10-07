import React from "react";
import Logo from "../common/Logo";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
	BadgeCheck,
	Crown,
	FolderOpen,
	LogOut,
	Shield,
	User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
	useGetUserProfileQuery,
	useLogoutMutation,
} from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import { useToast } from "../../ui/use-toast";
import Link from "next/link";
import NewProjectPopup from "@/components/elements/project/NewProjectPopup";
import client from "@/graphql/config/client";

const AuthHeader = () => {
	const router = useRouter();
	const { toast } = useToast();

	const getUserProfileQuery = useGetUserProfileQuery();

	const [logoutMutation, logoutMutationResult] = useLogoutMutation({
		onCompleted: async () => {
			toast({
				icon: <BadgeCheck className="h-5 w-5" />,
				title: "Déconnexion réussie",
				className: "text-success",
			});
			await client.clearStore();
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
					{!onCodingPage ? <NewProjectPopup /> : null}
					<DropdownMenu>
						<DropdownMenuTrigger className="relative isolate" id="dropdownMenu">
							{profile?.isPremium && (
								<Crown className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
							)}
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
							<DropdownMenuItem className={itemsClassName} asChild>
								<Link href={`/profile`}>
									<User className={iconsClassName} />
									Mon profil
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className={itemsClassName} asChild>
								<Link href={"/communaute"}>
									<FolderOpen className={iconsClassName} />
									Communauté
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className={cn(
									itemsClassName,
									"text-warning focus:text-warning"
								)}
								asChild
							>
								<Link href={"/premium"}>
									<Crown className={iconsClassName} />
									Mon abonnement
								</Link>
							</DropdownMenuItem>
							{profile?.role === "admin" ? (
								<DropdownMenuItem
									className={cn(
										itemsClassName,
										"text-success focus:text-success"
									)}
									asChild
								>
									<Link href={`/admin`}>
										<Shield className="{iconsClassName} size-4" />
										Administation
									</Link>
								</DropdownMenuItem>
							) : null}
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
