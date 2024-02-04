import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IDevice } from "types";

interface IListItemProps {
	title: string;
	value: string | number;
}

function ListItem(props: IListItemProps) {
	const { title, value } = props;
	return (
		<li className="min-w-72 grid-cols-2 border-t last:border-b grid grid-flow-col">
			<span>{title}</span>
			<span>{value}</span>
		</li>
	);
}

interface IDetailsViewProps {
	onClickClose: React.DOMAttributes<HTMLButtonElement>["onClick"];
	device?: IDevice;
}

export default function DetailsView(props: IDetailsViewProps) {
	const { onClickClose, device } = props;
	if (!device) return null;
	return (
		<div
			className="card bg-white rounded-md flex w-fit m-auto p-12 relative space-y-4"
			onClick={(ev) => ev.stopPropagation()}
		>
			<button
				className="btn btn-circle btn-ghost absolute left-1 top-1"
				onClick={onClickClose}
			>
				<FontAwesomeIcon icon={faAngleLeft} />
			</button>
			<h4 className="text-xl font-bold">Details</h4>
			<ul>
				<ListItem title="First Name" value={device.firstName} />
				<ListItem title="Last Name" value={device.lastName} />
				<ListItem title="Latitude" value={device.latitude} />
				<ListItem title="Longitude" value={device.longitude} />
				<ListItem title="Description" value={device.description} />
				<ListItem
					title="Last Connection"
					value={new Date(device.lastConnection).toDateString()}
				/>
				<ListItem title="Parent Org" value={device.parentOrg} />
				<ListItem title="Role" value={device.role} />
				<ListItem title="Type" value={device.type} />
				<ListItem title="Phone Number" value={device.phoneNumber} />
			</ul>
		</div>
	);
}
