import { View, Text } from 'react-native';
import { styles } from './styles';

const ClientDetails = ({ email, mobile }) => {
	return (
		<View style={styles.container}>
			<View style={styles.itemWrapper}>
				<Text style={styles.itemText1}>Mobile</Text>
				<Text>{mobile}</Text>
			</View>
			<View style={styles.itemWrapper}>
				<Text style={styles.itemText1}>E-mail</Text>
				<Text>{email}</Text>
			</View>
		</View>
	);
};

export default ClientDetails;
