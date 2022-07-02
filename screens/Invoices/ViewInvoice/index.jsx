import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import ScreenHeader from '../../../components/ScreenHeader';
import * as Print from 'expo-print';
import PdfReader from 'rn-pdf-reader-js';
import {
	multiplePageInvoice,
	singlePageInvoice
} from '../../../components/pdfTemplate';
import { useGlobalContext } from '../../../context';
import { styles } from './styles';

const ViewInvoice = ({ navigation, route }) => {
	const id = route.params;
	const { dispatch } = useGlobalContext();
	const [previewData, setPreviewData] = useState('');
	const [data, setData] = useState({
		id: '',
		title: '',
		title2: '',
		client: {},
		items: [],
		date: ''
	});

	const convertInvoiceToPdf = async (invoice, selectedPrinter) => {
		const html =
			invoice.items < 21
				? singlePageInvoice(invoice, 15000)
				: multiplePageInvoice(invoice, 15000);
		return await Print.printToFileAsync({
			html,
			printerUrl: selectedPrinter?.url || undefined, // iOS only
			base64: true
		});
	};

	const getInvoice = async () => {
		const invoiceRef = doc(db, `invoices/${id}`);
		const invoiceSnap = await getDoc(invoiceRef);

		if (invoiceSnap.exists()) {
			setData({ ...invoiceSnap.data() });
		}

		const { base64 } = await convertInvoiceToPdf({ ...invoiceSnap.data() });
		setPreviewData(base64);
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getInvoice();
		});
		return unsubscribe;
	}, [navigation]);

	const EditInvoice = async (id) => {
		dispatch({
			type: 'EDIT_INVOICE',
			payload: { ...data }
		});
		navigation.navigate('NewInvoice');
	};

	const DeleteInvoice = async () => {
		Alert.alert(
			'Confirm Delete',
			'Are you sure you want to delete this invoice?',
			[
				{
					text: 'Cancel'
				},
				{
					text: 'OK',
					onPress: async () => {
						await deleteDoc(
							doc(db, `clients/${data.client.id}/invoices/${id}`)
						);
						await deleteDoc(doc(db, `invoices/${id}`));
						navigation.goBack();
					}
				}
			]
		);
	};

	return (
		<View style={styles.container}>
			<ScreenHeader heading="Preview" navigation={navigation} />
			<View style={styles.actionsWrapper}>
				<TouchableOpacity
					style={styles.action}
					onPress={() => EditInvoice(data.id)}
				>
					<AntDesign name="edit" color="#075E54" size={25} />
					<Text>Use as template</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.action}
					onPress={() => DeleteInvoice(data.id)}
				>
					<AntDesign name="deleteuser" color="red" size={25} />
					<Text>Delete</Text>
				</TouchableOpacity>
			</View>

			{previewData ? (
				<PdfReader
					source={{
						base64: 'data:application/pdf;base64,' + previewData
					}}
				/>
			) : (
				<></>
			)}
		</View>
	);
};

export default ViewInvoice;
