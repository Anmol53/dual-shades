import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const AccordionContainer = styled.div``;

const AccordionItem = styled.div`
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

const AccordionTitle = styled.div`
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: ${({ $isOpen, theme }) => ($isOpen ? theme.accentColor : theme.text)};
  transition: all 0.3s ease-in-out;
  font-weight: 600;
`;

const AccordionContent = styled.div`
  max-height: ${({ $isOpen }) => ($isOpen ? "30rem" : "0px")};
  overflow: hidden;
  font-size: 1.125rem;
  transition: all 0.5s ease-in-out;
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0.5")};
  max-width: 90%;
  > div {
    padding-bottom: 1rem;
  }
`;

const Chevron = styled.span`
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState([]);

  const toggleAccordion = (index) => {
    if (openIndex.includes(index)) {
      setOpenIndex(openIndex.filter((i) => i !== index));
    } else {
      setOpenIndex([...openIndex, index]);
    }
  };

  return (
    <AccordionContainer>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionTitle
            onClick={() => toggleAccordion(index)}
            $isOpen={openIndex.includes(index)}
          >
            {item.title}
            <Chevron $isOpen={openIndex.includes(index)}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Chevron>
          </AccordionTitle>
          <AccordionContent $isOpen={openIndex.includes(index)}>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
}
