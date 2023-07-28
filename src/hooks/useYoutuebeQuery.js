import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchYoutube = async () => {
	const apiKey = 'AIzaSyBm1-5iAqRnlxETXyLSvDYAaSnMKGrr8fY';
	const playlistId = 'PLtyGCdgf6inmUrDz2XNQJq37nfcZFOJ_M';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=${num}`;

	const response = await axios.get(url);
	return response.data.items;
};

export const useYoutubeQuery = () => {
	return useQuery(['youtubeData'], fetchYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 5,
		staleTime: 1000 * 5,
	});
};
