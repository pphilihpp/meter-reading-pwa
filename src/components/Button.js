import styled from 'styled-components'

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
    border-radius: ${({ round }) => (round ? '20px' : '10px')};
    padding: ${({ big }) => (big ? '8px 24px' : '5px 16px')};
    margin: ${props => props.margin}; 
    width: ${props => props.width}; 
    font-size: ${({ big }) => (big ? '20px' : '16px')};
    font-weight: ${({ bold }) => (bold ? '600' : '400')};

    &:hover {
        background: ${({primary}) => (primary ? '#6387AF' : '#6387AF')};
        text-decoration: none;
        transform: translateY(-2px);
    } 

    &:disabled {
        background: rgba(172, 179, 191, 0.2);
        color: #002C5D;
        border-color: rgba(88, 116, 148, 0.4);
    }
`