import styled from "styled-components";

const MasonryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 300vh;
  gap: 1rem;
  flex-wrap: wrap;
`;

const MasonryCard = styled.div`
  flex-grow: 1;
  width: 32%;
  overflow: hidden;
  border-radius: 0.75rem;
  line-height: 0;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.2),
    0 0 100px -50px ${({ theme }) => theme.headingHighlightText};
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
