import AuthLayout from "@/components/elements/auth-layout";
import PageLoader from "@/components/elements/page-loader";
import UserHeadCard from "@/components/elements/user-head-card";
import { useGetUserProfileQuery } from "@/graphql/generated/schema";

const DashboardPage = () => {
	const getUserProfileQuery = useGetUserProfileQuery();

	if (getUserProfileQuery.loading) return <PageLoader />;
	if (getUserProfileQuery.error) console.error(getUserProfileQuery.error);

	const profile = getUserProfileQuery?.data?.getUserProfile || null;

	return (
		<AuthLayout>
			<div className="py-8 space-y-8">
				<UserHeadCard profile={profile} />
				<h3 className="text-2xl font-semibold">Mes Projets</h3>
				<p>Liste des projets à venir...</p>
			</div>
		</AuthLayout>
	);
};

export default DashboardPage;
