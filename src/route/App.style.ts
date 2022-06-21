import styled from 'styled-components';

export const Wrapper = styled.div`
    h1,h2,h3,h4,h5,h6 {
        color: ${props => props.theme.headerColor};
    }
`;