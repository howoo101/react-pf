import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Youtube() {
	async function fetchData() {
		const apiKey = 'AIzaSyBm1-5iAqRnlxETXyLSvDYAaSnMKGrr8fY';
		const playlistId = 'PLtyGCdgf6inmUrDz2XNQJq37nfcZFOJ_M';
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;
		const data = await axios.get(url);
		console.log(data);
		const json = await data.data.items;
		setVideoes(json);
	}

	const [Videoes, setVideoes] = useState([]);
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Layout name={'Youtube'}>
			{Videoes.map((video, idx) => {
				const data = video.snippet;
				const thumbnailUrl = data.thumbnails.standard.url;
				const title =
					data.title.length > 50 ? data.title.substr(0, 50) + '...' : data.title;
				const description =
					data.description.length > 200
						? data.description.substr(0, 200) + '...'
						: data.description;

				return (
					<article key={idx}>
						<img src={thumbnailUrl}></img>
						<h2>{title}</h2>
						<p>{description}</p>
						<span>{data.publishedAt.split('T')[0]}</span>
					</article>
				);
			})}
		</Layout>
	);
}

export default Youtube;
