import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from './styles';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Clients = ({ navigation }) => {
	const [clients, setClients] = useState([]);

	const GetClientList = () => {
		const ref = collection(db, 'clients');
		onSnapshot(ref, (snap) => {
			const data = snap.docs.map((snapDoc) => ({
				...snapDoc.data(),
				id: snapDoc.id
			}));
			setClients(data);
		});
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
