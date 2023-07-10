import { memo, useState } from 'react';
import LocalStorage from '../common/LocalStorage';

function News() {
	const storage = new LocalStorage();
	const getLocalData = storage.getLocalData;

	const [Posts] = useState(getLocalData());

	return (
		<section id='news' className='myScroll'>
			{Posts &&
				Posts.map((post, idx) => {
					if (idx >= 4) return null;
					return (
						<article key={idx}>
							<h3>{post.title}</h3>
							<p>{post.content}</p>
						</article>
					);
				})}
		</section>
	);
}

export default memo(News);
