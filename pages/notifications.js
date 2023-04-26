import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "./login";
export default function Notifications() {
	const session = useSession();

	if (!session) {
		return <LoginPage />;
	}
	console.log(session);
	return (
		<Layout>
			<h1 className="text-6xl font-bold text-white p-5">
				{" "}
				Notifications for you
			</h1>
			<div className="-mx-4">
				<Card>
					<div className="flex gap-4 items-center">
						<Link href={"/profile"}>
							<Avatar />
						</Link>
						<div>
							<p className="text-md font-bold">
								<Link
									href="/profile"
									className="hover:underline"
								>
									John Doe{" "}
								</Link>
								liked ur photo
							</p>
						</div>
						<div className="grow text-right">
							<a href="">
								<button
									className="bg-socialYellow px-6 py-1 rounded-md"
									href={""}
								>
									Go to
								</button>
							</a>
						</div>
					</div>
				</Card>
				<Card>
					<div className="flex gap-4 items-center">
						<Link href={"/profile"}>
							<Avatar />
						</Link>
						<div>
							<p className="text-md font-bold">
								<Link
									href="/profile"
									className="hover:underline"
								>
									John Doe{" "}
								</Link>
								liked ur photo
							</p>
						</div>
						<div className="grow text-right">
							<a href="">
								<button className="bg-socialYellow px-6 py-1 rounded-md">
									Go to
								</button>
							</a>
						</div>
					</div>
				</Card>
				<Card>
					<div className="flex gap-4 items-center">
						<Link href={"/profile"}>
							<Avatar />
						</Link>
						<div>
							<p className="text-md font-bold">
								<Link
									href="/profile"
									className="hover:underline"
								>
									{" "}
									John Doe{" "}
								</Link>
								liked ur photo
							</p>
						</div>
						<div className="grow text-right">
							<a href="">
								<button className="bg-socialYellow px-6 py-1 rounded-md">
									Go to
								</button>
							</a>
						</div>
					</div>
				</Card>
			</div>
		</Layout>
	);
}
