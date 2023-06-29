import React, { useState } from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Banner from './Banner';
import Btns from './Btns';

function Main() {
	const [scroll, setScrolled] = useState(0);
	return (
		<main>
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics scroll={scroll} />
			<Vids />
			<Banner />
			<Btns setScrolled={setScrolled} />
		</main>
	);
}

export default Main;
