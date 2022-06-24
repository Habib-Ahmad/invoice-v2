import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { db } from '../../../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from './styles';
import ScreenHeader from '../../../../components/ScreenHeader';
import { useGlobalContext } from '../../../../context';

const ClientList = ({ navigation }) => {
	const [clients, setClients] = useState([]);
	const { dispatch } = useGlobalContext();

	const getClientList = () => {
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
			getClientList();
		});
		return unsubscribe;
	}, [navigation]);

	const addClient = (client) => {
		dispatch({
			type: 'ADD_CLIENT',
			payload: { ...client }
		});
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<ScreenHeader heading="Clients" navigation={navigation} />
			<ScrollView style={styles.scrollView}>
				<View style={styles.clients}>
					{clients.length > 0 &&
						clients.map((client) => (
							<TouchableOpacity
								key={client.id}
								style={styles.client}
								onPress={() => addClient(client)}
							>
								<View style={styles.logoWrapper}>
									<Text style={styles.logo}>
										{client.name && client.name.charAt(0)}
									</Text>
								</View>
								<View>
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

export default ClientList;
