import React from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";

const Topbar = () => {
    return (
            <div className="flex items-center justify-between fixed top-0 h-[10%] w-full align-middle px-2 bg-topbarbackground/[33%]">
                <Image
                    src="logo.svg"
                    alt="Logo"
                    width={100}
                    height={100}
                />
                <Button>Se connecter</Button>
            </div>
    )
}
export default Topbar