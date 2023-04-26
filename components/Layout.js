import Navibar from "@/components/Navi";
import PostForm from "@/components/PostForm";
import Post from "@/components/Post";
export default function Layout({ children, hideNavigation }) {
	return (
		<div className="flex mt-4 max-w-6xl mx-auto gap-9">
			{!hideNavigation && (
				<div className="w-1/3">
					<Navibar />
				</div>
			)}

			<div className={hideNavigation ? "w-full" : "w-2/3"}>
				{children}
			</div>
		</div>
	);
}
