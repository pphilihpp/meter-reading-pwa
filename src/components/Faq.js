import React from 'react'
import styled from 'styled-components'

const Faq = () => {
    return (
        <FaqContainer>
            <QuestionHeader>
                <QuestionContent>Lorem ipsum dolor sit amet consectetur adipisicing elit.{/** map dynamic data Question */}</QuestionContent>
                <Icon>V</Icon> 
            </QuestionHeader>
            <AnswerContainer>
                <Answer>{/** Map dynamic data Answer */}</Answer>
            </AnswerContainer>
            <QuestionHeader>
                <QuestionContent>Lorem ipsum dolor sit amet?{/** map dynamic data Question */}</QuestionContent>
                <Icon>V</Icon> 
            </QuestionHeader>
            <AnswerContainer>
                <Answer>{/** Map dynamic data Answer */}</Answer>
            </AnswerContainer>
        </FaqContainer>
    )
}

export default Faq

const FaqContainer = styled.div`
    padding: 0 5px;
`

const QuestionHeader = styled.div`
    display: grid;
    margin-left: 5px;
    grid-template-columns: 5fr 1fr;
    border-bottom: solid 1px #587494;
    font-size: 12px;
    font-weight: 500;
    color: #587494;
`

const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const QuestionContent = styled.div``
const AnswerContainer = styled.div``
const Answer = styled.div``