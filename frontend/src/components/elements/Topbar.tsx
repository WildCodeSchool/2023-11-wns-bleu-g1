import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
			className={`${topbarBackground} fixed top-0 flex h-[10%] w-full items-center justify-between px-2 align-middle transition duration-700 ease-in-out`}
		>
			<Image src="logo.svg" alt="Logo" width={100} height={100} />
			<Button border={border} className={`${border}`}>Se connecter</Button>
		</div>
	);
};

export default Topbar;
