import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';

import { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';


import { useFlickrQuery } from '../../hooks/useFlickrQuery';

/*
	라우터로 컴포넌트를 빠르게 이동시 메모리 누수(memory leak) 오류가 발생하는 이유
	- fetching되는 데이타가 많아서 state에 해당 값을 담는데 시간이 오래 걸리는 경우
	- 아직 state에 값이 다 담기지 않았는데 컴포넌트 이동을 해서 해당 컴포넌트가 언마운트되면 
	- state에 값 담기는 동작이 중단되야됨에도 불구하고 계속 동작되고 있으므로 메모리 누수가 발생하면서 오류 출력

	해결방법
	- 특정 State를 해당 컴포넌트에 만들어서 그 state값이 true일때에만 data fetching후 state에 값을 담기게 만들고
	- 해당 컴포넌트가 언마운트시 state값을 false로 변경
*/


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
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		resetGallery(e);


		//새로운 데이터로 갤러리 생성 함수 호출
		setopt({ type: 'user', user: userId });

	};

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);
		getFlickr({ type: 'search', tags: tag });
		searchInput.current.value = '';
		isUser.current = false;
	};

	useEffect(() => {
		getFlickr({ type: 'user', user: userId });

		return () => {
			//컴포넌트 언마운트시 Mounted값을 false로 변경해서 state에 값이 담기는걸 방지
			setMounted(false);
		};
	}, [getFlickr]);

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
