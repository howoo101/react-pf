import { Link, NavLink } from 'react-router-dom';

function Header() {
	return (
		<header>
			<h1>
				<Link to='/'>LOGO</Link>
			</h1>

			<ul id='gnb'>
				<li>
					<NavLink to='/department'>Department</NavLink>
				</li>
				<li>
					<NavLink to='/community'>Community</NavLink>
				</li>
				<li>
					<NavLink to='/gallery'>Gallery</NavLink>
				</li>
				<li>
					<NavLink to='/youtube'>Youtube</NavLink>
				</li>
				<li>
					<NavLink to='/contact'>Contact</NavLink>
				</li>
				<li>
					<NavLink to='/member'>Member</NavLink>
				</li>
			</ul>
		</header>
	);
}

export default Header;
