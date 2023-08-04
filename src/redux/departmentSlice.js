//외부 데이터 fetching함수 정의 및 export
//외부데이터 함수의 결과값에 따라 전역상태 변경함수
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//비동기 서버통신으로 데이터를 전달받아서 내부적으로 액션타입을 자동생성해서 액션객체 생성까지 완료

export const fetchDepartment = createAsyncThunk('department/requestDepartment', async () => {
	const response = await axios.get(`${process.env.PUBLIC_URL}/DB/members.json`);
	return response.data.members;
});

const departmentSlice = createSlice({
	name: 'youtube',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchDepartment.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchDepartment.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchDepartment.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default departmentSlice.reducer;
