import { useEffect, useRef } from 'react';
import Layout from '../common/Layout';

function Contact() {
	const container = useRef(null);
	const { kakao } = window;

	const option = {
		// api 사용할때 못찾는다고할때 비구조할당으로 window를 할당해라
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	useEffect(() => {
		// 인스턴스 호출 구문은 마운트시 호출
		const map = new kakao.maps.Map(container.current, option);
		var marker = new kakao.maps.Marker({
			position: option.center,
		});

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);
	}, []);

	return (
		<Layout name={'Contact'}>
			<div ref={container} id='map'></div>
		</Layout>
	);
}

export default Contact;
