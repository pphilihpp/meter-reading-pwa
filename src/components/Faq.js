import React from 'react'
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {faqData} from '../data/FaqData'

const Faq = () => {
    return (
        <FaqContainer>
            {faqData.map((item, index) => (
                <EntryContainer key={index}>
                    <QuestionHeader>
                        <QuestionContent>{item.question}</QuestionContent>
                        <ExpandIconWrapper><ExpandMoreIcon style={{ fontSize: 30 }}/></ExpandIconWrapper>
                    </QuestionHeader>
                    <AnswerContainer>
                        <Answer>{item.answer}</Answer>
                    </AnswerContainer>
                </EntryContainer>
            ))}
        </FaqContainer>
    )
}

export default Faq

const FaqContainer = styled.div`
    padding: 0 5px;
`
const EntryContainer = styled.div`
`

const QuestionHeader = styled.div`
    display: grid;
    margin-left: 5px;
    grid-template-columns: 5fr 1fr;
    border-bottom: solid 1px #587494;
    font-size: 14px;
    font-weight: 500;
    color: #587494;
`

const ExpandIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const QuestionContent = styled.div`
    display: flex;
    align-items: center;
`
const AnswerContainer = styled.div``
const Answer = styled.div``