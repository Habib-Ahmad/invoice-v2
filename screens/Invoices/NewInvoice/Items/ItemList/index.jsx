import {
	View,
	Text,
	TouchableOpacity,
	Alert,
	ScrollView,
	RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

const Items = ({ navigation }) => {
	const setItemDetails = async (item) => {
		await AsyncStorage.setItem('itemDetails', JSON.stringify(item));
		navigation.navigate('AddItem');
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
					onPress: async () => {
						await database()
							.ref(`/items/${id}`)
							.remove()
							.then(() => onRefresh());
					}
				}
			]
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={() => navigation.goBack()}
				>
					<Icon
						style={{ marginRight: 15 }}
						name="close"
						color="#075E54"
						size={25}
					/>
				</TouchableOpacity>
				<Text style={styles.headerText}>Items</Text>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollView}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				{changes && <Text>Changes detected, pull down to refresh</Text>}

				<View style={styles.items}>
					{items &&
						items.map((item) => (
							<TouchableOpacity
								onPress={() => setItemDetails(item)}
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

export default Items;
