import { useFlickrQuery } from '../../hooks/useFlickrQuery';

function Pics({ scroll, pos }) {
	const currentPos = scroll - pos;
	const base = window.innerHeight / 2;
	const modified = currentPos + base;
	const { data: flickr, isSuccess } = useFlickrQuery({ type: 'user', user: '198477162@N05' });
	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateX(${currentPos}px)` }}>FLICKR</h1>

			<article
				style={{
					transform: `translate(-50%, -50%) rotate(${scroll >= pos - base ? modified : 0}deg) scale(${
						scroll >= pos - base ? 1 + modified / 500 : 1
					}) `,
					opacity: `${scroll >= pos - base ? 1 - modified / 500 : 1}`,
				}}
			></article>
			<ul>
				{isSuccess &&
					flickr.map((pic, idx) => {
						if (idx >= 4) return null;

						return (
							<li key={pic.id}>
								<img
									src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
									alt={pic.title}
								/>
							</li>
						);
					})}
			</ul>
		</section>
	);
}

export default Pics;
