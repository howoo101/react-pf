import { memo, useRef } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useYoutubeQuery } from '../../hooks/useYoutuebeQuery';

function BtnRolling() {
	const swiper = useSwiper();
	const btnStart = useRef(null);
	const btnStop = useRef(null);

	return (
		<nav className='controls'>
			<FontAwesomeIcon
				ref={btnStart}
				icon={faPlay}
				onClick={() => {
					btnStart.current.classList.add('on');
					btnStop.current.classList.remove('on');
					swiper.autoplay.start();
				}}
			/>
			<FontAwesomeIcon
				ref={btnStop}
				icon={faPause}
				onClick={() => {
					btnStop.current.classList.add('on');
					btnStop.current.classList.remove('on');
					swiper.autoplay.stop();
				}}
			/>
		</nav>
	);
}

function Vids() {
	const { data: Vids, isSuccess } = useYoutubeQuery();

	return (
		<section id='vids' className='myScroll'>
			<Swiper
				modules={[Autoplay, Pagination]}
				loop={true}
				spaceBetween={50}
				slidesPerView={1}
				breakpoints={{
					1200: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
				centeredSlides={true}
				autoplay={{
					delay: 1000,
					disableOnInteraction: true,
				}}
				pagination={true}
			>
				<BtnRolling />
				{isSuccess &&
					Vids.map((vid, idx) => {
						if (idx >= 5) return null;

						return (
							<SwiperSlide key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</div>
									<h2>
										{vid.snippet.title.length >= 30 ? vid.snippet.title.substr(0, 30) + '...' : vid.snippet.title}
									</h2>
									<p>
										{vid.snippet.description.length >= 100
											? vid.snippet.description.substr(0, 100) + '...'
											: vid.snippet.description}
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</section>
	);
}

export default memo(Vids);
