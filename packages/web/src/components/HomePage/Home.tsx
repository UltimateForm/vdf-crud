import React from "react";
import Maps from "./Maps";
import { createPortal } from "react-dom";
import classNames from "classnames";
import DetailsView from "components/common/DetailsView";
import { useDevicesQuery } from "store/api/generated";

export default function Home({}) {
	const [detailsId, setDetailsId] = React.useState("");
	const { data: deviceQueryData } = useDevicesQuery({
		limit: 0,
		skip: 0
	});
	const deviceListData = deviceQueryData?.devices;
	return (
		<div className="p-2 w-full bg-white my-2 card rounded-md grid-flow-row gap-3 h-fit">
			<h1 className="text-2xl font-bold text-right">Home</h1>
			{createPortal(
				<div
					className={classNames(
						"absolute inset-0 bg-black bg-opacity-50 flex transition-opacity ease-in-out",
						Boolean(detailsId)
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none"
					)}
					onClick={() => setDetailsId("")}
				>
					<DetailsView
						onClickClose={() => setDetailsId("")}
						device={deviceListData?.items?.find(
							(device) => device.userId == detailsId
						)}
					/>
				</div>,
				document.body
			)}
			<Maps
				onSelect={(id) => {
					return setDetailsId(id);
				}}
				markers={deviceListData?.items
					?.filter((dev) => dev.latitude && dev.longitude)
					.map((dev) => ({
						latitude: dev.latitude,
						longitude: dev.longitude,
						id: dev.userId,
						name: dev.firstName
					}))}
			/>
		</div>
	);
}
