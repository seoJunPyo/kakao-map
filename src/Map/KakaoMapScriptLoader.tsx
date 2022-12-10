import React, { ReactNode, useEffect, useState, useRef } from 'react';
import SearchLoction from './SearchLoction';
import styled from '@emotion/styled';

const KAKAO_MAP_SCRIPT_ID = 'kakao-map-script';
const KAKAKO_MAP_APP_KEY = process.env.REACT_APP_KAKAKO_MAP_APP_KEY;

interface PropsChild {
	children: ReactNode;
}

const KakaoMapScriptLoader = (props: PropsChild) => {
	const [mapScriptLoaded, setMapScriptLoaded] = useState(true);

	useEffect(() => {
		const mapScript = document.getElementById(KAKAO_MAP_SCRIPT_ID);

		if (mapScript && !window.kakao) {
			return;
		}

		const script = document.createElement('script');
		script.id = KAKAO_MAP_SCRIPT_ID;
		script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAKO_MAP_APP_KEY}&libraries=services,drawing&autoload=false`;
		script.onload = () => {
			window.kakao.maps.load(() => {
				setMapScriptLoaded(true);
			});
		};
		script.onerror = () => {
			setMapScriptLoaded(false);
		};

		document.getElementById('root')?.appendChild(script);
	}, []);

	return <>{mapScriptLoaded ? props.children : <div>Loading...</div>}</>;
};

export default KakaoMapScriptLoader;
