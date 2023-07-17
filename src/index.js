import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import youtubeReducer from './redux/youtubeSlice';
import departmentSlice from './redux/departmentSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		department: departmentSlice,
	},
});

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
);
