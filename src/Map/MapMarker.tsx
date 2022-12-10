import styled from '@emotion/styled';
import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useMap } from '../hook/useMap';
import { PlaceType } from './mapType';

interface MapMarkProps {
	places: PlaceType;
	idx: number;
	showInfo?: boolean;
}

const MARKER_IMAGE_URL =
	'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
const MapMarker = (props: MapMarkProps) => {
	const map = useMap();
	const container = useRef(document.createElement('div'));

	const infoWindow = useMemo(() => {
		container.current.style.position = 'absolute';
		container.current.style.bottom = '40px';

		return new kakao.maps.CustomOverlay({
			position: props.places.position,
			content: container.current,
		});
	}, []);

	const marker = useMemo(() => {
		const imageSize = new kakao.maps.Size(36, 37);
		const imgOptions = {
			spriteSize: new kakao.maps.Size(36, 691),
			spriteOrigin: new kakao.maps.Point(0, props.idx * 46 + 10),
			offset: new kakao.maps.Point(13, 37),
		};
		const markerImage = new kakao.maps.MarkerImage(
			MARKER_IMAGE_URL,
			imageSize,
			imgOptions
		);
		const marker = new kakao.maps.Marker({
			position: props.places.position,
			image: markerImage,
		});

		kakao.maps.event.addListener(marker, 'click', () => {
			map.setCenter(props.places.position);
			map.setLevel(4, {
				animate: true,
			});
			infoWindow.setMap(map);
		});

		return marker;
	}, []);

	useLayoutEffect(() => {
		marker.setMap(map);
		return () => {
			marker.setMap(null);
		};
	}, [map]);

	useEffect(() => {
		if (props.showInfo) {
			infoWindow.setMap(map);
			console.log(props.places.title);
			return;
		}

		return () => {
			infoWindow.setMap(null);
		};
	});

	return container.current
		? ReactDOM.createPortal(
				<Message
					onClick={() => {
						infoWindow.setMap(null);
					}}>
					<Title>{props.places.title}</Title>
					<Address>{props.places.address}</Address>
				</Message>,
				container.current
		  )
		: null;
};

const Message = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 180px;
	min-height: 50px;
	padding: 4px;
	margin-left: -90px;
	border-radius: 16px;
	background-color: rgba(255, 228, 196, 0.8);
`;

const Title = styled.label`
	font-weight: bold;
	padding: 6px 8px;
`;

const Address = styled.span`
	font-size: 12px;
	padding: 0 6px 6px;
`;

export default MapMarker;
