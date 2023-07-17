import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Vids() {
	const Vids = useSelector((store) => store.youtube.data);
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
				{Vids.map((vid, idx) => {
					if (idx >= 5) return null;

					return (
						<SwiperSlide key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
								</div>
								<h2>{vid.snippet.title.length >= 30 ? vid.snippet.title.substr(0, 30) + '...' : vid.snippet.title}</h2>
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
