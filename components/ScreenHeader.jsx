import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as RootNavigation from '../screens/stacks/MainStackScreen';
import Colors from './Colors';

const ScreenHeader = ({ heading, to }) => {
	return (
		<View style={styles.header}>
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={() => RootNavigation.navigate(to)}
			>
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
