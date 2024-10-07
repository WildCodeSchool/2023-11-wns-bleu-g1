import { useUsersQuery } from "@/graphql/generated/schema";
import { Separator } from "@radix-ui/react-menu";
import ElementDelete from "@/components/elements/admin/ElementDelete";

const AdminUsers = () => {
	const { data } = useUsersQuery();
	const users = data?.users || [];
	const nonAdminUsers = users.filter((user) => user.role !== "admin");

	return (
		<>
			<h1 className="flex w-full justify-center text-2xl font-bold">
				Administration des utilisateurs
			</h1>
			<div className="pt-2 w-full flex justify-center mt-5">
				<div
					className="flex flex-col justify-center w-1/3 border border-white rounded-xl px-3 pb-4 pt-2"
					id="languagesListSection"
				>
					<h2>Liste des utilisateurs:</h2>
					<Separator />
					{nonAdminUsers.map((user) => (
						<div key={user.id} className="flex justify-between py-1">
							<p className="flex w-full items-center text-center">
								{user.pseudo}
							</p>
							<div className="flex gap-2">
								<ElementDelete id={user.id} elementType="user" />
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default AdminUsers;
