import { StyleSheet, StatusBar, Platform } from 'react-native';
import Colors from '../../../../../components/Colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
		backgroundColor: Colors.background
	},
	inputWrapper: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#d6d6d6',
		paddingBottom: 5,
		marginHorizontal: 10
	},
	input: {
		flex: 1,
		paddingLeft: 10,
		color: '#05375a',
		fontSize: 18
	},
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
		marginLeft: 20,
		marginBottom: 5
	}
});
