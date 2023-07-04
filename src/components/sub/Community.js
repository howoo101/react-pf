import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);

	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPost = () => {
		const inputValue = input.current.value.trim();
		const textareaValue = textarea.current.value.trim();
		if (!inputValue || !textareaValue) {
			alert('제목과 본문을 입력하세요');
			return;
		}
		setPosts([{ title: inputValue, content: textareaValue }, ...Posts]);
		resetForm();
	};

	useEffect(() => {
		console.log(Posts);
	}, [Posts]);
	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input ref={input} type='text' placeholder='제목을 입력하세요' />
				<textarea ref={textarea} name='' placeholder='본문을 입력해주세요' id='' cols='30' rows='10'></textarea>
				<button>reset</button>
				<button onClick={createPost}>submit</button>
			</div>
		</Layout>
	);
}
// localStorage : 브라우저가 가지고 있는 경량의 데이터베이스 (문자열 저장)
export default Community;
