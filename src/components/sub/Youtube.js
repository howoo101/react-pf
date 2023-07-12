import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Modal from '../common/Modal';
import { setYoutube } from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';

function Youtube() {
	const Videoes = useSelector((store) => store.youtubeReducer.youtube);
	const dispatch = useDispatch();
	const FetchYoutube = async () => {
		const apiKey = 'AIzaSyBm1-5iAqRnlxETXyLSvDYAaSnMKGrr8fY';
		const playlistId = 'PLtyGCdgf6inmUrDz2XNQJq37nfcZFOJ_M';
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;
		const data = await axios.get(url);
		// console.log(data);
		const json = await data.data.items;

		dispatch(setYoutube(json));
	};
	const modal = useRef(null);
	// const [Videoes, setVideoes] = useState([]);
	const [idx, setIdx] = useState(0);
	useEffect(() => {
		FetchYoutube();
	}, []);

	return (
		<>
			<Layout name={'Youtube'}>
				{Videoes.map((video, idx) => {
					const data = video.snippet;
					const thumbnailUrl = data.thumbnails.standard.url;
					const title = data.title.length > 50 ? data.title.substr(0, 50) + '...' : data.title;
					const description =
						data.description.length > 200 ? data.description.substr(0, 200) + '...' : data.description;

					return (
						<article key={idx}>
							<h2>{title}</h2>
							<div className='txt'>
								<p>{description}</p>
								<span>{data.publishedAt.split('T')[0]}</span>
							</div>
							<div
								className='pic'
								onClick={() => {
									modal.current.open();
									setIdx(idx);
								}}
							>
								<img src={thumbnailUrl} alt={thumbnailUrl} />
							</div>
						</article>
					);
				})}
			</Layout>

			<Modal ref={modal}>
				{Videoes.length > 0 && (
					<iframe
						title={Videoes[idx].id}
						src={`https://www.youtube.com/embed/${Videoes[idx].snippet.resourceId.videoId}`}
						frameborder='0'
					></iframe>
				)}
			</Modal>
		</>
	);
}

export default Youtube;
