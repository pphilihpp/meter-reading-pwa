import styled from 'styled-components'
// import {Link} from 'react-router-dom'

export const Button = styled.button`
    white-space: no-wrap;
    color: #ffffff;
    outline: none;
    min-width: 100px;
    cursor: pointer;
    text-decoration: none;
    transition: 0.3s !important;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: ${({primary}) => (primary ? '#006695' : '#D9534F')};
    border-radius: ${({ round }) => (round ? '20px' : '4px')};
    padding: ${({ big }) => (big ? '8px 24px' : '5px 16px')};
    margin: ${props => props.margin}; 
    width: ${props => props.width}; 
    font-size: ${({ big }) => (big ? '20px' : '16px')}; 

    &:hover {
        background: ${({primary}) => (primary ? '#009AE2' : '#C0C0C0')};
        text-decoration: none;
        color: #000000;
        transform: translateY(-2px);
    } 

    &:disabled {
        background: #C0C0C0;
        color: #000000;
    }
`