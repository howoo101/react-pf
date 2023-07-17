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
import { useDispatch } from 'react-redux';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchDepartment } from './redux/departmentSlice';
import { fetchFlickr } from './redux/flickrSlice';

function App() {
	const menu = useRef(null);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchDepartment());
		dispatch(fetchFlickr({ type: 'user', user: '198477162@N05' }));
	}, [dispatch]);

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
