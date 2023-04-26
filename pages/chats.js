import Card from "@/components/Card";
import FlashCardForm from "@/components/FlashCardForm";
import Layout from "@/components/Layout";
import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "./login";

export default function Chats() {
	const session = useSession();

	if (!session) {
		return <LoginPage />;
	}
	console.log(session);
	return (
		<div>
			<Layout>
				<FlashCardForm />
			</Layout>
		</div>
	);
}
