import { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	useEffect(() => {
		Open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [Open]);

	return (
		//주의점 : AnimatePresence 사용시 내부 컴포넌트에 연결되어 있는 ref값을 제거
		//React 17버전에서는 framer-motion을 6버전대로 설치
		//컴포넌트 언마운트시 모션효과가 끝날때까지 언마운트를 자동 지연시켜줌
		<AnimatePresence>
			{Open && (
				// 모션은 걸고 싶은 컴포넌트에 motion.지정 initial(모션시작), animate(모션완료), exit(사라지는 모션) 속성 지정
				//x(가로축), y(세로축), rotate(회전), scale(확대축소)
				<motion.aside
					className='modal'
					initial={{ opacity: 0, x: '100%' }}
					animate={{ opacity: 1, x: '0%', transition: { duration: 0.5 } }}
					exit={{ opacity: 0, scale: 0, transition: { duration: 0.5, delay: 0.5 } }}
				>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.5 } }}
						exit={{ opacity: 0, transition: { delay: 0 } }}
					>
						{props.children}
					</motion.div>
					<motion.span
						className='close'
						onClick={() => setOpen(false)}
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
						exit={{ opacity: 0, x: -100, transition: { duration: 0.5, delay: 0 } }}
					>
						close
					</motion.span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Modal;
