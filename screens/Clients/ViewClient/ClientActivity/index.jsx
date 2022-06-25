import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';

const ClientActivity = ({ invoices }) => {
	return (
		<ScrollView>
			<View style={styles.invoices}>
				{invoices &&
					invoices.length > 0 &&
					invoices.map((item, idx) => (
						<TouchableOpacity
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
	);
};

export default ClientActivity;
