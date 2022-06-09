import styled from 'styled-components';

export const Wrapper = styled.div`
	padding: 1rem;
	display: grid;
	grid-template-columns: 1fr 50%;
`;

export const MeasurementHeader = styled.div`
	display: flex;
	aling-items: center;
	justify-content: space-between;
`;

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
`;

export const DataContainer = styled.div`
	display: flex;
	flex-flow: column wrap;
	row-gap: 10px;
	column-gap: 2em;
`;

export const HeaderWrapper = styled.div`
	display: grid;
	grid-template-columns: 200px 200px 200px;
	column-gap: 10px;
`;
