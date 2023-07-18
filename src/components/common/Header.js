import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { toggle } from '../../redux/menuSlice';

function Header({ type }) {
	const active = 'on';
	const dispatch = useDispatch();

	return (
		<>
			<header className={type}>
				<h1>
					<Link to='/'>LOGO</Link>
				</h1>

				<ul id='gnb'>
					<li>
						<NavLink to='/department' activeClassName={active}>
							Department
						</NavLink>
					</li>
					<li>
						<NavLink to='/community' activeClassName={active}>
							Community
						</NavLink>
					</li>
					<li>
						<NavLink to='/gallery' activeClassName={active}>
							Gallery
						</NavLink>
					</li>
					<li>
						<NavLink to='/youtube' activeClassName={active}>
							Youtube
						</NavLink>
					</li>
					<li>
						<NavLink to='/contact' activeClassName={active}>
							Contact
						</NavLink>
					</li>
					<li>
						<NavLink to='/member' activeClassName={active}>
							Member
						</NavLink>
					</li>
				</ul>

				<FontAwesomeIcon icon={faBars} onClick={() => dispatch(toggle())} />
			</header>
		</>
	);
}

export default memo(Header);
