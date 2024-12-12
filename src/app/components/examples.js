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
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.2);
  }
`;

export default function Examples() {
  return (
    <StyledSection id="examples">
      <Container>
        <MasonryGrid>
          <ImageCards src="/assets/examples/joshua-rawson-harris-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/pexels-hikaique-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/pexels-maxavans-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/haniel-espinal-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/moosa-moseneke-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/dual-shades-1733777258385.png"></ImageCards>
          <ImageCards src="/assets/examples/luise-and-nic-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/calvin-visuals-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/tim-mossholder-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/graca-assane-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/amos-bar-zeev-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/dual-shades-1733779248087.png"></ImageCards>
          <ImageCards src="/assets/examples/dual-shades-1733844835186.png"></ImageCards>
          <ImageCards src="/assets/examples/guilherme-stecanella-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/courtney-cook-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/dual-shades-violin.png"></ImageCards>
          <ImageCards src="/assets/examples/cord-allman-bw.png"></ImageCards>
          <ImageCards src="/assets/examples/dual-shades-1733777073778.png"></ImageCards>
          <ImageCards src="/assets/examples/pexels-mayday-bw.png"></ImageCards>
        </MasonryGrid>
      </Container>
    </StyledSection>
  );
}
