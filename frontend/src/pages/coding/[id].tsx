import { Separator } from "@/components/ui/separator";
import AuthLayout from "@/components/elements/auth/auth-layout";
import { useRouter } from "next/router";
import {
	useGetProjectByIdQuery,
	useGetUserProfileQuery,
	GetProjectByIdQuery,
} from "@/graphql/generated/schema";

import LikeButton from "@/components/socials/like-button";
import PageLoader from "@/components/elements/common/page-loader";
import { CommentsSection } from "@/components/socials/comments/comments-section";
import { CommentButton } from "@/components/socials/comments/comment-button";
import { AddCommentForm } from "@/components/socials/comments/add-comment-form";
import CodeEditor from "@/components/elements/CodeEditor";

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
				<CodeEditor project={project} userId={userId} />

				<Separator className="mt-3 md:mt-8 mb-3" />

				{/* SOCIALS */}
				<div className="flex items-center gap-3">
					<LikeButton project={project} userId={userId} />
					<CommentButton commentsLength={project.comments.length} />
				</div>
				<div className="max-w-3xl mx-auto">
					<CommentsSection project={project} userId={userId} />
					<Separator className="mt-3 md:mt-8 mb-3" />
					<AddCommentForm projectId={project.id} />
				</div>
			</div>
		</AuthLayout>
	);
};

export default CodingPage;
