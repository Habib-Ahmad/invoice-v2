import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

import Home from '../Home';

import Clients from '../Clients';
import NewClient from '../Clients/NewClient';
import ViewClient from '../Clients/ViewClient';
import EditClient from '../Clients/EditClient';

import Invoices from '../Invoices';
import NewInvoice from '../Invoices/NewInvoice';
import ClientList from '../Invoices/NewInvoice/ClientList';
import NewItem from '../Invoices/NewInvoice/Items/NewItem';
import EditItem from '../Invoices/NewInvoice/Items/EditItem';
import ItemList from '../Invoices/NewInvoice/Items/ItemList';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabs = () => {
	const { colors, dark } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false }}
			activeColor={dark ? colors.text : colors.text2}
			barStyle={{
				backgroundColor: colors.background2
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color }) => (
						<Icon name="ios-home" color={color} size={26} />
					)
				}}
			/>
			<Tab.Screen
				name="Clients"
				component={Clients}
				options={{
					tabBarLabel: 'Clients',
					tabBarIcon: ({ color }) => (
						<Icon name="ios-person" color={color} size={26} />
					)
				}}
			/>
			<Tab.Screen
				name="Invoices"
				component={Invoices}
				options={{
					tabBarLabel: 'Invoices',
					tabBarIcon: ({ color }) => (
						<Icon name="ios-document-text" color={color} size={26} />
					)
				}}
			/>
		</Tab.Navigator>
	);
};

const MainStackScreen = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomeTabs" component={HomeTabs} />
			<Stack.Screen name="NewClient" component={NewClient} />
			<Stack.Screen name="ViewClient" component={ViewClient} />
			<Stack.Screen name="EditClient" component={EditClient} />
			<Stack.Screen name="NewInvoice" component={NewInvoice} />
			<Stack.Screen name="ClientList" component={ClientList} />
			<Stack.Screen name="NewItem" component={NewItem} />
			<Stack.Screen name="EditItem" component={EditItem} />
			<Stack.Screen name="ItemList" component={ItemList} />
		</Stack.Navigator>
	);
};

export default MainStackScreen;
