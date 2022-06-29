import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Client = ({ data, removeClient }) => {
	return (
		<View style={styles.clientWrapper}>
			<View style={styles.client}>
				<View style={styles.logoWrapper}>
					<Text style={styles.logo}>{data.client.name.charAt(0)}</Text>
				</View>
				<View>
					<Text style={styles.name}>{data.client.name}</Text>
					<Text style={styles.email}>{data.client.email}</Text>
				</View>
			</View>
			<TouchableOpacity activeOpacity={0.8} onPress={removeClient}>
				<Icon name="close-outline" size={20} />
			</TouchableOpacity>
		</View>
	);
};

export default Client;

const styles = StyleSheet.create({
	clientWrapper: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		height: 70,
		marginBottom: 30,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#c9c9c9'
	},
	client: {
		flexDirection: 'row'
	},
	logoWrapper: {
		backgroundColor: 'pink',
		width: 40,
		height: 40,
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 20
	},
	logo: {
		fontSize: 20
	},
	name: {
		fontSize: 16
	},
	email: {
		color: '#5c5c5c',
		fontSize: 12
	}
});
