import { createStore } from 'redux';

// Define action types
export const LOAD_DATA = 'LOAD_DATA';
export const ADD_DATA = 'ADD_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';
export const DELETE_DATA = 'DELETE_DATA';
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

const initialState = { 
	data: [], 
	modal: false, 
	backdrop: false 
};

// Define reducer
const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_DATA:
			localStorage.setItem('myData', JSON.stringify(action.data));
			return {...state, data: action.data };
		case ADD_DATA:
			const newData = [action.data, ...state.data]
			localStorage.setItem('myData', JSON.stringify(newData));
			return { ...state, data: newData };
		case MODAL_OPEN:
			localStorage.setItem('id', action.id);
			return {...state, modal: true, backdrop: true}
		case MODAL_CLOSE:
			localStorage.removeItem('id');
			return {...state, modal: false, backdrop: false};
		case UPDATE_DATA:
			const updatedData = state.data.map((data) =>
                data.id === action.data.id ? { ...data, ...action.data } : data
            );
            localStorage.setItem('myData', JSON.stringify(updatedData));
            return { ...state, data: updatedData, modal: false, backdrop: false };
		case DELETE_DATA:
			const filteredData = state.data.filter((data) => data.id !== action.id);
            localStorage.setItem('myData', JSON.stringify(filteredData));
            return { ...state, data: filteredData };
		default:
			return state;
	}
};

// Create store
const store = createStore(dataReducer);

export default store;