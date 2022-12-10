import React, { useEffect } from 'react';
import { useMap } from '../hook/useMap';
import { PlaceType } from './mapType';
import MapMarker from './MapMarker';

interface MapMarkerControllerProps {
	places: PlaceType[];
	selectedPlaceId?: string;
}

const MapMarkerController = (props: MapMarkerControllerProps) => {
	const map = useMap();

	useEffect(() => {
		if (props.places.length < 1) {
			return;
		}

		const bounds = new window.kakao.maps.LatLngBounds();
		props.places.forEach((place) => {
			bounds.extend(place.position);
		});

		map.setBounds(bounds);
	}, [props.places]);

	return (
		<>
			{props.places.map((place, idx) => (
				<MapMarker
					key={place.id}
					places={place}
					showInfo={props.selectedPlaceId === place.id}
					idx={idx}
				/>
			))}
		</>
	);
};

export default MapMarkerController;
