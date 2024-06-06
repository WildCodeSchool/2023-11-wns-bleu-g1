import Image from "next/image";
import { Inter } from "next/font/google";
// import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Profile() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between py-24 px-16 ${inter.className}`}
		>
			<header className={`flex gap-5 w-full max-w-3xl items-center`}>
				<div className={`overflow-hidden rounded-full border`}>
					<Image
						// className={``}
						src={
							"user exists" == true
								? "image du profil"
								: "/profile_placeholder.jpg"
						}
						alt="Profile picture"
						width={90}
						height={90}
					/>
				</div>
				<div
					className={`max-w-[60%] text-ellipsis overflow-hidden flex flex-col gap-2`}
				>
					<h3 className={`text-4xl text-center`}>
						{"user exists" == true
							? "nom de l'utilisateur"
							: "Utilisateur introuvable"}
					</h3>
					{/* BADGE == COMPOSANT {{ A FAIRE }} */}
					<p
						className={`text-center rounded-full bg-destructive text-xs py-1`}
						title={
							"user exists" == true ? "role de l'utilisateur" : "Flex Master"
						}
					>
						{"user exists" == true ? "role de l'utilisateur" : "Flex Master"}
					</p>
				</div>
			</header>

			<section className={`flex flex-col gap-5 w-full max-w-3xl text-xl`}>
				<div
					className={`flex flex-col gap-6 border-b-2 border-foreground pb-8`}
				>
					<p className={`flex gap-5 items-center`}>
						<span
							className={`flex justify-center items-center rounded-full bg-blue-400 text-background min-w-[50px] min-h-[50px]`}
						>
							58
						</span>
						Projets
					</p>
					<p className={`flex gap-5 items-center`}>
						<span
							className={`flex justify-center items-center rounded-full bg-blue-400 text-background min-w-[50px] min-h-[50px]`}
						>
							125
						</span>
						Likes
					</p>
					<p className={`flex gap-5 items-center`}>
						<span
							className={`flex justify-center items-center rounded-full bg-blue-400 text-background min-w-[50px] min-h-[50px]`}
						>
							68
						</span>
						Commentaires
					</p>
				</div>

				<div className={`flex flex-col gap-4 min-h-[150px]`}>
					<h3 className={`text-center mb-4`}>Bests projects</h3>

					<div className={`flex gap-5 text-base`}>
						<p
							className={`flex items-center bg-gray-400 text-background min-w-[65%] px-3 rounded-xl`}
						>
							Hack the NASA
						</p>

						<span className={`flex items-center gap-2`}>
							<strong className={`text-2xl`}>★</strong>
							25
						</span>
					</div>

					<div className={`flex gap-5 text-base`}>
						<p
							className={`flex items-center bg-gray-400 text-background min-w-[65%] px-3 rounded-xl`}
						>
							Elon is afraid
						</p>

						<span className={`flex items-center gap-2`}>
							<strong className={`text-2xl`}>★</strong>
							25
						</span>
					</div>

					<div className={`flex gap-5 text-base`}>
						<p
							className={`flex items-center bg-gray-400 text-background min-w-[65%] px-3 rounded-xl`}
						>
							Youtube unlimited
						</p>

						<span className={`flex items-center gap-2`}>
							<strong className={`text-2xl`}>★</strong>
							25
						</span>
					</div>

					<div className={`flex gap-5 text-base`}>
						<p
							className={`flex items-center bg-gray-400 text-background min-w-[65%] px-3 rounded-xl`}
						>
							REACT Marios Bros.
						</p>

						<span className={`flex items-center gap-2`}>
							<strong className={`text-2xl`}>★</strong>
							25
						</span>
					</div>
				</div>
			</section>
		</main>
	);
}
