import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
	doc,
	deleteDoc,
	getDoc,
	getDocs,
	collection,
	writeBatch
} from 'firebase/firestore';
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
	const id = route.params;
	const [data, setData] = useState({
		id: '',
		name: '',
		email: '',
		mobile: ''
	});

	const getClient = async () => {
		const clientRef = doc(db, `clients/${id}`);
		const clientSnap = await getDoc(clientRef);

		if (clientSnap.exists()) {
			setData({ id: clientSnap.id, ...clientSnap.data() });
		}
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getClient();
		});
		return unsubscribe;
	}, [navigation]);

	const editClient = () => {
		navigation.navigate('EditClient', { ...data });
	};

	const deleteClientInvoices = async (id) => {
		const querySnapshot = await getDocs(
			collection(db, `clients/${id}/invoices`)
		);
		const idArray = [];
		querySnapshot.forEach((doc) => idArray.push(doc.id));

		if (idArray.length) {
			const batch = writeBatch(db);
			idArray.forEach((id) => {
				const invoiceRef = doc(db, `invoices/${id}`);
				batch.delete(invoiceRef);
			});
			await batch.commit();
		}
	};

	const deleteClient = () => {
		Alert.alert(
			'Confirm Delete',
			'Are you sure you want to delete this client? You will also delete all invoices generated under them.',
			[
				{
					text: 'Cancel'
				},
				{
					text: 'OK',
					onPress: async () => {
						deleteClientInvoices(data.id);
						await deleteDoc(doc(db, `clients/${data.id}`));
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
				<TouchableOpacity style={styles.action} onPress={editClient}>
					<AntDesign name="edit" color="#075E54" size={25} />
					<Text>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.action} onPress={deleteClient}>
					<AntDesign name="deleteuser" color="red" size={25} />
					<Text>Delete</Text>
				</TouchableOpacity>
			</View>
			<ClientTabs {...data} />
		</View>
	);
};

export default ViewClient;
