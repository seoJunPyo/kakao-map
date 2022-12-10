import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import KakaoMapScriptLoader from './Map/KakaoMapScriptLoader';
import DynamicMap from './Map/DynamicMap';
import SearchLoction from './Map/SearchLoction';
import MapMarkerController from './Map/MapMarkerController';
import { PlaceType } from './Map/mapType';

function App() {
	const [places, setPlaces] = useState<PlaceType[]>([]);
	const [selectedPlaceId, setSelectedPlaceId] = useState('');

	return (
		<KakaoMapScriptLoader>
			<DynamicMap>
				<MapMarkerController
					places={places}
					selectedPlaceId={selectedPlaceId}
				/>
				<SearchLoction
					onUpdatePlaces={(places) => {
						setPlaces(places);
					}}
					onSelect={(placeId) => {
						setSelectedPlaceId(placeId);
					}}></SearchLoction>
			</DynamicMap>
		</KakaoMapScriptLoader>
	);
}

export default App;
