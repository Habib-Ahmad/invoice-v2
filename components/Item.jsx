import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Item = ({ item, idx, editItem }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			style={styles.listItem}
			onPress={() => editItem(item, idx)}
		>
			<Text style={styles.listItemName}>{item.name}</Text>
			<Text
				style={[styles.listItemDesc, { marginTop: item.description ? 5 : 0 }]}
			>
				{item.description}
			</Text>
			<View style={styles.listItemNumbersWrapper}>
				<Text style={styles.listItemNumbers}>
					₦{item.rate.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} x{' '}
					{item.quantity.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
				</Text>
				<Text style={styles.listItemNumbers}>
					₦
					{String(item.rate * item.quantity).replace(
						/\B(?=(\d{3})+(?!\d))/g,
						','
					)}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Item;

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#fff',
		height: 100,
		paddingHorizontal: 20,
		paddingVertical: 10,
		justifyContent: 'center',
		borderBottomWidth: 0.5,
		borderBottomColor: '#c9c9c9'
	},
	listItemName: {
		color: '#000'
	},
	listItemDesc: {
		color: '#6e6e6e',
		marginBottom: 8
	},
	listItemNumbersWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	listItemNumbers: {
		color: '#6e6e6e'
	}
});
