import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { styles } from './styles';
import { db } from '../../../firebase';
import ScreenHeader from '../../../components/ScreenHeader';
import Button from '../../../components/Button';
import InputText from '../../../components/InputText';

const NewClient = ({ navigation }) => {
	const [validation, setValidation] = useState({
		isValidName: true
	});

	const [data, setData] = useState({
		name: '',
		mobile: '',
		email: ''
	});

	const onChangeText = (val, id) => {
		if (id === 'email') {
			setData({
				...data,
				[id]: val.toLowerCase()
			});
		} else {
			setData({
				...data,
				[id]: val
			});
		}
	};

	const handleSave = async () => {
		const { name } = data;
		if (name) {
			setValidation({
				...validation,
				isValidName: true
			});

			try {
				await addDoc(collection(db, 'clients'), data);
				// const client = await addDoc(collection(db, 'clients'), data).then(
				// 	async (docRef) => {
				// 		const id = docRef.id;
				// 		const document = await getDoc(doc(db, `clients/${id}`));
				// 		return document;
				// 	}
				// );
				// clientData = client.data();
				// clientData.invoices = await addDoc(
				// 	collection(db, `clients/${client.id}/invoices`),
				// 	{}
				// );
				navigation.navigate('Clients');
			} catch (e) {
				console.error('Error adding document: ', e);
			}
		} else {
			setValidation({
				...validation,
				isValidName: false
			});
		}
	};

	return (
		<View style={styles.container}>
			<ScreenHeader heading="Add Client" navigation={navigation} />

			<InputText key="Name" text="Name" bool={data.name} />
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder="Name"
					value={data.name}
					onChangeText={(val) => onChangeText(val, 'name')}
				/>
			</View>
			{validation.isValidName || (
				<Text style={styles.errorMsg}>Client name cannot be empty</Text>
			)}
			{validation.isExistingName && (
				<Text style={styles.errorMsg}>Client already exists!</Text>
			)}

			<InputText key="Mobile" text="Mobile" bool={data.mobile} />
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder="Mobile"
					value={data.mobile}
					onChangeText={(val) => onChangeText(val, 'mobile')}
				/>
			</View>

			<InputText key="Email" text="Email" bool={data.email} />
			<View style={styles.inputWrapper}>
				<TextInput
					autoCapitalize="none"
					style={styles.input}
					placeholder="Email"
					value={data.email}
					onChangeText={(val) => onChangeText(val, 'email')}
				/>
			</View>

			<Button onPress={handleSave} text="Save" />
		</View>
	);
};

export default NewClient;