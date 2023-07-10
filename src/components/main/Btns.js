import { memo, useCallback, useEffect, useRef, useState } from 'react';
import Anime from '../../asset/anime';
function Btns({ setScroll, setPos }) {
	const btnRef = useRef(null);

	const pos = useRef([]);
	const [num, setNum] = useState(0);
	//myScroll공통 클래스가 있는 섹션을 모두 찾아서 해당 요소의 세로 위치값을 참조객체에 배열로 담아주는 함수
	const getPos = useCallback(() => {
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		setNum(pos.current.length);
		setPos(pos.current);
	}, [setPos]);

	const activation = useCallback(() => {
		const base = -window.innerHeight / 2;
		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		const boxes = btnRef.current.parentElement.querySelectorAll('.myScroll');

		setScroll(scroll);

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const box of boxes) box.classList.remove('on');
				btns[idx].classList.add('on');
				boxes[idx].classList.add('on');
			}
		});
	}, [setScroll]);

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		//리액트는 SPA이기 때문에 페이지가 변경된다고 하더라도 스크롤 위치값이 초기화 되지 않으므로 마운트시마다 스크롤값을 초기화함
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		};
	}, [getPos, activation]);

	return (
		<ul className='btnNavi' ref={btnRef}>
			{Array(num)
				.fill()
				.map((_, idx) => {
					let defaultClass = '';
					if (idx === 0) defaultClass = 'on';
					return (
						<li
							key={idx}
							className={defaultClass}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: 500,
								});
							}}
						></li>
					);
				})}
		</ul>
	);
}
export default memo(Btns);
