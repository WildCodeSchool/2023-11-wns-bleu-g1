import React, { useEffect, useRef, useState } from "react";

import { Separator } from "@/components/ui/separator";
import AuthLayout from "@/components/elements/auth-layout";
import { useRouter } from "next/router";
import {
	useGetProjectByIdQuery,
	useGetUserProfileQuery,
	GetProjectByIdQuery,
} from "@/graphql/generated/schema";

import LikeButton from "@/components/socials/like-button";
import PageLoader from "@/components/elements/page-loader";
import CodeEditor from "@/components/elements/CodeEditor";
import { useToast } from "@/components/ui/use-toast";

const CodingPage = () => {
	const router = useRouter();
	const { toast } = useToast();
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
				<CodeEditor project={project} userId={userId} />

				<Separator className="mt-3 md:mt-8 mb-3" />

				<LikeButton project={project} userId={userId} />
			</div>
		</AuthLayout>
	);
};

export default CodingPage;
