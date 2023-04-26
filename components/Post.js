import Avatar from "./Avatar";
import Card from "./Card";
import ClickOutHandler from "react-clickout-handler";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import { UserContext } from "@/contexts/Usercontent";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Post({
	id,
	content,
	created_at,
	photos,
	profiles: authorProfile,
}) {
	useEffect(() => {
		fetchComments();
	});
	async function addPhotos(ev) {
		const files = ev.target.files;
		if (files.length > 0) {
			setIsUploading(true);
			for (const file of files) {
				const newName = Date.now() + file.name;
				const result = await supabase.storage
					.from("photos")
					.upload(newName, file);
				if (result.data) {
					const url =
						process.env.NEXT_PUBLIC_SUPABASE_URL +
						"/storage/v1/object/public/photos/" +
						result.data.path;
					setUploads((prevUploads) => [...prevUploads, url]);
				} else {
					console.log(result);
				}
			}
			setIsUploading(false);
		}
	}

	function fetchComments() {
		supabase
			.from("posts")
			.select("*, profiles(*)")
			.eq("parent", id)
			.then((result) => setComments(result.data));
	}
	const [comments, setComments] = useState([]);
	const { profile: myprofile } = useContext(UserContext);
	const nonactiveElement =
		"flex gap-4 py-2  w-full my-2 hover:bg-yellow-400 -mx-3 px-3 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300";
	const [dropdownOpen, setdropdownOpen] = useState(false);
	const supabase = useSupabaseClient();
	const { profile: myProfile } = useContext(UserContext);
	const [commentcontent, Setcommentcontent] = useState("");
	const [uploads, setUploads] = useState([]);
	const [isUploading, setIsUploading] = useState(false);

	function postComment(ev) {
		ev.preventDefault();
		supabase
			.from("posts")
			.insert({
				content: commentcontent,
				author: myProfile.id,
				parent: id,
				photos: uploads,
			})
			.then((result) => {
				console.log(result);
				fetchComments();
				Setcommentcontent("");
				setUploads([]);
			});
	}

	return (
		<Card>
			<div className="flex gap-3 relative">
				<div>
					<Link href={"/profile/" + authorProfile?.id}>
						<span className="cursor-pointer ">
							<Avatar url={authorProfile?.avatar} />
						</span>
					</Link>
				</div>
				<div className="grow">
					<p>
						<Link href={"/profile/" + authorProfile?.id}>
							<span className="mr-1 font-semibold cursor-pointer hover:underline">
								{authorProfile?.name}
							</span>
						</Link>
						shared a post
					</p>
					<p className="text-gray-500 text-sm">
						<ReactTimeAgo date={created_at} />
					</p>
				</div>

				<div>
					<button
						className=" absolute top-0 right-0"
						onClick={() => setdropdownOpen(!dropdownOpen)}
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
								d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
							/>
						</svg>
						<ClickOutHandler onClickOut={() => {}}>
							<div className="relative z-50">
								{dropdownOpen && (
									<div className="absolute right-0 bg-socialYellow p-2 w-52 rounded-md ">
										<button href="" className={"w-full"}>
											<span className={nonactiveElement}>
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
												save post
											</span>
										</button>

										<a href="" className={nonactiveElement}>
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
													d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
												/>
											</svg>
											Notifications
										</a>
										<a href="" className={nonactiveElement}>
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
													d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
												/>
											</svg>
											Hide post
										</a>
										<a href="" className={nonactiveElement}>
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
													d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
												/>
											</svg>
											Delete
										</a>
										<a href="" className={nonactiveElement}>
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
													d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
												/>
											</svg>
											Report
										</a>
									</div>
								)}
							</div>
						</ClickOutHandler>
					</button>
				</div>
			</div>
			<div>
				<p className="my-2 text-sm ">{content}</p>

				{photos?.length > 0 && (
					<div>
						{photos.map((photo) => (
							<div className="m-4">
								<img src={photo} className="rounded-md" />
							</div>
						))}
					</div>
				)}

				<div className="mt-4 flex gap-5 items-center">
					<div>
						<button className="flex gap-2 items-center ">
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
									d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
								/>
							</svg>
							{comments?.length}
						</button>
					</div>
				</div>
			</div>
			<div className=" flex gap-3 mt-4">
				<div>
					<Avatar url={myprofile?.avatar} />
				</div>
				<div className="border grow rounded-full relative">
					<form onSubmit={postComment}>
						<input
							className=" block w-full rounded-full p-3 h-13 "
							placeholder="You have the Answer? Great tell everyone"
							value={commentcontent}
							onChange={(ev) =>
								Setcommentcontent(ev.target.value)
							}
						/>
					</form>
				</div>
			</div>
			<div>
				{comments?.length > 0 &&
					comments.map((comment) => (
						<div
							key={comment.id}
							className="mt-2 flex gap-2 items-center"
						>
							<Avatar url={comment.profiles.avatar} />
							<div className="bg-gray-200 py-2 px-4 rounded-3xl">
								<div>
									<Link
										href={"/profile/" + comment.profiles.id}
									>
										<span className="hover:underline font-semibold mr-1">
											{comment.profiles.name}
										</span>
									</Link>
									<span className="text-sm text-gray-400">
										<ReactTimeAgo
											timeStyle={"twitter"}
											date={new Date(
												comment.created_at
											).getTime()}
										/>
									</span>
								</div>
								<p className="text-sm">{comment.content}</p>
							</div>
						</div>
					))}
			</div>
		</Card>
	);
}
