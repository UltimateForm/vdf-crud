import React from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface IMarkerElement {
	element: HTMLElement;
	id: string;
	lat: number;
	lng: number;
}

interface IMarkerProps {
	lat: number;
	lng: number;
	id: string;
	name: string;
	setRef: (el: IMarkerElement) => void;
	onSelect: (id: string) => void;
}

// source: https://bobbyhadz.com/blog/javascript-check-if-two-elements-overlap
function elementsOverlap(el1: HTMLElement, el2: HTMLElement) {
	const domRect1 = el1.getBoundingClientRect();
	const domRect2 = el2.getBoundingClientRect();

	return !(
		domRect1.top > domRect2.bottom ||
		domRect1.right < domRect2.left ||
		domRect1.bottom < domRect2.top ||
		domRect1.left > domRect2.right
	);
}

function Marker(props: IMarkerProps) {
	const { name, onSelect, id, setRef, lat, lng } = props;
	return (
		<div
			className="cursor-pointer font-bold relative min-w-1 h-1"
			onClick={() => onSelect(id)}
			ref={(el) => setRef({ element: el, id, lat, lng })}
		>
			<div
				className="absolute w-full h-full content-center grid"
				style={{ bottom: "600%", right: "300%" }}
			>
				{name}
				<FontAwesomeIcon icon={faLocationDot} color="red" size="3x" />
			</div>
		</div>
	);
}

interface IMapProps {
	// todo: use IMarkerProps
	markers: {
		latitude: number;
		longitude: number;
		id: string;
		name: string;
	}[];
	onSelect: (id: string) => void;
}
// place in config file
const APIKEY = "";
export default function Maps(props: IMapProps) {
	const { markers, onSelect } = props;
	const defaultProps = {
		center: {
			lat: 10.99835602,
			lng: 77.01502627,
		},
		zoom: 11,
	};
	const markerRefs = React.useRef<IMarkerElement[]>([]);
	return (
		<div style={{ height: "60vh", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: APIKEY }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
				center={{ lat: 38.7028462, lng: -9.1232281 }}
			>
				{markers?.map((m) => (
					<Marker
						key={m.id}
						lat={m.latitude}
						lng={m.longitude}
						id={m.id}
						name={m.name}
						onSelect={onSelect}
						setRef={(markerEl) =>
							!markerRefs.current.some((mr) => mr.id == markerEl.id) &&
							markerEl != null &&
							markerRefs.current.push(markerEl)
						}
					/>
				))}
			</GoogleMapReact>
		</div>
	);
}
