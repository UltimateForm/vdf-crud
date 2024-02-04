import {
	faAdd,
	faAngleDown,
	faAngleLeft,
	faAngleRight,
	faDownload,
	faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ICursor } from "types";

interface ITableMenuProps extends Omit<ICursor<any>, "items"> {
	sizes: number[];
	setSize: (size: number) => void;
	navigate: (delta: -1 | 1) => void;
	onClickAdd: React.DOMAttributes<HTMLButtonElement>["onClick"];
}

export default function TableMenu(props: ITableMenuProps) {
	const { sizes, setSize, totalCount, skip, limit, navigate, onClickAdd } =
		props;

	const [pageCount, pageIndex] = React.useMemo(() => {
		// todo: fix double run
		const pageCountValue = limit == 0 ? 1 : Math.ceil(totalCount / limit);
		const pageIndexValue =
			skip == 0 ? 1 : (skip / totalCount) * (totalCount / limit) + 1;
		return [pageCountValue, pageIndexValue];
	}, [totalCount, limit, skip]);

	return (
		<div
			className="grid grid-flow-col justify-between sticky top-0 bg-white"
			data-testid="tableMenu"
		>
			<button className="btn btn-neutral h-11 w-fit" onClick={onClickAdd}>
				<FontAwesomeIcon icon={faAdd} />
				Add
			</button>
			<div className="grid grid-flow-col items-center gap-3 w-fit">
				Showing
				<div className="dropdown relative">
					<div
						tabIndex={0}
						role="button"
						className="btn border-gray-500 border rounded-md h-10 min-h-3 m-0"
					>
						{limit}
						<FontAwesomeIcon icon={faAngleDown} />
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
						data-testid="pageSizeSelector"
					>
						{sizes.map((size) => (
							<li key={size}>
								<a onClick={() => setSize(size)}>{size}</a>
							</li>
						))}
					</ul>
				</div>
				rows of {totalCount}
				<div className="grid grid-flow-col gap-1">
					<button onClick={() => navigate(-1)}>
						<FontAwesomeIcon icon={faAngleLeft} />
					</button>
					<span data-testid="pageDescriptor">
						{pageIndex} of {pageCount}
					</span>
					<button onClick={() => navigate(1)}>
						<FontAwesomeIcon icon={faAngleRight} />
					</button>
				</div>
				<button>
					<FontAwesomeIcon icon={faDownload} />
				</button>
				<button>
					<FontAwesomeIcon icon={faPencil} />
				</button>
			</div>
		</div>
	);
}
