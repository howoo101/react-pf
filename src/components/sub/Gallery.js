import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';

import { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';

import { useFlickrQuery } from '../../hooks/useFlickrQuery';

function Gallery() {
	const [opt, setopt] = useState({ type: 'user', user: '198477162@N05' });
	const { data: Items, isSuccess } = useFlickrQuery(opt);

	const openModal = useRef(null);
	const isUser = useRef(true);

	const searchInput = useRef(null);

	const btnSet = useRef(null);

	const enableEvent = useRef(true);
	const frame = useRef(null);
	const counter = useRef(0);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);
	const firstLoaded = useRef(true);

	const userId = '198477162@N05';

	useEffect(() => {
		console.log(Items);
		counter.current = 0;
		if (isSuccess && Items.length === 0 && !firstLoaded.current) {
			setLoader(false);
			frame.current.classList.add('on');
			const btnMine = btnSet.current.children;
			btnMine[1].classList.add('on');
			setopt({ type: 'user', user: userId });
			enableEvent.current = true;
			return alert('이미지 결과값이 없습니다.');
		}
		firstLoaded.current = false;
		const imgs = frame.current.querySelectorAll('img');
		imgs.forEach((img) => {
			img.onload = () => {
				++counter.current;

				if (counter.current === imgs.length - 2) {
					setLoader(false);
					frame.current.classList.add('on');
					enableEvent.current = true;
				}
			};
		});
	}, [Items, isSuccess]);

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);
		setopt({ type: 'search', tags: tag });
		searchInput.current.value = '';
		isUser.current = false;
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

	const showInterest = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		setopt({ type: 'interest' });
		isUser.current = false;
	};

	const showMine = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		setopt({ type: 'user', user: userId });
	};

	return (
		<>
			<Layout name={'Gallery'}>
				<div className='btnSet' ref={btnSet}>
					<button onClick={showInterest}>Interest Gallery</button>

					<button className='on' onClick={showMine}>
						My Gallery
					</button>
				</div>

				<div className='searchBox'>
					<input
						type='text'
						placeholder='검색어를 입력하세요.'
						ref={searchInput}
						onKeyPress={(e) => e.key === 'Enter' && showSearch(e)}
					/>
					<button onClick={showSearch}>Seach</button>
				</div>

				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
						{isSuccess &&
							Items.map((item, idx) => {
								return (
									<article key={idx}>
										<div className='inner'>
											<div
												className='pic'
												onClick={() => {
													openModal.current.open();
													setIndex(idx);
												}}
											>
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
														if (isUser.current) return;
														isUser.current = true;
														setLoader(true);
														frame.current.classList.remove('on');
														setopt({ type: 'user', user: e.target.innerText });
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
			<Modal ref={openModal}>
				<img
					src={`https://live.staticflickr.com/${isSuccess && Items[Index]?.server}/${isSuccess && Items[Index]?.id}_${
						isSuccess && Items[Index]?.secret
					}_b.jpg`}
					alt={isSuccess && Items[Index]?.title}
				/>
			</Modal>
		</>
	);
}

export default Gallery;
