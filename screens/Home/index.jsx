import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	SafeAreaView,
	Text,
	View,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuthContext } from '../../context/authContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const Home = ({ navigation }) => {
	const { logOut } = useAuthContext();

	const [invoiceList, setInvoiceList] = useState([
		{
			id: '',
			title: '',
			path: '',
			client: {},
			items: [],
			date: '',
			createdAt: ''
		}
	]);

	const getInvoices = () => {
		const ref = collection(db, 'invoices');
		onSnapshot(ref, (snap) => {
			const data = snap.docs.map((snapDoc) => ({
				...snapDoc.data(),
				id: snapDoc.id
			}));
			setInvoiceList(data);
		});
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getInvoices();
		});
		return unsubscribe;
	}, [navigation]);

	const ViewInvoice = async (id) => {
		await AsyncStorage.setItem('viewInvoiceId', id);
		navigation.navigate('ViewInvoice');
	};

	const sortedInvoices = invoiceList.sort((a, b) =>
		a.createdAt < b.createdAt ? 1 : -1
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Home</Text>
				<View style={styles.icons}>
					<TouchableOpacity onPress={() => logOut()}>
						<Icon name="logout" color="#009387" size={25} />
					</TouchableOpacity>
				</View>
			</View>

			{!invoiceList || !invoiceList.length || !invoiceList[0].id ? (
				<View style={styles.wrapper}>
					<Text style={styles.text}>
						You don&apos;t have any invoices, lets create your first invoice!
					</Text>

					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => navigation.navigate('NewInvoice')}
						style={styles.buttonWrapper}
					>
						<LinearGradient
							colors={['#08d4c4', '#01ab9d']}
							style={styles.button}
						>
							<Text style={{ color: '#fff', fontSize: 16 }}>
								Create Invoice
							</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			) : (
				<ScrollView style={styles.scrollView}>
					<View style={styles.invoices}>
						{sortedInvoices.map((item, idx) => (
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
						))}
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default Home;
