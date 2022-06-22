import AppWrapper from './context/authContext';
import AppView from './AppView';
import ContextProvider from './context';

const App = () => {
	return (
		<AppWrapper>
			<ContextProvider>
				<AppView />
			</ContextProvider>
		</AppWrapper>
	);
};

export default App;
