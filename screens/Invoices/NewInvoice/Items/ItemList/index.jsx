import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
	collection,
	getDocs,
	doc,
	deleteDoc,
	onSnapshot
} from 'firebase/firestore';
import { db } from '../../../../../firebase';
import { styles } from './styles';
import ScreenHeader from '../../../../../components/ScreenHeader';
import { useGlobalContext } from '../../../../../context';

const ItemList = ({ navigation }) => {
	const { dispatch } = useGlobalContext();
	const [items, setItems] = useState([]);

	const getItemsList = () => {
		const ref = collection(db, 'items');
		onSnapshot(ref, (snap) => {
			const data = snap.docs.map((snapDoc) => ({
				...snapDoc.data(),
				id: snapDoc.id
			}));
			setItems(data);
		});
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getItemsList();
		});
		return unsubscribe;
	}, [navigation]);

	const handleSelect = (item) => {
		dispatch({
			type: 'ADD_CURRENT_ITEM',
			payload: item
		});
		navigation.navigate('NewItem');
	};

	const deleteItem = async (id) => {
		Alert.alert(
			'Confirm Delete',
			'Are you sure you want to delete this item?',
			[
				{
					text: 'Cancel'
				},
				{
					text: 'OK',
					onPress: async () => await deleteDoc(doc(db, `items/${id}`))
				}
			]
		);
	};

	return (
		<View style={styles.container}>
			<ScreenHeader heading="Items" navigation={navigation} />

			<ScrollView>
				<View style={styles.items}>
					{items.length > 0 &&
						items.map((item) => (
							<TouchableOpacity
								onPress={() => handleSelect(item)}
								style={styles.item}
								key={item.id}
							>
								<View style={styles.detailsWrapper}>
									<Icon
										style={styles.itemIcon}
										name="md-basket-outline"
										size={30}
										color="#000"
									/>

									<View style={styles.details}>
										<Text>{item.name}</Text>
										<Text style={styles.desc}>{item.description}</Text>
										<Text style={styles.price}>
											₦{item.rate.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										</Text>
									</View>
								</View>

								<TouchableOpacity onPress={() => deleteItem(item.id)}>
									<Icon name="close-outline" size={30} color="#000" />
								</TouchableOpacity>
							</TouchableOpacity>
						))}
				</View>
			</ScrollView>
		</View>
	);
};

export default ItemList;
