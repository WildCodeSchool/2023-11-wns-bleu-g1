import AuthLayout from "@/components/elements/auth-layout";
import PageLoader from "@/components/elements/page-loader";
import UserHeadCard from "@/components/elements/user-head-card";
import { useGetUserProfileQuery } from "@/graphql/generated/schema";

export default function Profile() {
	const getUserProfileQuery = useGetUserProfileQuery();

	if (getUserProfileQuery.loading) return <PageLoader />;
	if (getUserProfileQuery.error) console.error(getUserProfileQuery.error);

	const profile = getUserProfileQuery?.data?.getUserProfile || null;

	return (
		<AuthLayout
		>
			{/* <div className={`flex gap-5 w-full max-w-3xl items-center`}> */}
				<UserHeadCard profile={profile} />
			{/* </div> */}

			<section className={`flex flex-col gap-5 w-full max-w-3xl text-xl md:justify-center`}>
				{/* <div
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
				</div> */}

				<div className={`flex flex-col gap-4 min-h-[150px] py-8 border-t-2 border-foreground md:border-none`}>
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
		</AuthLayout>
	);
}
