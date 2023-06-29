function Pics({ scroll, pos }) {
	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateX(${scroll - pos}px)` }}>FLICKR</h1>
		</section>
	);
}

export default Pics;
