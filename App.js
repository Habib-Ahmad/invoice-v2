import AppWrapper from './context/authContext';
import AppView from './AppView';

const App = () => {
	return (
		<AppWrapper>
			<AppView />
		</AppWrapper>
	);
};

export default App;
