import React, {useState} from 'react'
import styled from 'styled-components'
import {faqData} from '../data/FaqData'
import Accordion from './Accordion'

const Faq = () => {

    return (
        <FaqContainer>
            {faqData.map((item, index) => (
                <Accordion question={item.question} answer={item.answer} key={index}/>
            ))}
        </FaqContainer>
    )
}

export default Faq

const FaqContainer = styled.div`
    padding: 0 5px;
`