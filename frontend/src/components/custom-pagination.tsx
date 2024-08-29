import { Exact } from "@/graphql/generated/schema";
import { QueryResult } from "@apollo/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
	page: number;
	setPage: (page: number) => void;
	limit: number;
	dataLength: number;
	query: QueryResult<any, Exact<{ limit: number; offset: number }>>;
	hasMore: boolean;
}
const CustomPagination = ({
	page,
	setPage,
	limit,
	dataLength,
	query,
	hasMore,
}: Props) => {
	const handlePreviousPage = () => {
		if (page > 0) setPage(page - 1);
	};

	const handleNextPage = () => {
		if (dataLength === limit) setPage(page + 1);
		query.fetchMore({
			variables: {
				offset: dataLength,
			},
		});
	};

	if (page === 0 && !hasMore) return null;

	return (
		<div className="w-full flex items-center justify-between px-24 py-2 my-6">
			<Button
				variant={"ghost"}
				className="gap-1 w-fit pl-2.5"
				disabled={page === 0}
				onClick={handlePreviousPage}
			>
				<ChevronLeft className="h-4 w-4 mt-1" />
				Précédent
			</Button>
			<Button
				variant={"ghost"}
				className="gap-1 w-fit pr-2.5"
				disabled={dataLength < limit}
				onClick={handleNextPage}
			>
				Suivant
				<ChevronRight className="h-4 w-4 mt-1" />
			</Button>
		</div>
	);
};

export default CustomPagination;
