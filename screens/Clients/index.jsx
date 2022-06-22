import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from './styles';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Clients = ({ navigation }) => {
	const [clients, setClients] = useState([]);

	const GetClientList = async () => {
		const clientList = [];
		await getDocs(collection(db, 'clients'))
			.then((snap) =>
				snap.forEach((doc) => clientList.push({ ...doc.data(), id: doc.id }))
			)
			.then(() => setClients(clientList));
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			GetClientList();
		});
		return unsubscribe;
	}, [navigation]);

	const ViewClient = (id) => {
		navigation.navigate('ViewClient', id);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Clients</Text>
			</View>
			<ScrollView style={styles.scrollView}>
				<View style={styles.clients}>
					{clients.length > 0 &&
						clients.map((client, idx) => (
							<TouchableOpacity
								activeOpacity={0.8}
								key={idx}
								style={styles.client}
								onPress={() => ViewClient(client.id)}
							>
								<View style={styles.logoWrapper}>
									<Text style={styles.logo}>
										{client.name && client.name.charAt(0)}
									</Text>
								</View>
								<View style={styles.detailsWrapper}>
									<Text style={styles.name}>{client.name}</Text>
									<Text style={styles.email}>{client.email}</Text>
								</View>
							</TouchableOpacity>
						))}
				</View>
			</ScrollView>
			<TouchableOpacity
				onPress={() => navigation.navigate('NewClient')}
				style={styles.newInvoiceBtn}
			>
				<Icon style={styles.newInvoiceBtnIcon} name="plus" size={40} />
			</TouchableOpacity>
		</View>
	);
};

export default Clients;
