import React from "react";
import TableMenu from "./TableMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IDevice } from "types";
import { createPortal } from "react-dom";
import CreationForm from "./CreationForm";
import classNames from "classnames";
import DetailsView from "../common/DetailsView";
import { useCreateDeviceMutation, useDevicesQuery } from "store/api/enhanced";

const PAGE_SIZES = [5, 10, 15, 25];
const TABLE_HEAD = [
	"User Id",
	"First Name",
	"Last Name",
	"Description",
	"Last Connection",
	"Parent Org",
	"Role",
	"Type",
	"Phone Number"
];

function DeviceRow(props: {
	item: IDevice;
	onSelect: (userId: string) => void;
}) {
	const { item, onSelect } = props;
	return (
		<tr
			className="*:p-2 cursor-pointer text-left"
			onClick={() => onSelect(item.userId)}
		>
			<td>{item.userId}</td>
			<td>{item.firstName}</td>
			<td>{item.lastName}</td>
			<td>{item.description}</td>
			<td>{new Date(item.lastConnection).toDateString()}</td>
			<td>{item.parentOrg}</td>
			<td>{item.role}</td>
			<td>{item.type}</td>
			<td>{item.phoneNumber}</td>
		</tr>
	);
}
export default function Devices() {
	const [pageSize, setPageSize] = React.useState(10);
	const [itemSkip, setItemSkip] = React.useState(0);
	const [creationFormOpen, setCreationFormOpen] = React.useState(false);
	const [detailsId, setDetailsId] = React.useState("");
	const {
		data: devicesQueryData,
		isError,
		isFetching,
		refetch
	} = useDevicesQuery({
		limit: pageSize,
		skip: itemSkip
	});
	const [createDevice, createdDeviceResponse] = useCreateDeviceMutation();
	const deviceListData = devicesQueryData?.devices;
	const navigate = React.useCallback(
		(delta: -1 | 1) => {
			if (delta == 1 && itemSkip + pageSize >= deviceListData.totalCount)
				return;
			if (delta == -1 && itemSkip - pageSize < 0) return;
			setItemSkip((curr) => curr + pageSize * delta);
		},
		[deviceListData, pageSize, itemSkip]
	);
	// replace this with cache invalidation
	const submitDevice = React.useCallback(
		async (values: IDevice) => {
			if (!values) return;
			console.log("HER my devices", values);
			createDevice({
				...values
			});
			setCreationFormOpen(false);
		},
		[pageSize, itemSkip]
	);
	return (
		<div className="p-2 w-full bg-white my-2 card rounded-md grid-flow-row gap-3 relative">
			<h1 className="text-2xl font-bold text-right">Devices</h1>
			{(isFetching || createdDeviceResponse.isLoading) && (
				<div className="absolute inset-0 bg-black z-10 bg-opacity-45 flex">
					<FontAwesomeIcon
						icon={faSpinner}
						className="fa-spin m-auto"
						size="2xl"
						color="#ffffff"
					/>
				</div>
			)}
			{/* todo: create modal component instead */}
			{createPortal(
				<div
					className={classNames(
						"absolute inset-0 bg-black bg-opacity-50 flex transition-opacity ease-in-out",
						creationFormOpen
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none"
					)}
					onClick={() => setCreationFormOpen(false)}
				>
					<CreationForm
						onClickClose={() => setCreationFormOpen(false)}
						onSubmit={submitDevice}
					/>
				</div>,
				document.body
			)}
			{createPortal(
				<div
					className={classNames(
						"absolute inset-0 bg-black bg-opacity-50 flex transition-opacity ease-in-out",
						detailsId
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none"
					)}
					onClick={() => setDetailsId("")}
				>
					<DetailsView
						onClickClose={() => setDetailsId("")}
						device={deviceListData?.items.find(
							(device) => device.userId == detailsId
						)}
					/>
				</div>,
				document.body
			)}
			<TableMenu
				limit={deviceListData?.limit ?? 0}
				count={deviceListData?.totalCount ?? 0}
				skip={deviceListData?.skip ?? 0}
				totalCount={deviceListData?.totalCount ?? 0}
				setSize={(size) => {
					setItemSkip(0);
					setPageSize(size);
				}}
				sizes={PAGE_SIZES}
				navigate={navigate}
				onClickAdd={() => setCreationFormOpen(true)}
			/>
			<table>
				<tr className="bg-gray-200 text-left border-b border-gray-800 sticky top-14">
					{TABLE_HEAD.map((head) => (
						<th key={head} className="p-2 text-xs">
							{head}
						</th>
					))}
				</tr>
				{deviceListData?.items?.map((device) => (
					<DeviceRow
						key={device.userId}
						item={device}
						onSelect={(userId) => setDetailsId(userId)}
					/>
				))}
			</table>
		</div>
	);
}
