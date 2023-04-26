import Avatar from "./Avatar";

export default function FriendsInfo() {
	return (
		<div className="flex gap-3">
			<Avatar />
			<div>
				<h3 className="font-bold text-xl">Jane bro</h3>
				<div className="text-sm leading-3">5 mutal firends</div>
			</div>
		</div>
	);
}
