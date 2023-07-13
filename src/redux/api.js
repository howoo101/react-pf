import axios from 'axios';

//외부 비동기 데이터 호출 함수를 외부 파일로 따로 관리
export const fetchYoutube = async () => {
	const apiKey = 'AIzaSyBm1-5iAqRnlxETXyLSvDYAaSnMKGrr8fY';
	const playlistId = 'PLtyGCdgf6inmUrDz2XNQJq37nfcZFOJ_M';
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;
	const data = await axios.get(url);
	// console.log(data);
	return await data.data.items;
};

/*
  순수 함수 (Pure function)
  - 부수효과를 발생시키지 않는 순수 자바스크립트로만 동작 가능한 함수
  - 동일한 인수를 넣었을때 동일한 값을 반환하는 함수
  - 컴포넌트외부에서 독립적으로 동작하는 함수이므로 내부에 dom제어나 react hook사용 불가
  부수 효과 (Side Effect)
  - 기존의 변경점을 직접적으로 야기시키는 효과
  - 컴포넌트 외부에서 사용할수 없는 기능
*/
