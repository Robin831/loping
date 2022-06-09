import useGetLaktat from '../api/useGetLaktat';

export default () => {
	const { getLaktat } = useGetLaktat();

	const initData = () => {
		getLaktat();
	};

	return {
		initData,
	};
};
