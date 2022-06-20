import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

import Home from '../Home';
import Clients from '../Clients';
import Invoice from '../Invoice';

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
				name="Invoice"
				component={Invoice}
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
			<Stack.Screen
				name="HomeTabs"
				component={HomeTabs}
				options={{
					title: 'Home'
				}}
			/>
		</Stack.Navigator>
	);
};

export default MainStackScreen;
