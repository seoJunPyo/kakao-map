import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useMap } from '../hook/useMap';
import { PlaceType } from './mapType';

interface SearchLoctionProps {
	onUpdatePlaces: (places: PlaceType[]) => void;
	onSelect: (placeID: string) => void;
}

const SearchLoction = (props: SearchLoctionProps) => {
	const map = useMap();
	const [keyward, setKeyward] = useState('');
	const [places, setPlaces] = useState<PlaceType[]>([]);
	const placeService = useRef<kakao.maps.services.Places | null>(null);

	useEffect(() => {
		if (placeService.current) {
			return;
		}
		placeService.current = new kakao.maps.services.Places();
	}, []);

	const searchPlaces = (keyward: string) => {
		if (!keyward.replace(/^\s+|\s+$/g, '')) {
			alert('키워드를 입력해주세요!');
			return false;
		}

		placeService.current?.keywordSearch(keyward, (data, status) => {
			if (status === window.kakao.maps.services.Status.OK) {
				const placeInfos = data.map((placeSearchReulst) => {
					return {
						id: placeSearchReulst.id,
						position: new window.kakao.maps.LatLng(
							Number(placeSearchReulst.y),
							Number(placeSearchReulst.x)
						),
						title: placeSearchReulst.place_name,
						address: placeSearchReulst.address_name,
					};
				});
				props.onUpdatePlaces(placeInfos);
				setPlaces(placeInfos);
			} else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
				alert('검색 결과가 존재하지 않습니다.');
				return;
			} else if (status === window.kakao.maps.services.Status.ERROR) {
				alert('검색 결과 중 오류가 발생했습니다.');
				return;
			}
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		searchPlaces(keyward);
	};

	const handleItemClick = (place: PlaceType) => {
		map.setCenter(place.position);
		map.setLevel(4);
		props.onSelect(place.id);
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Input
					value={keyward}
					onChange={(e) => {
						setKeyward(e.target.value);
					}}
				/>
			</Form>
			<List>
				{places.map((item, idx) => (
					<Item key={item.id} onClick={() => handleItemClick(item)}>
						<label>
							{idx + 1}. {item.title}
						</label>
						<span>{item.address}</span>
					</Item>
				))}
			</List>
		</Container>
	);
};

const Container = styled.div`
	position: absolute;
	top: 0;
	z-index: 1;
	min-width: 250px;
	max-width: 300px;
	height: 100%;
	background-color: #fff;
	opacity: 0.8;
	overflow-y: auto;
`;

const Form = styled.form`
	display: flex;
	position: sticky;
	top: 0;
`;

const Input = styled.input`
	width: 100%;
	padding: 8px;
	border: 1px solid #c0c0c0;
	outline: none;
`;

const List = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const Item = styled.li`
	display: flex;
	flex-direction: column;
	padding: 8px;
	border-bottom: 1px dashed #d2d2d2;
	text-overflow: ellipsis;
	white-space: nowrap;
	cursor: pointer;

	&:hover {
		background-color: #d2d2d2;
		opacity: 1;
		transition: background-color 0.1s;
	}
`;

export default SearchLoction;
