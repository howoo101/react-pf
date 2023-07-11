import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Department() {
	const [Members, setMembers] = useState([]);
	const members = useSelector((store) => store.memberReducer.members);
	useEffect(() => {
		console.log('Mount 완료');

		// axios.get(`${process.env.PUBLIC_URL + '/DB/members.json'}`).then((json) => {
		// console.log(json.data.members);
		setMembers(members);
		// });
	}, [members]);

	return (
		<Layout name={'Department'}>
			{Members.map((member, idx) => {
				return (
					<article key={idx}>
						<div className='pic'>
							<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
							<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
						</div>
						<h2>{member.name}</h2>
						<p>{member.position}</p>
					</article>
				);
			})}
		</Layout>
	);
}

export default Department;
