import { Route, Switch } from 'react-router-dom';

//common
import Footer from './components/common/Footer';
import Header from './components/common/Header';

//main
import Menu from './components/common/Menu';
//sub
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';
import Main from './components/main/Main';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setYoutube } from './redux/action';

function App() {
	const menu = useRef(null);
	const dispatch = useDispatch();

	const fetchYoutube = async () => {
		const apiKey = 'AIzaSyBm1-5iAqRnlxETXyLSvDYAaSnMKGrr8fY';
		const playlistId = 'PLtyGCdgf6inmUrDz2XNQJq37nfcZFOJ_M';
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;
		const data = await axios.get(url);
		// console.log(data);
		const json = await data.data.items;

		dispatch(setYoutube(json));
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/' render={() => <Main menu={menu} />} />
				<Route path='/' render={() => <Header type={'sub'} menu={menu} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/member' component={Member} />
			<Footer />
			<Menu ref={menu} />
		</>
	);
}

export default App;
