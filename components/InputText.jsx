import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const InputText = ({ bool, text }) => {
	if (bool) {
		return (
			<Animatable.Text
				animation="fadeIn"
				duration={500}
				style={styles.container}
			>
				{text}
			</Animatable.Text>
		);
	}
	return <View style={{ marginTop: 50 }} />;
};

export default InputText;

const styles = StyleSheet.create({
	container: {
		color: '#05375a',
		fontSize: 16,
		marginLeft: 10,
		marginTop: 30
	}
});
