import React, { forwardRef, useImperativeHandle, useState } from 'react';

const Menu = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	useImperativeHandle(ref, () => {
		return { toggle: () => setOpen(!Open) };
	});
	return (
		<>
			{Open && (
				<nav id='mobilePanel'>
					<h1>LOGO</h1>
				</nav>
			)}
		</>
	);
});

export default Menu;
