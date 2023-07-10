import React, { useState } from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Banner from './Banner';
import Btns from './Btns';

function Main({ menu }) {
	const [scroll, setScroll] = useState(0);
	const [pos, setPos] = useState([]);

	return (
		<main>
			<Header type={'main'} menu={menu} />
			<Visual />
			<News />
			<Pics scroll={scroll} pos={pos[2]} />
			<Vids />
			<Banner />
			<Btns setScroll={setScroll} setPos={setPos} />
		</main>
	);
}

export default Main;
