import { useRef } from 'react';

export const EventBlocker = (func) => {
	const EventBlock = useRef(null);

	return () => {
		if (EventBlock.current) return;
		EventBlock.current = setTimeout(() => {
			func();
			EventBlock.current = null;
		}, 300);
	};
};
