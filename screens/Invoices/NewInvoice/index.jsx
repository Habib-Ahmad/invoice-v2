import { useEffect, useState } from 'react';
import {
	Text,
	View,
	ScrollView,
	TextInput,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/Button';
import ScreenHeader from '../../../components/ScreenHeader';
import Client from '../../../components/Client';
import Item from '../../../components/Item';
import { useGlobalContext } from '../../../context';
import { addInvoiceToDB, addItemsToDB, print } from './functions';
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
				title: state.title && state.title,
				title2: state.title2 && state.title2,
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

	const createPDF = async () => {
		if (Object.keys(data.client).length) {
			print({ ...data }, total, selectedPrinter);
			addInvoiceToDB({ ...data });
			addItemsToDB({ ...data });
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
					<Client data={data} removeClient={removeClient} />
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
						<Item key={idx} item={item} idx={idx} editItem={editItem} />
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
