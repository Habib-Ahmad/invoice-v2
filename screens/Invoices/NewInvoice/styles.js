import { StyleSheet, StatusBar, Platform } from 'react-native';
import Colors from '../../../components/Colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
		backgroundColor: Colors.background,
		position: 'relative'
	},
	titleInput: {
		fontSize: 16,
		width: '100%'
	},
	actionHeader: {
		paddingLeft: 20,
		marginBottom: 10
	},
	action: {
		backgroundColor: '#fff',
		height: 50,
		paddingHorizontal: 20,
		alignItems: 'center',
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#c9c9c9'
	},
	actionIcon: {
		color: '#075E54',
		marginRight: 20
	},
	actionText: {
		color: '#075E54'
	},
	inputWrapper: {
		width: '30%'
	},
	input: {
		color: '#05375a',
		fontSize: 15,
		borderWidth: 0.2,
		alignItems: 'center',
		padding: 3
	},
	subTotalWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#fff',
		marginTop: 30,
		height: 60,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#c9c9c9'
	},
	subTotalText1: {
		color: '#6e6e6e'
	},
	nextButtonWrapper: {
		position: 'absolute',
		bottom: 30,
		width: '100%',
		height: 50,
		backgroundColor: 'transparent',
		justifyContent: 'center'
	},
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
		marginLeft: 20,
		marginBottom: 5,
		marginTop: -30
	}
});
