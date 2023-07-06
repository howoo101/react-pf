import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function Gallery() {
	const btnSet = useRef(null);

	const enableEvent = useRef(true);
	const frame = useRef(null);
	const [Items, setItems] = useState([]);
	const [Loader, setLoader] = useState(true);
	const userId = '198477162@N05';

	const getFlickr = async (opt) => {
		let counter = 0;
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '287211516f841c2ab9b7a6101334112c';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';

		const num = 500;
		let url = '';

		if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search')
			url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user')
			url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

		console.log(url);
		const result = await axios.get(url);
		console.log(result);
		setItems(result.data.photos.photo);

		const imgs = frame.current.querySelectorAll('img');
		imgs.forEach((img) => {
			img.onload = () => {
				++counter;
				console.log(counter);

				//임시방편 - 전체 이미지 갯수가 하나 모잘라도 출력되게 수정
				//문제점 - myGallery, interestGallery는 전체 이미지 카운트가 잘 되는데 특정 사용자 갤러리만 갯수가 1씩 모자라는 현상
				if (counter === imgs.length - 1) {
					setLoader(false);
					frame.current.classList.add('on');

					//모션중 재이벤트 방지시 모션이 끝날때까지 이벤트를 방지를 시켜도
					//모션이 끝나는순간에도 이벤트가 많이 발생하면 특정값이 바뀌는 순간보다 이벤트가 더 빨리들어가서 오류가 발생가능
					//해결방법 - 물리적으로 이벤트 호출을 지연시켜서 마지막에 발생한 이벤트만 동작처리 (debouncing)
					//단시간에 많이 발생하는 이벤트시 함수 호출을 줄이는 방법
					//debouncing: 이벤트 발생시 바로 호출하는게 아닌 일정시간 텀을 두고 마지막에 발생한 이벤트만 호출
					//throttling: 이벤트 발생시 호출되는 함수자체를 setTimeout으로 적게 호출
					enableEvent.current = true;
				}
			};
		});
	};

	//기존 갤러리 초기화 함수
	const resetGallery = (e) => {
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((el) => el.classList.remove('on'));
		e.target.classList.add('on');
		enableEvent.current = false;
		setLoader(true);
		frame.current.classList.remove('on');
	};

	useEffect(() => getFlickr({ type: 'user', user: userId }), []);

	return (
		<Layout name={'Gallery'}>
			<div className='btnSet' ref={btnSet}>
				<button
					onClick={(e) => {
						//재이벤트, 모션중 재이벤트 방지
						if (!enableEvent.current) return;
						if (e.target.classList.contains('on')) return;

						//기존 갤러리 초기화 함수 호출
						resetGallery(e);

						//새로운 데이터로 갤러리 생성 함수 호출
						getFlickr({ type: 'interest' });
					}}
				>
					Interest Gallery
				</button>

				<button
					className='on'
					onClick={(e) => {
						//재이벤트, 모션중 재이벤트 방지
						if (!enableEvent.current) return;
						if (e.target.classList.contains('on')) return;

						//기존 갤러리 초기화 함수 호출
						resetGallery(e);

						//새로운 데이터로 갤러리 생성 함수 호출
						getFlickr({ type: 'user', user: '164021883@N04' });
					}}
				>
					My Gallery
				</button>
			</div>
			<div className='frame' ref={frame}>
				<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
					{Items.map((item, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img
											src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
											alt={item.title}
										/>
									</div>
									<h2>{item.title}</h2>
									<div className='profile'>
										<img
											src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
											alt={item.owner}
											onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
										/>
										<span
											onClick={(e) => {
												setLoader(true);
												frame.current.classList.remove('on');
												getFlickr({ type: 'user', user: e.target.innerText });
											}}
										>
											{item.owner}
										</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
			{Loader && <img className='loader' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loader' />}
		</Layout>
	);
}

export default Gallery;
