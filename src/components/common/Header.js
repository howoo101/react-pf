import { Link, NavLink } from 'react-router-dom';

function Header() {
	const active = { color: 'aqua' };
	return (
		<header>
			<h1>
				<Link to='/'>LOGO</Link>
			</h1>

			<ul id='gnb'>
				<li>
					<NavLink to='/department' activeStyle={active}>
						Department
					</NavLink>
				</li>
				<li>
					<NavLink to='/community' activeStyle={active}>
						Community
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeStyle={active}>
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeStyle={active}>
						Youtube
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeStyle={active}>
						Contact
					</NavLink>
				</li>
				<li>
					<NavLink to='/member' activeStyle={active}>
						Member
					</NavLink>
				</li>
			</ul>
		</header>
	);
}

export default Header;
