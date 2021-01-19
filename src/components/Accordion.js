import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useSpring, animated} from 'react-spring'
import { useMeasure } from "react-use";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Accordion = (props) => {
    const defaultHeight = "0px";

    // Manages the open or cloased state of the accordion
    const [open, toggle] = useState(false);

    // The height of the content inside of the accordion
    const [contentHeight, setContentHeight] = useState(defaultHeight);

    // Gets the height of the element (ref)
    const [ref, { height }] = useMeasure();


    // Animations
    const expand = useSpring({
        height: open ? `${contentHeight}px` : defaultHeight
    });

    useEffect(() => {
        //Sets initial height
        setContentHeight(height);
      
        //Adds resize event listener
        window.addEventListener("resize", setContentHeight(height));
      
        // Clean-up
        return window.removeEventListener("resize", setContentHeight(height));
      }, [height]);

    return (
                <EntryContainer>
                    <QuestionHeader>
                        <QuestionContent>{props.question}</QuestionContent>
                        <ExpandIconWrapper onClick={() => toggle(!open)} active={open}><ExpandMoreIcon style={{ fontSize: 30 }}/></ExpandIconWrapper>
                    </QuestionHeader>
                    <AnswerContainer style={expand}>
                        <Answer ref={ref}>{props.answer}</Answer>
                    </AnswerContainer>
                </EntryContainer>
    )
}

export default Accordion

const EntryContainer = styled.div`
    margin: 5px 0%;
`

const QuestionHeader = styled.div`
    display: grid;
    margin-left: 5px;
    padding-bottom: 5px;
    border-bottom: solid 1px #587494;
    grid-template-columns: 5fr 1fr;
    font-size: 16px;
    font-weight: 500;
    color: #587494;
`
const QuestionContent = styled.div`
    display: flex;
    align-items: center;
`

const ExpandIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => props.active ? "rotate(180deg)" : ""};
`
const AnswerContainer = styled(animated.div)`
    overflow: hidden;
`
const Answer = styled.div`
`