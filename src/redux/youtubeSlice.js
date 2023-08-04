//외부 데이터 fetching함수 정의 및 export
//외부데이터 함수의 결과값에 따라 전역상태 변경함수
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//비동기 서버통신으로 데이터를 전달받아서 내부적으로 액션타입을 자동생성해서 액션객체 생성까지 완료
export const fetchYoutube = createAsyncThunk('youtube/requestYoutube', async () => {
	const apiKey = 'AIzaSyBm1-5iAqRnlxETXyLSvDYAaSnMKGrr8fY';
	const playlistId = 'PLtyGCdgf6inmUrDz2XNQJq37nfcZFOJ_M';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=${num}`;

	const response = await axios.get(url);
	return response.data.items;
});

const youtubeSlice = createSlice({
	name: 'youtube',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchYoutube.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchYoutube.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchYoutube.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default youtubeSlice.reducer;
