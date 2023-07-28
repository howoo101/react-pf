import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import departmentSlice from './redux/departmentSlice';
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './redux/menuSlice';

const store = configureStore({
	reducer: {
		department: departmentSlice,
		menu: menuReducer,
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
