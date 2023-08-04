import { combineReducers } from 'redux';

//store의 데이터를 변경해주는 변형자함수

// 초기 데이터값을 state로 지정하고 action객체가 넘어오면 타입에따라 데이터를 변경해주는 변형자 함수
const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, youtubeReducer });

export default reducers;
