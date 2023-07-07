import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';
import { useRef } from 'react';

function Header({ type }) {
	const toggleMenu = useRef(null);

	const active = 'on';
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

				<FontAwesomeIcon
					icon={faBars}
					onClick={() => {
						toggleMenu.current.toggle();
					}}
				/>
			</header>
			<Menu ref={toggleMenu} />
		</>
	);
}

export default Header;
