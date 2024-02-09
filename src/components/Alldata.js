import React, { useEffect } from 'react';
import classes from './Alldata.module.css';
import Data from './Data';
import { useSelector, useDispatch } from 'react-redux';
import Modal from "./Modal";

const Alldata = (props) => {
	const dispatch = useDispatch();
	const modal = useSelector(state => state.modal);
	const data = useSelector(state => state.data);

	const { url } = props;

	const modalOpenHandler = (id) => {
		dispatch({ type: 'MODAL_OPEN', id: id });
	};

	const deleteHandler = (id) => {
		console.log(id);
		dispatch({ type: 'DELETE_DATA', id: id })
	};

	useEffect(() => {
		const fetchData = async (url) => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const allData = await response.json();
				dispatch({ type: 'LOAD_DATA', data: allData })
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		fetchData(url);
	}, [url, dispatch]);

	return (
		<div className={classes.data}>
			{data.length === 0 && <p>Loading...</p>}
			{data && data.map(item =>
				<React.Fragment key={item.id}>
					{modal && <Modal />}
					<Data
						key={item.id}
						item={item}
					>
						<button onClick={() => modalOpenHandler(item.id)}>Update</button>
						<button onClick={() => deleteHandler(item.id)}>Delete</button>
					</Data>
				</React.Fragment>
			)}
		</div>
	);
};

export default Alldata;