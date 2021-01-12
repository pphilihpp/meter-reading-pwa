import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const Button = styled(Link)`
    white-space: no-wrap;
    color: #ffffff;
    outline: none;
    min-width: 100px;
    cursor: pointer;
    text-decoration: none;
    transition: 0.3s !important;
    border: 1px solid rgba(0, 0, 0, 0.2);
    /* predefined values */
    background: ${({primary}) => (primary ? '#006695' : '#009AE2')};
    border-radius: ${({ round }) => (round ? '20px' : '4px')};
    padding: ${({ big }) => (big ? '8px 24px' : '5px 16px')};
    /* custom values */
    margin: ${props => props.margin};
    width: ${props => props.width};
    /* font-size: ${({ big }) => (big ? '20px' : '16px')}; */

    &:hover {
        background: ${({primary}) => (primary ? '#009AE2' : '#006695')};
        transform: translateY(-2px);
    }
`
