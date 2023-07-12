import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';
import Modal from '../common/Modal';

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
	const openModal = useRef(null);
	const isUser = useRef(true);
	const searchInput = useRef(null);
	const btnSet = useRef(null);
	const enableEvent = useRef(true);
	const frame = useRef(null);
	const [Items, setItems] = useState([]);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);
	const [Mounted, setMounted] = useState(true);

	const userId = '198477162@N05';

	const getFlickr = useCallback(
		async (opt) => {
			let counter = 0;
			const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
			const key = '287211516f841c2ab9b7a6101334112c';
			const method_interest = 'flickr.interestingness.getList';
			const method_user = 'flickr.people.getPhotos';
			const method_search = 'flickr.photos.search';
			const num = 40;
			let url = '';

			if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
			if (opt.type === 'search')
				url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
			if (opt.type === 'user')
				url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

			const result = await axios.get(url);

			if (result.data.photos.photo.length === 0) {
				setLoader(false);
				frame.current.classList.add('on');
				const btnMine = btnSet.current.children;
				btnMine[1].classList.add('on');
				getFlickr({ type: 'user', user: userId });
				enableEvent.current = true;

				return alert('이미지 결과값이 없습니다.');
			}

			//외부 API로 부터 데이터 fetching시간이 오래 걸리는 경우
			//컴포넌트가 unMounted시 해당 Mouted값을 false로 변경처리
			//Mounted값이 true일때에만 fetching된 데이터를 state에 담음
			//데이터 fetching전 컴포넌트가 언마운트되면 State에 값을 담지 않으므로 불필요한 메모리 누수가 발생하지 않음
			Mounted && setItems(result.data.photos.photo);

			const imgs = frame.current?.querySelectorAll('img');

			imgs &&
				imgs.forEach((img) => {
					img.onload = () => {
						++counter;

						//검색결과물에서 특정 사용자를 클릭하면 다시 결과값이 하나 적게 리턴되는 문제 (해결필요)
						//이슈해결 - 특정 사용자 아이디로 갤러리 출력해서 counter갯수가 2가 부족한 이유는
						//추력될 이미지돔요소중에서 이미 해당사용자의 이미지와 프로필에 이미지소스2개가 캐싱이 완료되었기때문에
						//실제 생성된 imgDOM의 갯수는 20개이지만 2개소스이미지의 캐싱이 완료되었기 때문에 onload이벤트는 18번만 발생
						if (counter === imgs.length - 2) {
							setLoader(false);
							frame.current.classList.add('on');
							enableEvent.current = true;
						}
					};
				});
		},
		[Mounted]
	);

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
		getFlickr({ type: 'interest' });
		isUser.current = false;
	};

	const showMine = (e) => {
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		resetGallery(e);
		getFlickr({ type: 'user', user: userId });
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
						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												openModal.current?.open();
												setIndex(idx);
												console.log(openModal);
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
