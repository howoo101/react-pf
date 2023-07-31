import { motion, AnimatePresence } from 'framer-motion';

import { Link, NavLink } from 'react-router-dom';

import { useEffect } from 'react';
import { useGlobalData } from '../../hooks/useGlobalContext';
function Menu() {
	const active = { color: 'aqua' };

	const { menuOpen, setMenuOpen } = useGlobalData();

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1200);
		});
	}, []);

	return (
		<>
			<AnimatePresence>
				{menuOpen && (
					<motion.nav
						id='mobilePanel'
						initial={{ opacity: 0, x: -280 }}
						animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
						exit={{ opacity: 0, x: -280, transition: { duration: 0.5 } }}
						onClick={() => setMenuOpen(false)}
					>
						<h1>
							<Link to='/'>LOGO</Link>
						</h1>

						<ul id='gnbMo'>
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
									Members
								</NavLink>
							</li>
						</ul>
					</motion.nav>
				)}
			</AnimatePresence>
		</>
	);
}

export default Menu;
