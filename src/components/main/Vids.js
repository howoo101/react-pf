import { memo } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
function Vids() {
	const vids = useSelector((store) => store.youtubeReducer.youtube);
	return (
		<section id='vids' className='myScroll'>
			{vids.map((vid, idx) => {
				if (idx >= 4) return null;
				return <img key={vid.id} src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.title} />;
			})}
		</section>
	);
}

export default memo(Vids);
