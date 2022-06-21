import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top:10%;
`;

export const ListLink = styled(Link)`
    border: solid 1px #ccc;
    border-radius: 5px;
    height: 5rem;
    display: flex;
    align-items: center;
    margin: 0.25rem auto;
    width: 75%;
    justify-content: center;
    color: #af2121;
    text-decoration: none;
`;
