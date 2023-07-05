import Layout from '../common/Layout';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import { useState, useEffect } from 'react';

function Gallery() {
	const getFlickr = async (opt) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '287211516f841c2ab9b7a6101334112c';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';
		const userId = '198477162@N05';
		const num = 20;
		let url = '';
		if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search') url = `${baseURL}${method_search}&tags=${opt.value}`;
		if (opt.type === 'user') url = `${baseURL}${method_user}&user_id=${userId}`;

		const result = await axios.get(url);
		console.log(result);
		setItems(result.data.photos.photo);
	};

	const [Items, setItems] = useState([]);

	useEffect(() => getFlickr({ type: 'interest' }), []);

	return (
		<Layout name={'Gallery'}>
			<div className='frame'>
				<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
					{Items.map((item, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img
											src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
											alt={item.title}
										/>
									</div>
									<h2>{item.title}</h2>
									<div class='profile'>
										<img
											src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
											alt={item.title}
										/>
										<span>{item.owner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}

export default Gallery;
