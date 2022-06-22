import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({ text, onPress }) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => onPress()}>
			<LinearGradient
				colors={['#08d4c4', '#01ab9d']}
				style={styles.textWrapper}
			>
				<Text style={{ color: '#fff' }}>{text}</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	textWrapper: {
		marginTop: 30,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderColor: '#075E54',
		borderWidth: 1,
		marginHorizontal: 20
	}
});
