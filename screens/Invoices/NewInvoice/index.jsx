import {
	writeBatch,
	doc,
	collection,
	addDoc,
	getDoc,
	updateDoc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
	Text,
	View,
	ScrollView,
	TextInput,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Print from 'expo-print';
import Button from '../../../components/Button';
import ScreenHeader from '../../../components/ScreenHeader';
import { useGlobalContext } from '../../../context';
import { db } from '../../../firebase';
import { html } from '../../../components/pdfTemplate';
import { styles } from './styles';

const NewInvoice = ({ navigation }) => {
	const { state, dispatch } = useGlobalContext();
	const [isValidClient, setIsValidClient] = useState(true);
	const [selectedPrinter, setSelectedPrinter] = useState();
	const [data, setData] = useState({
		id: '',
		title: 'Invoice heading',
		title2: '',
		client: {},
		items: [],
		date: ''
	});

	const total = data.items.reduce((a, b) => a + b.quantity * b.rate, 0);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			setData({
				...data,
				client: state.newInvoiceClient,
				items: state.items
			});
			Object.keys(state.newInvoiceClient).length && setIsValidClient(true);
		});
		return unsubscribe;
	}, [navigation, state]);

	const onChangeText = (val, id) => {
		setData({
			...data,
			[id]: val
		});
	};

	const editItem = (item, idx) => {
		dispatch({
			type: 'EDIT_ITEM',
			payload: [idx, item]
		});
		navigation.navigate('EditItem');
	};

	const removeClient = () => {
		setData({
			...data,
			client: {}
		});
		dispatch({
			type: 'REMOVE_CLIENT'
		});
	};

	const print = async () => {
		// On iOS/android prints the given html. On web prints the HTML from the current page.
		await Print.printAsync({
			html,
			printerUrl: selectedPrinter?.url // iOS only
		});
	};

	const selectPrinter = async () => {
		const printer = await Print.selectPrinterAsync(); // iOS only
		setSelectedPrinter(printer);
	};

	const addItemsToDB = async () => {
		const batch = writeBatch(db);
		data.items.forEach((item) => {
			if (!item.id) {
				delete item.quantity;
				const itemRef = doc(collection(db, 'items'));
				batch.set(itemRef, item);
			}
		});
		await batch.commit();
	};

	const addInvoiceToDB = async () => {
		data.client.invoices && delete data.client.invoices;
		delete data.items.quantity;
		const clientId = data.client.id;
		const invoiceId = await addDoc(
			collection(db, `clients/${clientId}/invoices`),
			data
		).then(async (invoiceRef) => invoiceRef.id);

		const invoice = await getDoc(
			doc(db, `clients/${clientId}/invoices/${invoiceId}`)
		);
		const invoiceData = invoice.data();
		invoiceData.id = invoiceId;
		console.log(invoiceData);
		const invoiceRef = doc(db, `clients/${clientId}/invoices/${invoiceId}`);
		await updateDoc(invoiceRef, { id: invoiceId });
	};

	const createPDF = async () => {
		if (Object.keys(data.client).length) {
			print();
			addInvoiceToDB();
			addItemsToDB();
			dispatch({
				type: 'CLEAR_STATE'
			});
			navigation.navigate('Invoices');
		} else {
			setIsValidClient(false);
		}
	};

	return (
		<View style={styles.container}>
			<ScreenHeader heading="New Invoice" to="Invoices" confirmClose />

			<ScrollView>
				<Text style={[styles.actionHeader, { marginTop: 30 }]}>
					Invoice heading
				</Text>
				<View style={styles.action}>
					<TextInput
						style={styles.titleInput}
						onChangeText={(val) => onChangeText(val, 'title')}
						value={data.title}
					/>
				</View>

				<Text style={[styles.actionHeader, { marginTop: 30 }]}>
					Invoice subheading
				</Text>
				<View style={styles.action}>
					<TextInput
						style={styles.titleInput}
						onChangeText={(val) => onChangeText(val, 'title2')}
						value={data.title2}
					/>
				</View>

				<Text style={[styles.actionHeader, { marginTop: 30 }]}>Bill to</Text>
				{Object.keys(data.client).length > 0 ? (
					<View style={styles.clientWrapper}>
						<View style={styles.client}>
							<View style={styles.logoWrapper}>
								<Text style={styles.logo}>{data.client.name.charAt(0)}</Text>
							</View>
							<View style={styles.detailsWrapper}>
								<Text style={styles.name}>{data.client.name}</Text>
								<Text style={styles.email}>{data.client.email}</Text>
							</View>
						</View>
						<TouchableOpacity activeOpacity={0.8} onPress={removeClient}>
							<Icon name="close-outline" size={20} />
						</TouchableOpacity>
					</View>
				) : (
					<TouchableOpacity
						style={[styles.action, { marginBottom: 30 }]}
						onPress={() => navigation.navigate('ClientList')}
					>
						<Icon
							style={styles.actionIcon}
							name="ios-person-outline"
							size={25}
						/>
						<Text style={styles.actionText}>Add Client</Text>
					</TouchableOpacity>
				)}
				{isValidClient || (
					<Text style={styles.errorMsg}>Please select a client</Text>
				)}

				<Text style={styles.actionHeader}>Items</Text>
				{data.items.length > 0 &&
					data.items.map((item, idx) => (
						<TouchableOpacity
							activeOpacity={0.5}
							style={styles.listItem}
							key={idx}
							onPress={() => editItem(item, idx)}
						>
							<Text style={styles.listItemName}>{item.name}</Text>
							<Text
								style={[
									styles.listItemDesc,
									{ marginTop: item.description ? 5 : 0 }
								]}
							>
								{item.description}
							</Text>
							<View style={styles.listItemNumbersWrapper}>
								<Text style={styles.listItemNumbers}>
									₦{item.rate.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} x{' '}
									{item.quantity.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
								</Text>
								<Text style={styles.listItemNumbers}>
									₦
									{String(item.rate * item.quantity).replace(
										/\B(?=(\d{3})+(?!\d))/g,
										','
									)}
								</Text>
							</View>
						</TouchableOpacity>
					))}

				<TouchableOpacity
					style={styles.action}
					onPress={() => navigation.navigate('NewItem')}
				>
					<Icon style={styles.actionIcon} name="add" size={25} />
					<Text style={styles.actionText}>Add Item</Text>
				</TouchableOpacity>

				<View style={styles.subTotalWrapper}>
					<Text style={styles.subTotalText1}>Total</Text>
					<Text style={styles.subTotal}>
						₦{String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					</Text>
				</View>
			</ScrollView>

			<View style={{ marginBottom: 30 }}>
				<Button onPress={createPDF} text="Create PDF" />
			</View>
		</View>
	);
};

export default NewInvoice;
