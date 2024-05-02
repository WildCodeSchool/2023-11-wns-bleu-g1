import Image from "next/image";
import { Inter } from "next/font/google";
// import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between pt-24 px-16 ${inter.className}`}
			>
				<header
					className={`flex gap-5`}>
						<div
							className={`overflow-hidden rounded-full border`}>
								<Image
									// className={``}
									src={"user exists" == true ? "image du profil" : "/profile_placeholder.jpg"}
									alt="Profile picture"
									width={90}
									height={90}
									/>
						</div>
						<div
							className={`max-w-96 text-ellipsis overflow-hidden flex flex-col justify-between`}>
								<h3
									className={`text-4xl`}>
										{"user exists" == true ? "nom de l'utilisateur" : "zNeossssssssssssssss"}
								</h3>
								{/* BADGE == COMPOSANT {{ A FAIRE }} */}
								<p
									className={`text-center rounded-full bg-destructive`}
									title={"user exists" == true ? "role de l'utilisateur" : "Flex Master"}>
										{"user exists" == true ? "role de l'utilisateur" : "Flex Master"}
								</p>
						</div>
				</header>
		</main>
	);
}
