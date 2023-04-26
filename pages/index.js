import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm";
import Post from "@/components/Post";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import LoginPage from "./login";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/Usercontent";
import { StreamChat } from "stream-chat";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	// setting variables
	const session = useSession();
	const supabase = useSupabaseClient();
	const [posts, setPosts] = useState([]);
	const [profile, setProfile] = useState(null);
	const [client, setClient] = useState();
	console.log(client);
	useEffect(() => {
		if (!session?.user?.id) {
			return;
		}
		supabase
			.from("profiles")
			.select()
			.eq("id", session.user.id)
			.then((result) => {
				if (result.data.length) {
					setProfile(result.data[0]);
				}
			});
	}, [session?.user?.id]);
	useEffect(() => {
		fetchPosts();
	}, []);
	function fetchPosts() {
		supabase
			.from("posts")
			.select(
				"id, content, created_at,photos, profiles(id, avatar, name)"
			)
			.is("parent", null)
			.order("created_at", { ascending: false })
			.then((result) => {
				console.log("posts", result);
				setPosts(result.data);
			});
	}
	//session check and rejection
	if (!session) {
		return <LoginPage />;
	}

	// Layout for Homepage
	return (
		<div>
			<Layout>
				<UserContext.Provider value={{ profile: profile }}>
					<PostForm onPost={fetchPosts} />
					{posts?.length > 0 &&
						posts.map((post) => <Post {...post} />)}
				</UserContext.Provider>
			</Layout>
		</div>
	);
}
