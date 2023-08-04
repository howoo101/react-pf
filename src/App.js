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

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRef } from 'react';

function App() {
	const queryClient = new QueryClient();
	const menu = useRef(null);
	const dispatch = useDispatch();

	const fetchMembers = useCallback(async () => {
		const members = (await axios.get(`${process.env.PUBLIC_URL + '/DB/members.json'}`)).data.members;

		dispatch(setMembers(members));
	}, [dispatch]);

	const fetchYoutube = useCallback(async () => {
		const apiKey = 'AIzaSyBm1-5iAqRnlxETXyLSvDYAaSnMKGrr8fY';
		const playlistId = 'PLtyGCdgf6inmUrDz2XNQJq37nfcZFOJ_M';
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;
		const data = await axios.get(url);
		// console.log(data);
		const json = await data.data.items;

		dispatch(setYoutube(json));
	}, [dispatch]);

	useEffect(() => {
		console.log('youtube fetching 완료');
		fetchYoutube();
		console.log('department json fetching 완료');
		fetchMembers();
	}, [fetchYoutube, fetchMembers]);

	return (
		<QueryClientProvider client={queryClient}>
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
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
