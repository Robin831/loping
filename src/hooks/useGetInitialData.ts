import useGetLaktat from '../api/useGetLaktat';
import { useAppStore } from '../context/AppContext';

export default () => {
	const { getLaktat } = useGetLaktat();
	// const { setSelectedMeasurement } = useAppStore();

	const initData = async () => {
		const measurements = await getLaktat();

		// if (measurements) {
		// 	setSelectedMeasurement({ ...measurements[0] });
		// }
	};

	return {
		initData,
	};
};
