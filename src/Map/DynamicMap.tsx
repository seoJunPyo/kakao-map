import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { kakoMapCotext } from '../hook/useMap';

interface DynamicMapProps {
	children: ReactNode;
}

const DynamicMap = (props: DynamicMapProps) => {
	const [map, setMap] = useState<kakao.maps.Map>();
	const kakaoMapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!kakaoMapRef.current) {
			return;
		}
		setMap(
			new window.kakao.maps.Map(kakaoMapRef.current, {
				center: new kakao.maps.LatLng(33.450701, 126.570667),
				level: 3,
			})
		);
	}, []);

	return (
		<Container>
			<Map ref={kakaoMapRef} />
			{map ? (
				<kakoMapCotext.Provider value={map}>
					{props.children}
				</kakoMapCotext.Provider>
			) : (
				<div>지도 정보를 가져오는데 실패하였습니다.</div>
			)}
		</Container>
	);
};

const Container = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
`;

const Map = styled.div`
	position: static;
	width: 100%;
	height: 100%;
`;

export default DynamicMap;
