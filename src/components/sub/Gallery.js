import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';

import { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlickr } from '../../redux/flickrSlice';

function Gallery() {
	const dispatch = useDispatch();

	const openModal = useRef(null);
	const isUser = useRef(true);

	const searchInput = useRef(null);

	const btnSet = useRef(null);

	const enableEvent = useRef(true);
	const frame = useRef(null);
	const Items = useSelector((store) => store.flickr.data);
	const counter = useRef(0);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);
	const firstLoaded = useRef(true);

	const userId = '198477162@N05';

	// const getFlickr = useCallback(async (opt) => {
	// 	let counter = 0;
	// 	const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	// 	const key = '287211516f841c2ab9b7a6101334112c';
	// 	const method_interest = 'flickr.interestingness.getList';
	// 	const method_search = 'flickr.photos.search';
	// 	const method_user = 'flickr.people.getPhotos';

	// 	const num = 50;
	// 	let url = '';

	// 	if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
	// 	if (opt.type === 'search')
	// 		url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
	// 	if (opt.type === 'user')
	// 		url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

	// 	const result = await axios.get(url);
	// 	if (result.data.photos.photo.length === 0) {
	// 		setLoader(false);

	// 		frame.current.classList.add('on');
	// 		const btnMine = btnSet.current.children;
	// 		btnMine[1].classList.add('on');
	// 		getFlickr({ type: 'user', user: userId });
	// 		enableEvent.current = true;

	// 		return alert('이미지 결과값이 없습니다.');
	// 	}
	// 	setItems(result.data.photos.photo);

	// 	const imgs = frame.current.querySelectorAll('img');
	// 	imgs.forEach((img) => {
	// 		img.onload = () => {
	// 			++counter;
	// 			console.log(counter);
	// 			console.log(imgs.length);
	// 			//문제점 - myGallery, interestGallery는 전체 이미지 카운트가 잘 되는데 특정 사용자 갤러리만 갯수가 2씩 모자라는 현상
	// 			if (counter === imgs.length - 2) {
	// 				setLoader(false);
	// 				frame.current.classList.add('on');

	// 				//이슈해결 - 특정 사용자 아이디로 갤러리 출력해서 counter갯수가 2가 부족한 이유는
	// 				//추력될 이미지돔요소중에서 이미 해당사용자의 이미지와 프로필에 이미지소스2개가 캐싱이 완료되었기때문에
	// 				//실제 생성된 imgDOM의 갯수는 20개이지만 2개소스이미지의 캐싱이 완료되었기 때문에 onload이벤트는 18번만 발생

	// 				enableEvent.current = true;
	// 			}
	// 		};
	// 	});
	// }, []);

	useEffect(() => {
		console.log(Items);
		counter.current = 0;
		if (Items.length === 0 && !firstLoaded.current) {
			setLoader(false);
			frame.current.classList.add('on');
			const btnMine = btnSet.current.children;
			btnMine[1].classList.add('on');
			dispatch(fetchFlickr({ type: 'user', user: '164021883@N04' }));
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
	}, [Items, dispatch]);

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);
		dispatch(fetchFlickr({ type: 'search', tags: tag }));
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
		dispatch(fetchFlickr({ type: 'interest' }));
		isUser.current = false;
	};

	const showMine = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		dispatch(fetchFlickr({ type: 'user', user: userId }));
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
						{Items.map((item, idx) => {
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
													dispatch(fetchFlickr({ type: 'user', user: e.target.innerText }));
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
					src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`}
					alt={Items[Index]?.title}
				/>
			</Modal>
		</>
	);
}

export default Gallery;
