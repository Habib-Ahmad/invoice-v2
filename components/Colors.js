import { useTheme } from '@react-navigation/native';

const Colors = ({ theme }) => {
	const { colors } = useTheme;

	return colors;
};

export default Colors;
