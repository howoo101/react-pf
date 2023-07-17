import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Vids() {
	const Vids = useSelector((store) => store.youtube.data);
	return (
		<section id='vids' className='myScroll'>
			<Swiper>
				{Vids.map((vid, idx) => {
					if (idx >= 5) return null;

					return (
						<SwiperSlide key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</section>
	);
}

export default memo(Vids);
