import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { styles } from './styles';

const ClientActivity = ({ navigation, id }) => {
	const [invoices, setInvoices] = useState([]);

	useEffect(() => {
		const getInvoices = () => {
			const ref = collection(db, `clients/${id}/invoices`);
			onSnapshot(ref, (snap) => {
				const data = snap.docs.map((snapDoc) => ({
					...snapDoc.data(),
					id: snapDoc.id
				}));
				setInvoices(data);
			});
		};

		id && getInvoices();
	}, [id]);

	return (
		<ScrollView>
			<View style={styles.invoices}>
				{invoices &&
					invoices.length > 0 &&
					invoices.map((item, idx) => (
						<TouchableOpacity
							key={idx}
							style={styles.invoice}
							onPress={() => console.log('ViewInvoice', item.id)}
						>
							<View>
								<FontAwesome name="file-pdf-o" size={25} color="red" />
							</View>
							<View>
								<Text style={styles.invoiceTitle}>{item.title}</Text>
								<Text style={styles.invoiceDate}>{item.date}</Text>
							</View>
						</TouchableOpacity>
					))}
			</View>
		</ScrollView>
	);
};

export default ClientActivity;
