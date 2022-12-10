import { createContext, useCallback, useContext } from 'react';

export const kakoMapCotext = createContext<kakao.maps.Map | null>(null);

export const useMap = () => {
	const kakaoMap = useContext(kakoMapCotext);

	if (!kakaoMap) {
		throw new Error('kakaoMap not found');
	}

	return kakaoMap;
};
