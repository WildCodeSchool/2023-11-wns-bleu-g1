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
import { BadgeCheck, Crown, FolderOpen, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLogoutMutation } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

const AuthHeader = () => {
	const router = useRouter();
	const { toast } = useToast();

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
	return (
		<header className="py-4">
			<nav className="container flex items-center justify-between">
				<Link href="/">
					<Logo />
				</Link>

				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Name</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className={itemsClassName}>
							<User className={iconsClassName} />
							Mon profil
						</DropdownMenuItem>
						<DropdownMenuItem className={itemsClassName}>
							<FolderOpen className={iconsClassName} />
							Mes projets
						</DropdownMenuItem>
						<DropdownMenuItem
							className={cn(itemsClassName, "text-warning focus:text-warning")}
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
			</nav>
		</header>
	);
};

export default AuthHeader;
