import Layout from '../common/Layout';
import { useRef, useEffect, useState, useMemo } from 'react';

import emailjs from '@emailjs/browser';

function Contact() {
	const container = useRef(null);
	// 실시간 교통정보
	const [Traffic, setTraffic] = useState(false);
	// 위치정보
	const [Location, setLocation] = useState(null);
	//  위치정보별 버튼클릭시 해당 위치 순번
	const [Index, setIndex] = useState(0);

	//아래 정보값들은 useEffect구문에서 인스턴스 생성할때만 필요한 정보값에 불과하므로 미리 읽히도록 useEffect바깥에 배치
	const { kakao } = window;
	const info = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	]);

	const marker = useMemo(() => {
		return new kakao.maps.Marker({
			position: info.current[Index].latlng,
			image: new kakao.maps.MarkerImage(
				info.current[Index].imgSrc,
				info.current[Index].imgSize,
				info.current[Index].imgPos
			),
		});
	}, [Index, kakao]);

	// email JS
	const form = useRef(null);
	const [success, setSuccess] = useState(false);
	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm('service_khzbkyc', 'template_n0q6tsv', form.current, 'VlnCDrxNCOxiUosTZ').then(
			(result) => {
				console.log(result.text);
				setSuccess(true);
			},
			(error) => {
				console.log(error.text);
				setSuccess(false);
			}
		);
	};
	// email JS

	useEffect(() => {
		// 지도 인스턴스 중첩문제 해결
		container.current.innerHTML = '';

		const mapInstance = new kakao.maps.Map(container.current, { center: info.current[Index].latlng, level: 3 });
		marker.setMap(mapInstance);

		//지도인스턴스에 타입, 줌 컨트롤 추가
		mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);

		setLocation(mapInstance);
		//지도영역에 휠 기능 비활성화

		mapInstance.setZoomable(false);
		const setCenter = () => {
			mapInstance.setCenter(info.current[Index].latlng);
		};
		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index, kakao, marker]);

	useEffect(() => {
		Traffic
			? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, Location, kakao]);

	return (
		<Layout name={'Contact'}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic ON' : 'Traffic OFF'}</button>

			{/* 배열정보값을 토대로 동적으로 li지점버튼 생성하고 해당 버튼 클릭할때 순서값 State를 변경하면서 지도화면이 갱신되도록 수정 */}
			<ul className='branch'>
				{info.current.map((el, idx) => {
					return (
						<li key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
							{el.title}
						</li>
					);
				})}
			</ul>
			<div id='contact'>
				<form ref={form} onSubmit={sendEmail}>
					<label>Name</label>
					<input type='text' name='user_name' />
					<label>Email</label>
					<input type='email' name='user_email' />
					<label>Message</label>
					<textarea name='message' />
					<input type='submit' value='Send' />
				</form>
				{success && <p>이메일이 성공적으로 전송되었습니다.</p>}
			</div>
		</Layout>
	);
}

export default Contact;
