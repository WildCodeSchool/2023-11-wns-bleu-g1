import AuthLayout from "@/components/elements/auth/auth-layout";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLanguages from "@/components/elements/admin/AdminLanguages";
import AdminProjects from "@/components/elements/admin/AdminProjects";
import AdminUsers from "@/components/elements/admin/AdminUsers";
import AdminComments from "@/components/elements/admin/AdminComments";

const adminDashboard = () => {
	return (
		<>
			<AuthLayout>
				<div className="w-full h-[80vh]">
					<h1 className="mb-2 ">Page administrateur</h1>
					<Separator />
					<Tabs defaultValue="overview" className="w-1/8">
						<TabsList className="w-full justify-center bg-background-primary">
							<TabsTrigger value="overview" className="focus:border-white">
								<h1>Vue d&apos;ensemble</h1>
							</TabsTrigger>
							<TabsTrigger value="languages" className="border-white">
								Langages
							</TabsTrigger>
							<TabsTrigger value="projects" className="border-white">
								Projets
							</TabsTrigger>
							<TabsTrigger value="users" className="border-white">
								Utilisateurs
							</TabsTrigger>
							<TabsTrigger value="comments" className="border-white">
								Commentaires
							</TabsTrigger>
						</TabsList>
						<TabsContent value="overview">
							<h1>Vue d&apos;ensemble</h1>
							<div className="grid grid-cols-2 grid-rows-2 gap-3 min-w-full min-h-full max-w-full max-h-full pt-2">
								<Card className="border-gray-200 bg-background-primary text-white p-2">
									<h1>Languages</h1>
								</Card>
								<Card className="border-gray-200 bg-background-primary text-white p-2">
									<h1>Projet</h1>
								</Card>
								<Card className="border-gray-200 bg-background-primary text-white p-2">
									<h1>Utilisateurs</h1>
								</Card>
								<Card className="border-gray-200 bg-background-primary text-white p-2">
									<h1>Commentaires</h1>
								</Card>
							</div>
						</TabsContent>
						<TabsContent value="languages">
							<AdminLanguages />
						</TabsContent>
						<TabsContent value="projects">
							<AdminProjects />
						</TabsContent>
						<TabsContent value="users">
							<AdminUsers />
						</TabsContent>
						<TabsContent value="comments">
							<AdminComments />
						</TabsContent>
					</Tabs>
				</div>
			</AuthLayout>
		</>
	);
};

export default adminDashboard;
