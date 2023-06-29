function Pics({ scroll, pos }) {
	const currentPos = scroll - pos;
	const base = window.innerHeight / 2;
	const modified = currentPos + base;

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
		</section>
	);
}

export default Pics;
