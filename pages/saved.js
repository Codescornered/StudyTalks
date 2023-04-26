import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import LoginPage from "./login";
import { UserContextProvider } from "@/contexts/Usercontent";
import { useEffect, useState } from "react";
export default function SavedPostsPage() {
	const [posts, setPosts] = useState([]);
	const supabase = useSupabaseClient();
	const session = useSession();

	if (!session) {
		return <LoginPage />;
	}
	return (
		<Layout>
			<UserContextProvider>
				<Card>
					<h1 className="text-xl font-bold text-gray-600">
						Your saved posts
					</h1>
				</Card>
			</UserContextProvider>
		</Layout>
	);
}
