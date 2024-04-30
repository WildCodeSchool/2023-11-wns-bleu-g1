import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type TopbarProps = {
	isTopOfPage: boolean;
}

const Topbar = ({isTopOfPage}: TopbarProps) => {
	const topbarBackground = isTopOfPage ? "bg-topbarbackground/[33%]" : "bg-topbarbackground";

	return (
		<div className={`${topbarBackground} fixed top-0 flex h-[10%] w-full items-center justify-between px-2 align-middle transition ease-in-out duration-700`}>
			<Image src="logo.svg" alt="Logo" width={100} height={100} />
			<Button>Se connecter</Button>
		</div>
	);
};

export default Topbar;
