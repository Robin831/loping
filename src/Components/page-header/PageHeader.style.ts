import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 1rem;

    ${props => props.theme.card()}
    h3 {
    }
`;

export const MobileWrapper = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    ${props => props.theme.card()}
    padding: 0;
    h3 {
    }
`;

type Props = {
    isSelected: boolean;
}
export const MobileButton = styled.div<Props>`
    padding: 1rem;
    border-right: solid 1px #ccc;
    text-align: center;
    width: 100%;

    ${props => props.theme.selectableElement(props.isSelected)}
`;