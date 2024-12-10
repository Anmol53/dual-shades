import styled from "styled-components";

const MasonryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 400vh;
  gap: 1rem;
  flex-wrap: wrap;
  @media screen and (max-width: 1024px) {
    max-height: 450vh;
  }
  @media screen and (max-width: 768px) {
    max-height: 100%;
  }
`;

const MasonryCard = styled.div`
  flex-grow: 1;
  width: 32%;
  overflow: hidden;
  border-radius: 0.75rem;
  line-height: 0;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.2),
    0 0 100px -50px ${({ theme }) => theme.headingHighlightText};
  @media screen and (max-width: 1024px) {
    width: 48%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export default function MasonryGrid({ children }) {
  return (
    <MasonryContainer>
      {children.map((card, idx) => {
        return <MasonryCard key={idx}>{card}</MasonryCard>;
      })}
    </MasonryContainer>
  );
}
