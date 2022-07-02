import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useGlobalContext } from '../context';
import * as RootNavigation from '../RootNavigation';
import Colors from './Colors';

const ScreenHeader = ({ heading, to, props, confirmClose, navigation }) => {
	const { dispatch } = useGlobalContext();
	const close = () => {
		if (navigation) {
			navigation.goBack();
		} else if (confirmClose) {
			Alert.alert('Discard changes?', 'All changes will be lost', [
				{
					text: 'Cancel'
				},
				{
					text: 'Discard Changes',
					onPress: () => {
						dispatch({ type: 'CLEAR_STATE' });
						RootNavigation.navigate(to, props && props);
					}
				}
			]);
		} else {
			RootNavigation.navigate(to, props && props);
		}
	};

	return (
		<View style={styles.header}>
			<TouchableOpacity activeOpacity={0.9} onPress={close}>
				<Icon
					style={{ marginRight: 15 }}
					name="close-outline"
					color="#075E54"
					size={30}
				/>
			</TouchableOpacity>
			<Text style={styles.headerText}>{heading}</Text>
		</View>
	);
};

export default ScreenHeader;

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.background2,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#c9c9c9',
		zIndex: 5
	},
	headerText: {
		fontSize: 22,
		color: Colors.text
	}
});
