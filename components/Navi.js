import Link from "next/link";
import { useRouter } from "next/router";
import Card from "./Card";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
export default function Navibar() {
	const router = useRouter();
	const { asPath: pathname } = router;
	const activeElementClasses =
		"flex gap-4 py-3 bg-socialYellow -mx-10 px-10 rounded-md shadow-sm shadow-gray-300";
	const nonactiveElementClasses =
		"flex gap-4 py-3 my-2 hover:bg-yellow-400 hover:bg-opacity-20 -mx-5 px-5 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300";

	const supabase = useSupabaseClient();
	async function logout() {
		await supabase.auth.signOut();
	}
	return (
		<Card>
			<div className="px-4 pt-2 ">
				<h2 className="text-gray-400 font-bold mb-3">Navigation</h2>
				<Link
					href="/"
					className={
						pathname === "/"
							? activeElementClasses
							: nonactiveElementClasses
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
						/>
					</svg>
					Home
				</Link>
				
				<Link
					href="/saved"
					className={
						pathname === "/saved"
							? activeElementClasses
							: nonactiveElementClasses
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
						/>
					</svg>
					Saved Posts
				</Link>

				<button onClick={logout} className="w-full">
					<span className={nonactiveElementClasses}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
							/>
						</svg>
						Log out
					</span>
				</button>
			</div>
		</Card>
	);
}
