import Layout from '../common/Layout';

import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/action';

function Department() {
	// const [Members, setMembers] = useState([]);
	const members = useSelector((store) => store.memberReducer.members);
	const dispatch = useDispatch();

	return (
		<Layout name={'Department'}>
			<button
				onClick={() => {
					const newMembers = [...members];
					newMembers[0].name = 'Emma';
					dispatch(setMembers(newMembers));
				}}
			>
				멤버 데이터 변경
			</button>
			{members.map((member, idx) => {
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
