import Alldata from "./components/Alldata";
import './App.css';
import { useDispatch } from 'react-redux';
import { ADD_DATA } from "./store/scc";
import DataForm from "./components/DataForm";

function App() {
	const dispatch = useDispatch();

	const addDataHandler = (data) => {
		console.log(data);
		dispatch({type: ADD_DATA, data: data});
	};
	return (
		<div className="App">
			<DataForm dataHandler={addDataHandler} />
			<Alldata url = 'https://jsonplaceholder.typicode.com/posts' />
		</div>
	);
}

export default App;
