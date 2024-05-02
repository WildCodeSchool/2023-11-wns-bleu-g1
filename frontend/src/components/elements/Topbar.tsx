import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TopbarProps = {
	isTopOfPage: boolean;
};

const Topbar = ({ isTopOfPage }: TopbarProps) => {
	const topbarBackground = isTopOfPage
		? "bg-topbarbackground/[33%]"
		: "bg-topbarbackground";
	const border = !isTopOfPage;
	return (
		<div
			className={`${topbarBackground} fixed top-0 h-fit w-full flex items-center py-4 z-50`}
		>
			<div className="container mx-auto flex items-center justify-between align-middle transition duration-700 ease-in-out">
				<Image src="logo.svg" alt="Logo" width={75} height={75} />
				<Link href={"/auth/connexion"} className="text-primary hover:underline">
					<Button border={border} className={`${border}`}>
						Se connecter
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default Topbar;
