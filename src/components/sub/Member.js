import { useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Member() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: false,
		hobbys: false,
	};

	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const [Submit, setSubmit] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleRadio = (e) => {
		const { name, checked } = e.target;
		setVal({ ...Val, [name]: checked });
	};

	const handleCheckbox = (e) => {
		const { name } = e.target;
		const isChecked = [...e.target.parentElement.querySelectorAll('input')].some((el) => el.checked);
		setVal({ ...Val, [name]: isChecked });
	};

	useEffect(() => {
		const len = Object.keys(Err).length;
		if (len === 0 && Submit) {
			alert('모든 인증을 통과했습니다.');
		}
	}, [Err]);

	const formSubmit = (e) => {
		e.preventDefault();
		console.log(`현재 상태값 : ${Val}`);
		// check가 빈환하는 메시지가 있으면 해당 메시지를 화면에 출력하고 전송 중지
		console.log(check(Val));
		setErr(check(Val));
		setSubmit(true);
	};

	const check = (value) => {
		//인수로 현재 State값을 전달받아서 항목별로 에러메세지를 객체로 반환하는 함수
		//반환되는 에러메세지가 있으면 인증 실패
		//반환되는 에러메세지가 없으면 인증 성공
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;

		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요.';
		}
		if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
			errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요.';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요.';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일주소는 8글자 이상 @를 포함하세요.';
		}
		if (!value.gender) {
			errs.gender = '성별을 체크해주세요.';
		}

		if (!value.hobbys) {
			errs.hobbys = '취미를 체크해주세요.';
		}
		return errs;
	};
	return (
		<Layout name={'Member'}>
			<form onSubmit={formSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table>
						<tbody>
							<tr>
								{/* user id */}
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input
										type='text'
										name='userid'
										id='userid'
										placeholder='아이디를 입력하세요'
										onChange={handleChange}
									/>
									<br />
									{Err.userid && <p>{Err.userid}</p>}
								</td>
							</tr>

							{/* password */}
							<tr>
								<th>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='비밀번호를 입력하세요'
										onChange={handleChange}
									/>
									<br />
									{Err.pwd1 && <p>{Err.pwd1}</p>}
								</td>
							</tr>

							{/* re password */}
							<tr>
								<th>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='비밀번호를 재입력하세요'
										onChange={handleChange}
									/>
									<br />
									{Err.pwd2 && <p>{Err.pwd2}</p>}
								</td>
							</tr>

							{/* e mail */}
							<tr>
								<th>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input
										type='text'
										name='email'
										id='email'
										placeholder='이메일주소를 입력하세요'
										onChange={handleChange}
									/>
									<br />
									{Err.email && <p>{Err.email}</p>}
								</td>
							</tr>
							{/* gender */}
							<tr>
								<th>GENDER</th>
								<td>
									<label htmlFor='male'>Male</label>
									<input type='radio' name='gender' value='male' id='mail' onChange={handleRadio} />

									<label htmlFor='female'>FeMale</label>
									<input type='radio' name='gender' value='female' id='female' onChange={handleRadio} />
									<br />
									{Err.gender && <p>{Err.gender}</p>}
								</td>
							</tr>

							{/* hobby */}
							<tr>
								<th>HOBBY</th>
								<td>
									<label htmlFor='music'>music</label>
									<input type='checkbox' name='hobbys' value='music' id='music' onChange={handleCheckbox} />

									<label htmlFor='reading'>reading</label>
									<input type='checkbox' name='hobbys' value='reading' id='reading' onChange={handleCheckbox} />

									<label htmlFor='game'>game</label>
									<input type='checkbox' name='hobbys' value='game' id='game' onChange={handleCheckbox} />
									<br />
									{Err.hobbys && <p>{Err.hobbys}</p>}
								</td>
							</tr>
							{/* btn set */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='CANCEL' />
									<input type='submit' value='SEND' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Member;
