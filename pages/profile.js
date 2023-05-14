import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import FriendsInfo from "@/components/Friendinfo";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import LoginPage from "./login";
import { useEffect, useState } from "react";
import Banner from "@/components/banner";
export default function Profilepage() {
	const session = useSession();
	const [editMode, setEditMode] = useState(false);
	const router = useRouter();
	const [profile, setProfile] = useState(null);
	const userId = router.query.id;
	const { asPath: pathname } = router;
	const [name, setName] = useState("");
	const [place, setPlace] = useState("");
	const [about, setAbout] = useState("");
	const supabase = useSupabaseClient();
	const isPosts = pathname.includes("posts") || pathname === "/profile";
	const isAbout = pathname.includes("about");
	const isFirends = pathname.includes("friends");
	const isPhotos = pathname.includes("photos");

	const isMyUser = userId === session?.user?.id;
	const activeTabclasses =
		"flex gap-2 px-5 py-1 items-center border-socialYellow border-b-4 bg-yellow-100 bg-opacity-50 rounded-t-md text-yellow-800";
	const Tabclasses = "flex gap-2 px-5 py-1 items-center";
	useEffect(() => {
		if (!userId) {
			return;
		}
		fetchUser();
	}, [userId]);
	if (!session) {
		return <LoginPage />;
	}
	console.log(profile);

	function fetchUser() {
		supabase
			.from("profiles")
			.select()
			.eq("id", userId)
			.then((result) => {
				if (result.error) {
					throw result.error;
				}
				if (result.data) {
					setProfile(result.data[0]);
				}
			});
	}
	function saveProfile() {
		supabase
			.from("profiles")
			.update({
				name,
				place,
				about,
			})
			.eq("id", session.user.id)
			.then((result) => {
				if (!result.error) {
					setProfile((prev) => ({ ...prev, name, place, about }));
				}
				setEditMode(false);
			});
	}

	return (
		<Layout>
			<Card noPadding={true}>
				<div className="relative overflow-hidden rounded-md">
					<Banner
						url={profile?.banner}
						editable={isMyUser}
						onChange={fetchUser}
					/>
					<div className="absolute top-20 left-4 z-20">
						{profile && (
							<Avatar
								url={profile.avatar}
								size={"lg"}
								editable={isMyUser}
								onChange={fetchUser}
							/>
						)}
					</div>

					<div className="p-4 pb-0">
						<div className="ml-40 flex items-center justify-between">
							<div>
								<h1 className=" text-3xl font-bold">
									{!editMode && profile?.name}
									{editMode && (
										<div>
											<input
												className="border rounded-md px-2"
												type="text"
												placeholder="Your name"
												onChange={(ev) =>
													setName(ev.target.value)
												}
												value={name}
											/>
										</div>
									)}
								</h1>
								<div className="text-gray-500 leading-4 mt-3">
									{!editMode && profile?.place}
									{editMode && (
										<div>
											<input
												className="border rounded-md px-2 py-1"
												type="text"
												placeholder="Your place"
												onChange={(ev) =>
													setPlace(ev.target.value)
												}
												value={place}
											/>
										</div>
									)}
								</div>
								<div>
									<h1 className="mt-2 font-bold text-2xl">
										About myself
									</h1>
								</div>
								<div className="text-gray-500 leading-4 mt-5 mb-5">
									{!editMode && profile?.about}
									{editMode && (
										<div>
											<textarea
												className="border rounded-md px-2 py-1 "
												type="text"
												placeholder="Talk about yourself"
												onChange={(ev) =>
													setAbout(ev.target.value)
												}
												value={about}
											/>
										</div>
									)}
								</div>
							</div>
							{isMyUser && !editMode && (
								<div>
									<button
										className="bg-socialYellow p-2 rounded-md font-bold shadow-md shadow-gray-400 flex gap-2 items-center"
										onClick={() => {
											setEditMode(true);
											setName(profile.name);
											setPlace(profile.place);
											setAbout(profile.about);
										}}
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
												d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
											/>
										</svg>
										edit
									</button>
								</div>
							)}
							{isMyUser && editMode && (
								<div>
									<button
										onClick={saveProfile}
										className="bg-socialYellow p-1 rounded-md font-bold shadow-md shadow-gray-400 flex gap-2 items-center"
									>
										Save Changes
									</button>
								</div>
							)}
							{isMyUser && editMode && (
								<button
									onClick={() => setEditMode(false)}
									className="inline-flex mx-1 gap-1 bg-socialYellow rounded-md shadow-sm shadow-gray-500 py-1 px-2"
								>
									Cancel
								</button>
							)}
						</div>
					</div>
				</div>
			</Card>
		</Layout>
	);
}
