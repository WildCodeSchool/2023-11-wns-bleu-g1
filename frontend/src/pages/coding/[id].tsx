import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthLayout from "@/components/elements/auth-layout";
import { useRouter } from "next/router";
import {
	useUpdateCodeMutation,
	useGetProjectByIdQuery,
	useGetUserProfileQuery,
	GetProjectByIdQuery,
} from "@/graphql/generated/schema";
import { BadgeCheck, Save } from "lucide-react";
import LikeButton from "@/components/socials/like-button";
import PageLoader from "@/components/elements/page-loader";
import CodeEditor from "@/components/elements/CodeEditor";
import { toast } from "@/components/ui/use-toast";

const CodingPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const {
		data: getUserProfileData,
		loading: getUserProfileLoading,
		error: getUserProfileError,
	} = useGetUserProfileQuery();

	const {
		data,
		loading: getProjectByIdloading,
		error: getProjectByIdError,
	} = useGetProjectByIdQuery({
		variables: {
			getProjectId: id as string,
		},
		skip: !id,
	});

	const project = data?.getProject as GetProjectByIdQuery["getProject"];

	if (getUserProfileLoading || getProjectByIdloading) {
		return <PageLoader />;
	}

	if (getUserProfileError || getProjectByIdError) {
		console.error(getUserProfileError || getProjectByIdError);
		return;
	}

	const userId = getUserProfileData?.getUserProfile.id as string;

	return (
		<AuthLayout>
			<div className="min-h-dvh">
				<CodeEditor project={project} />

				<Separator className="mt-3 md:mt-8 mb-3" />

				<LikeButton project={project} userId={userId} />
			</div>
		</AuthLayout>
	);
};

export default CodingPage;
