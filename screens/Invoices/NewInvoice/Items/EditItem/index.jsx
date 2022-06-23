import { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import { styles } from './styles';
import Button from '../../../../../components/Button';
import ScreenHeader from '../../../../../components/ScreenHeader';
import InputText from '../../../../../components/InputText';

const EditItem = ({ navigation, route }) => {
	const { name, description, rate, quantity } = route.params;

	const [validation, setValidation] = useState({
		isValidName: true,
		isValidRate: true,
		isValidQuantity: true
	});

	const [item, setItem] = useState({
		name,
		description,
		rate,
		quantity
	});

	const onChangeText = (val, id) => {
		setItem({
			...item,
			[id]: val
		});
	};

	const handleSave = async () => {
		const { name, description, rate, quantity } = item;
		if (name && rate && quantity) {
			const clientRef = doc(db, `items/${id}`);
			await updateDoc(clientRef, {
				name,
				description,
				rate,
				quantity
			});
		} else {
			setValidation({
				...validation,
				isValidName: name ? true : false,
				isValidRate: rate ? true : false,
				isValidQuantity: quantity ? true : false
			});
		}
	};

	const handleValidation = (val, id) => {
		if (val.trim().length > 0) {
			setValidation({
				...validation,
				[id]: true
			});
		}
	};

	const handleDeleteItem = async () => {
		Alert.alert(
			'Confirm Delete',
			'Are you sure you want to delete this item?',
			[
				{
					text: 'Cancel'
				},
				{
					text: 'OK',
					onPress: () => {}
				}
			]
		);
	};

	return (
		<View style={styles.container}>
			<ScreenHeader heading="Edit Item" navigation={navigation} />

			<InputText bool={item.name} text="Item name" />
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder="Item name"
					value={item.name}
					onChangeText={(val) => onChangeText(val, 'name')}
					onEndEditing={(e) =>
						handleValidation(e.nativeEvent.text, 'isValidName')
					}
				/>
			</View>
			{validation.isValidName || (
				<Text style={styles.errorMsg}>Item name cannot be empty</Text>
			)}

			<InputText bool={item.description} text="Description" />
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder="Item description"
					value={item.description}
					onChangeText={(val) => onChangeText(val, 'description')}
				/>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<View style={{ width: '50%' }}>
					<InputText bool={item.rate} text="Rate" />
					<View style={styles.inputWrapper}>
						<TextInput
							style={styles.input}
							placeholder="Rate"
							onChangeText={(val) => onChangeText(val, 'rate')}
							value={item.rate}
							keyboardType="numeric"
							onEndEditing={(e) =>
								handleValidation(e.nativeEvent.text, 'isValidRate')
							}
						/>
					</View>
					{validation.isValidRate || (
						<Text style={styles.errorMsg}>Rate cannot be empty</Text>
					)}
				</View>

				<View style={{ width: '50%' }}>
					<InputText bool={item.quantity} text="Quantity" />
					<View style={styles.inputWrapper}>
						<TextInput
							style={styles.input}
							placeholder="Quantity"
							onChangeText={(val) => onChangeText(val, 'quantity')}
							value={item.quantity}
							keyboardType="numeric"
							onEndEditing={(e) =>
								handleValidation(e.nativeEvent.text, 'isValidQuantity')
							}
						/>
					</View>
					{validation.isValidQuantity || (
						<Text style={styles.errorMsg}>Quantity cannot be empty</Text>
					)}
				</View>
			</View>

			<Button onPress={handleSave} text="Save Changes" />
			<Button onPress={handleDeleteItem} text="Delete" />
		</View>
	);
};

export default EditItem;
