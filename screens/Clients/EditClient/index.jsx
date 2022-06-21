import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, updateDoc } from 'firebase/firestore';
import { styles } from './styles';
import ScreenHeader from '../../../components/ScreenHeader';
import { db } from '../../../firebase';

const EditClient = ({ navigation, route }) => {
	const { name, mobile, email, id } = route.params;

	const [validation, setValidation] = useState({
		isValidName: true
	});

	const [data, setData] = useState({
		name,
		mobile,
		email
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
		if (name) {
			setValidation({
				...validation,
				isValidName: true
			});
			const clientRef = doc(db, `clients/${id}`);
			const { name, email, mobile } = data;
			await updateDoc(clientRef, {
				name,
				email,
				mobile
			});

			navigation.navigate('ViewClient', id);
		} else {
			setValidation({
				...validation,
				isValidName: false
			});
		}
	};

	return (
		<View style={styles.container}>
			<ScreenHeader
				heading="Edit Client"
				to="ViewClient"
				props={route.params}
			/>

			<InputText bool={data.name} text="Name" />
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

			<InputText bool={data.mobile} text="Mobile" />
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder="Mobile"
					value={data.mobile}
					onChangeText={(val) => onChangeText(val, 'mobile')}
				/>
			</View>

			<InputText bool={data.email} text="E-mail" />
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={data.email}
					onChangeText={(val) => onChangeText(val, 'email')}
				/>
			</View>

			<TouchableOpacity activeOpacity={0.7} onPress={handleSave}>
				<LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
					<Text style={[styles.textSign, { color: '#fff' }]}>Save</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
};

export default EditClient;

const InputText = ({ bool, text }) => {
	if (bool) {
		return <Text style={styles.inputText}>{text}</Text>;
	}
	return <View style={{ marginTop: 50 }} />;
};
