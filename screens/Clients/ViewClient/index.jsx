import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import ScreenHeader from '../../../components/ScreenHeader';
import ClientActivity from './ClientActivity';
import ClientDetails from './ClientDetails';
import { styles } from './styles';

const Tab = createMaterialTopTabNavigator();

const ClientTabs = (props) => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Invoices"
				children={() => <ClientActivity {...props} />}
			/>
			<Tab.Screen
				name="Details"
				children={() => <ClientDetails {...props} />}
			/>
		</Tab.Navigator>
	);
};

const ViewClient = ({ navigation, route }) => {
	const [data, setData] = useState({
		id: '',
		name: '',
		email: '',
		mobile: '',
		invoices: []
	});

	useEffect(() => {
		const getClient = async () => {
			const clientRef = doc(db, `clients/${route.params}`);
			const clientSnap = await getDoc(clientRef);

			if (clientSnap.exists()) {
				setData({ id: clientSnap.id, ...clientSnap.data() });
			}
		};
		getClient();
	}, []);

	const EditClient = () => {
		navigation.navigate('EditClient', { ...data });
	};

	const DeleteClient = () => {
		Alert.alert(
			'Confirm Delete',
			'Are you sure you want to delete this client?',
			[
				{
					text: 'Cancel'
				},
				{
					text: 'OK',
					onPress: async () => {
						await deleteDoc(doc(db, `clients/${id}`));
						navigation.navigate('Clients');
					}
				}
			]
		);
	};

	return (
		<View style={styles.container}>
			<ScreenHeader heading={data.name} to="Clients" />

			<View style={styles.actionsWrapper}>
				<TouchableOpacity style={styles.action} onPress={EditClient}>
					<AntDesign name="edit" color="#075E54" size={25} />
					<Text>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.action} onPress={DeleteClient}>
					<AntDesign name="deleteuser" color="red" size={25} />
					<Text>Delete</Text>
				</TouchableOpacity>
			</View>
			<ClientTabs {...data} />
		</View>
	);
};

export default ViewClient;
