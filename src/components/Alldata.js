import React, { useEffect } from 'react';
import classes from './Alldata.module.css';
import Data from './Data';
import { useSelector, useDispatch } from 'react-redux';
import Modal from "./Modal";
import { LOAD_DATA, MODAL_OPEN } from '../store/scc';

const Alldata = (props) => {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);
    const backdrop = useSelector(state => state.backdrop);
    const allData = useSelector(state => state.data);

    const { url } = props;

    const modalOpenHandler = (id) => {
        dispatch({ type: MODAL_OPEN, id:id});
    };

    const deleteHandler = (id) => {
        console.log(id);
        dispatch({ type: 'DELETE_DATA', id: id })
    };

    useEffect(() => {
        async function fetchData(url) {
            const response = await fetch(url);
            const data = await response.json();
            const dataString = JSON.stringify(data);
            localStorage.setItem('myData', dataString);
            dispatch({ type: LOAD_DATA, data: data})
        }
        fetchData(url);

    }, [url, dispatch]);

    return (
        <div className={classes.data}>
            {allData.map(item => (
                <>
                    {modal && <Modal />}
                    <Data
                        key={item.id}
                        item={item}
                    >
                        <button onClick={() => modalOpenHandler(item.id)}>Update</button>
                        <button onClick={() => deleteHandler(item.id)}>Delete</button>
                    </Data>
                </>

            ))}
        </div>
    );
};

export default Alldata;