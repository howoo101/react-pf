import Layout from '../common/Layout';
import { useState, useRef } from 'react';

import Modal from '../common/Modal';
import { useYoutubeQuery } from '../../hooks/useYoutuebeQuery';
function Youtube() {
	const modal = useRef(null);
	const { data: Videoes, isSuccess } = useYoutubeQuery();
	const [idx, setIdx] = useState(0);

	return (
		<>
			<Layout name={'Youtube'}>
				{isSuccess &&
					Videoes?.map((video, idx) => {
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
				{isSuccess && Videoes.length > 0 && (
					<iframe
						title={isSuccess && Videoes[idx].id}
						src={`https://www.youtube.com/embed/${isSuccess && Videoes[idx].snippet.resourceId.videoId}`}
						frameborder='0'
					></iframe>
				)}
			</Modal>
		</>
	);
}

export default Youtube;
