import { useSelector } from 'react-redux';

function Pics({ scroll, pos }) {
	const currentPos = scroll - pos;
	const base = window.innerHeight / 2;
	const modified = currentPos + base;
	const flickr = useSelector((store) => store.flickr.data);
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
				{flickr.map((pic, idx) => {
					if (idx >= 4) return null;

					return (
						<li key={pic.id}>
							<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default Pics;
