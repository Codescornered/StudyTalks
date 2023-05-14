import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
export default function LoginPage() {
	const supabase = useSupabaseClient();
	async function loginWithGoogle() {
		await supabase.auth.signInWithOAuth({
			provider: "google",
		});
	}
	async function loginWithDiscord() {
		await supabase.auth.signInWithOAuth({
			provider: "discord",
		});
	}
	async function loginWithTwitch() {
		await supabase.auth.signInWithOAuth({
			provider: "twitch",
		});
	}
	return (
		<Layout hideNavigation={true}>
			<div className="h-screen flex items-center">
				<div className="max-w-xs mx-auto grow -mt-24">
					<h1 className="text-gray-200 text-6xl mb-4 text-center">
						Login{""}
					</h1>
					<Card noPadding={true}>
						<button
							onClick={loginWithGoogle}
							className=" w-full flex gap-3 items-center justify-center p-4 border-b border-b-gray-200 hover:bg-socialYellow hover:text-white hover:border-none hover:scale-110 transition-all hover:rounded-md"
						>
							<svg
								className="h-8 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 488 512"
							>
								<path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
							</svg>
							Login with google
						</button>
						<button
							onClick={loginWithDiscord}
							className="w-full flex gap-3 items-center justify-center p-4 border-b border-b-gray-200 hover:bg-socialYellow hover:text-white hover:border-none hover:scale-110 transition-all hover:rounded-md"
						>
							<svg
								className="h-8 fill-content"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
							</svg>
							Login with Discord
						</button>
						<button
							onClick={loginWithTwitch}
							className="w-full flex gap-3 items-center justify-center p-4 border-b border-b-gray-200 hover:bg-socialYellow hover:text-white hover:border-none hover:scale-110 transition-all hover:rounded-md"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 fill-content"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z" />
								<path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z" />
							</svg>
							Login with Twitch
						</button>
					</Card>
				</div>
			</div>
		</Layout>
	);
}
