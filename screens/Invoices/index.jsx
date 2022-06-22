import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';

const Invoices = ({ navigation }) => {
	const [invoice, setInvoice] = useState([
		{
			id: '',
			title: '',
			path: '',
			client: {},
			items: [],
			date: ''
		}
	]);

	const getInvoices = async () => {};

	const ViewInvoice = async (id) => {
		navigation.navigate('ViewInvoice');
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getInvoices();
		});
		return unsubscribe;
	}, [navigation]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Invoices</Text>
			</View>
			<ScrollView style={styles.scrollView}>
				<View style={styles.invoices}>
					{invoice[0].id
						? invoice.reverse().map((item, idx) => (
								<TouchableOpacity
									activeOpacity={0.8}
									key={idx}
									style={styles.invoice}
									onPress={() => {
										ViewInvoice(item.id);
									}}
								>
									<View>
										<FontAwesome name="file-pdf-o" size={25} color="red" />
									</View>
									<View>
										<Text style={styles.invoiceTitle}>{item.title}</Text>
										<Text style={styles.invoiceDate}>{item.date}</Text>
									</View>
								</TouchableOpacity>
						  ))
						: null}
				</View>
			</ScrollView>
			<TouchableOpacity
				onPress={() => navigation.navigate('NewInvoice')}
				style={styles.newInvoiceBtn}
			>
				<AntDesign style={styles.newInvoiceBtnIcon} name="plus" size={40} />
			</TouchableOpacity>
		</View>
	);
};

export default Invoices;
