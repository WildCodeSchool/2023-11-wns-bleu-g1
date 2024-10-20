import {
	useGetCommentsQuery,
	useGetLanguagesQuery,
	useGetProjectsQuery,
	useUsersQuery,
} from "@/graphql/generated/schema";
import * as React from "react";
import {
	Label,
	Pie,
	PieChart,
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	LabelList,
	Line,
	LineChart,
	Cell,
} from "recharts";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const AdminOverview = () => {
	const { data: userData } = useUsersQuery();
	const users = userData?.users || [];
	const adminUsers = users.filter((user: any) => user.role === "admin");
	const visitorUsers = users.filter((user: any) => user.role === "visitor");
	const lastRegisteredUser = users[users.length - 1];

	const { data: languagesData } = useGetLanguagesQuery();
	const languages = languagesData?.getLanguages || [];

	const { data: projectsData } = useGetProjectsQuery();
	const projects = projectsData?.getProjects || [];
	const publicProjects = projects.filter(
		(project: any) => project.isPublic === true
	);

	const { data } = useGetCommentsQuery();
	const comments = data?.getComments || [];
	const getCommentsByDayOffset = (offset: number) => {
		const targetDate = new Date();
		targetDate.setDate(targetDate.getDate() - offset);
		const targetDateString = targetDate.toISOString().split("T")[0];

		return comments.filter((comment: any) => {
			const commentDate = new Date(comment.createdAt)
				.toISOString()
				.split("T")[0];
			return commentDate === targetDateString;
		});
	};

	const userChartData = React.useMemo(
		() => [
			{
				type: "admin",
				number: adminUsers.length,
				fill: "#ebebeb",
			},
			{
				type: "visiteurs",
				number: visitorUsers.length,
				fill: "#466582",
			},
		],
		[adminUsers.length, visitorUsers.length]
	);

	const userChartConfig = {
		users: {
			label: "Utilisateurs",
		},
		admin: {
			label: "Admin",
			color: "#ebebeb",
		},
		visitor: {
			label: "visiteurs",
			color: "#466582",
		},
	} satisfies ChartConfig;

	const projetsChartData = [
		{ name: "Projets", total: projects.length, public: publicProjects.length },
	];
	const projetsChartConfig = {
		total: {
			label: "Total",
			color: "#526",
		},
		public: {
			label: "Public",
			color: "#366",
		},
	} satisfies ChartConfig;

	const languagesChartData = [];
	const languagesChartConfig: {
		[key: string]: { label: string; color: string };
	} = {
		languages: {
			label: "codes",
			color: "colors",
		},
	} satisfies ChartConfig;
	for (const language of languages) {
		languagesChartData.push({
			name: language.name,
			codes: language.codes.length,
			color: language.color,
		});
		languagesChartConfig[language.name] = {
			label: language.name,
			color: language.color,
		};
	}

	const commentsChartData = [
		{ day: "J-5", comments: getCommentsByDayOffset(5).length },
		{ day: "J-4", comments: getCommentsByDayOffset(4).length },
		{ day: "J-3", comments: getCommentsByDayOffset(3).length },
		{ day: "J-2", comments: getCommentsByDayOffset(2).length },
		{ day: "J-1", comments: getCommentsByDayOffset(1).length },
		{ day: "J", comments: getCommentsByDayOffset(0).length },
	];

	const commentsChartConfig = {
		comments: {
			label: "Commentaires",
			color: "#2563eb",
		},
	} satisfies ChartConfig;

	const totalVisitors = React.useMemo(() => {
		return userChartData.reduce((acc, curr) => acc + curr.number, 0);
	}, [userChartData]);

	return (
		<>
			<div className="w-full grid grid-rows-2 grid-cols-2 gap-4 bg-transparent">
				<Card className="flex flex-col">
					<CardHeader className="items-center pb-0">
						<CardTitle>Utilisateurs</CardTitle>
					</CardHeader>
					<CardContent className="flex-1 pb-0">
						<ChartContainer
							config={userChartConfig}
							className="mx-auto aspect-square max-h-[250px]"
						>
							<PieChart>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent hideLabel />}
								/>
								<Pie
									data={userChartData}
									dataKey="number"
									nameKey="type"
									innerRadius={60}
									strokeWidth={5}
								>
									<Label
										content={({ viewBox }) => {
											if (viewBox && "cx" in viewBox && "cy" in viewBox) {
												return (
													<text
														x={viewBox.cx}
														y={viewBox.cy}
														textAnchor="middle"
														dominantBaseline="middle"
													>
														<tspan
															x={viewBox.cx}
															y={viewBox.cy}
															className="fill-foreground text-3xl font-bold"
														>
															{totalVisitors.toLocaleString()}
														</tspan>
														<tspan
															x={viewBox.cx}
															y={(viewBox.cy || 0) + 24}
															className="fill-muted-foreground"
														>
															Utilisateurs
														</tspan>
													</text>
												);
											}
										}}
									/>
								</Pie>
							</PieChart>
						</ChartContainer>
					</CardContent>
					<CardFooter className="flex-col gap-2 text-sm">
						<div className="flex items-center gap-2 font-medium leading-none">
							Dernier inscrit: {lastRegisteredUser?.pseudo} (
							{lastRegisteredUser?.role})
						</div>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex justify-center">Langages</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={languagesChartConfig}>
							<BarChart
								accessibilityLayer
								data={languagesChartData}
								layout="vertical"
								margin={{
									left: 20,
								}}
							>
								<YAxis
									dataKey="name"
									type="category"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) =>
										languagesChartConfig[
											value as keyof typeof languagesChartConfig
										]?.label
									}
								/>
								<XAxis dataKey="codes" type="number" hide />
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent hideLabel />}
								/>
								<Bar dataKey="codes" layout="vertical" radius={5}>
									{languagesChartData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Bar>
							</BarChart>
						</ChartContainer>
					</CardContent>
					<CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex justify-center">Projets</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={projetsChartConfig}>
							<BarChart accessibilityLayer data={projetsChartData}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) => value.slice(0, 3)}
								/>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent indicator="dashed" />}
								/>
								<Bar dataKey="total" fill="var(--color-total)" radius={4} />
								<Bar dataKey="public" fill="var(--color-public)" radius={4} />
							</BarChart>
						</ChartContainer>
					</CardContent>
					<CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex justify-center">Commentaires</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={commentsChartConfig}>
							<LineChart
								accessibilityLayer
								data={commentsChartData}
								margin={{
									top: 20,
									left: 12,
									right: 12,
								}}
							>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="day"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => value.slice(0, 3)}
								/>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent indicator="line" />}
								/>
								<Line
									dataKey="comments"
									type="natural"
									stroke="var(--color-comments)"
									strokeWidth={2}
									dot={{
										fill: "var(--color-comments)",
									}}
									activeDot={{
										r: 6,
									}}
								>
									<LabelList
										position="top"
										offset={12}
										className="fill-foreground"
										fontSize={12}
									/>
								</Line>
							</LineChart>
						</ChartContainer>
					</CardContent>
					<CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
				</Card>
			</div>
		</>
	);
};

export default AdminOverview;
