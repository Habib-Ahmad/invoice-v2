import { useEffect, useState } from 'react';
import {
	Text,
	View,
	ScrollView,
	TextInput,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenHeader from '../../../components/ScreenHeader';
import { styles } from './styles';
import { useGlobalContext } from '../../../context';

const NewInvoice = ({ navigation, route }) => {
	const { state, dispatch } = useGlobalContext();
	const [isValidClient, setIsValidClient] = useState(true);
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
		});
		return unsubscribe;
	}, [navigation, state]);

	const onChangeText = (val, id) => {
		setData({
			...data,
			[id]: val
		});
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
							// onPress={() => EditItem(item.name)}
						>
							<Text style={styles.listItemName}>{item.name}</Text>
							<Text
								style={[
									styles.listItemDesc,
									{ marginTop: item.description && 5 }
								]}
							>
								{item.description}
							</Text>
							<View style={styles.listItemNumbersWrapper}>
								<Text style={styles.listItemNumbers}>
									₦{item.rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
									x{' '}
									{item.quantity
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
								</Text>
								<Text style={styles.listItemNumbers}>
									₦
									{(item.rate * item.quantity)
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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

				<View
					style={[styles.subTotalWrapper, { marginTop: 0, marginBottom: 100 }]}
				>
					<Text style={styles.subTotalText1}>Total</Text>
					<Text style={styles.subTotal}>
						₦{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					</Text>
				</View>
			</ScrollView>

			<TouchableOpacity
				activeOpacity={0.7}
				// onPress={() => CreatePDF()}
				style={styles.nextButtonWrapper}
			>
				<LinearGradient
					colors={['#08d4c4', '#01ab9d']}
					style={styles.nextButton}
				>
					<Text style={[styles.textSign, { color: '#fff' }]}>Generate PDF</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
};

export default NewInvoice;
