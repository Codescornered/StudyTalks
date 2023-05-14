import { UserContext } from "@/contexts/Usercontent";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { use, useContext, useEffect, useState } from "react";
import Avatar from "./Avatar";
import Card from "./Card";
import Preloader from "./preloader";
import Link from "next/link";

export default function PostFormCard({ onPost }) {
	const { profile } = useContext(UserContext);
	const [content, setContent] = useState();
	const supabase = useSupabaseClient();
	const session = useSession();
	const [uploads, setUploads] = useState([]);
	const [isUploading, setIsUploading] = useState(false);

	function createPost() {
		supabase
			.from("posts")
			.insert({
				author: session.user.id,
				content,
				photos: uploads,
			})
			.then((response) => {
				if (!response.error) {
					setContent("");
					setUploads([]);
					console.log("## POST  CREATION HAS COMPLETED##");
					if (onPost) {
						onPost();
					}
				}
			});
	}
	// /https://jvmtcojfgsvnrvspasvh.supabase.co/storage/v1/object/public/photos/16802703802862560x1080.jpg
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

	return (
		<Card>
			<div className="flex gap-3 ">
				<div>
					<Link href={"/profile/" + profile?.id}>
						<span className="cursor-pointer ">
							<Avatar url={profile?.avatar} />
						</span>
					</Link>
				</div>
				{profile && (
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="grow p-3 h-14 "
						placeholder={`Write a question, ${profile?.name}`}
					/>
				)}
			</div>

			{isUploading && (
				<div>
					<Preloader />
				</div>
			)}
			{uploads.length > 0 && (
				<div className="flex gap-2">
					{uploads.map((upload) => (
						<img
							key={upload.id}
							src={upload}
							alt=""
							className="w-auto h-24 rounded-md"
						/>
					))}
				</div>
			)}
			<div className="flex gap-3 items-center mt-2">
				<div>
					<label className="flex gap-2">
						<input
							type="file"
							className="hidden"
							multiple
							onChange={addPhotos}
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
							/>
						</svg>
						Photos
					</label>
				</div>
				<div className="grow text-right">
					<button
						onClick={createPost}
						className="bg-socialYellow px-6 py-1 rounded-md"
					>
						share
					</button>
				</div>
			</div>
		</Card>
	);
}
