import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './styles';
import ScreenHeader from '../../../../../components/ScreenHeader';
import Button from '../../../../../components/Button';
import InputText from '../../../../../components/InputText';
import { useGlobalContext } from '../../../../../context';

const NewItem = ({ navigation }) => {
	const { dispatch } = useGlobalContext();
	const [validation, setValidation] = useState({
		isValidName: true,
		isValidRate: true,
		isValidQuantity: true
	});

	const [item, setItem] = useState({
		name: '',
		description: '',
		rate: '',
		quantity: ''
	});

	const onChangeText = (val, id) => {
		setItem({
			...item,
			[id]: val
		});
	};

	const AddItem = () => {
		const { isValidName, isValidRate, isValidQuantity } = validation;
		const { name, description, rate, quantity } = item;
		if (name && description && rate && quantity) {
			dispatch({
				type: 'ADD_ITEM',
				payload: { ...item }
			});
			navigation.goBack();
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

	// useEffect(() => {
	// 	setValidation({
	// 		...validation,
	// 		isValidName: true,
	// 		isValidRate: true,
	// 		isValidQuantity: true
	// 	});
	// }, []);

	return (
		<View style={styles.container}>
			<ScreenHeader heading="Add Item" navigation={navigation} />

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

			<TouchableOpacity
				style={styles.select}
				onPress={() => navigation.navigate('ItemList')}
			>
				<Text style={styles.selectText}>Select from list</Text>
			</TouchableOpacity>

			<Button text="Add" onPress={AddItem} />
		</View>
	);
};

export default NewItem;
