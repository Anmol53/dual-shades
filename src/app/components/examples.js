import MasonryGrid from "@/components/masonryGrid";
import styled from "styled-components";

const StyledSection = styled.section`
  background-color: ${({ theme }) => theme.background1};
  color: ${({ theme }) => theme.text};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  align-items: center;
  margin: 0 auto;
  max-width: 80rem;
  padding: 5rem 2rem;
  @media screen and (max-width: 768px) {
    gap: 3rem;
    padding: 3rem 1rem;
  }
`;

const ImageCards = styled.img`
  width: 100%;
`;

export default function Examples() {
  return (
    <StyledSection id="examples">
      <Container>
        <MasonryGrid>
          <ImageCards src="/joshua-rawson-harris-bw.png"></ImageCards>
          <ImageCards src="/pexels-hikaique-bw.png"></ImageCards>
          <ImageCards src="/pexels-maxavans-bw.png"></ImageCards>
          <ImageCards src="/haniel-espinal-bw.png"></ImageCards>
          <ImageCards src="/moosa-moseneke-bw.png"></ImageCards>
          <ImageCards src="/luise-and-nic-bw.png"></ImageCards>
          <ImageCards src="/calvin-visuals-bw.png"></ImageCards>
          <ImageCards src="/tim-mossholder-bw.png"></ImageCards>
          <ImageCards src="/graca-assane-bw.png"></ImageCards>
          <ImageCards src="/courtney-cook-bw.png"></ImageCards>
          <ImageCards src="/guilherme-stecanella-bw.png"></ImageCards>
          <ImageCards src="/amos-bar-zeev-bw.png"></ImageCards>
          <ImageCards src="/cord-allman-bw.png"></ImageCards>
          <ImageCards src="/pexels-mayday-bw.png"></ImageCards>
        </MasonryGrid>
      </Container>
    </StyledSection>
  );
}
