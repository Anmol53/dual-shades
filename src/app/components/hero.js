import styled from "styled-components";
import Header from "./header";
import { Tick } from "@/components/svg";
import Button from "@/components/button";
import { redirect } from "next/navigation";
import BeforeAfterImage from "@/components/beforeAfterImage";

const StyledHero = styled.div`
  background-color: ${({ theme }) => theme.background1};
  color: ${({ theme }) => theme.text};
`;

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  gap: 5rem;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 80rem;
  padding: 6rem 2rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    align-items: center;
    text-align: center;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.25rem;
  @media screen and (max-width: 768px) {
    gap: 2rem;
    align-items: center;
  }
`;

const Heading = styled.h1`
  font-weight: 800;
  letter-spacing: -0.025em;
  font-size: 2.75rem;
  line-height: 1.1;
  padding-top: 0.5rem;
  color: ${({ theme }) => theme.accentColor};

  span {
    font-size: 3.75rem;
    color: ${({ theme }) => theme.headingHighlightText};
  }
  span:nth-child(2) {
    color: tomato;
    border-bottom: 5px dashed ${({ theme }) => theme.accentColor};
  }

  @media screen and (max-width: 768px) {
    font-size: 1.75rem;
    line-height: 1.25;
    span {
      font-size: 2rem;
    }
  }
`;

const Subheading = styled.p`
  max-width: 32rem;
  font-size: 1.125rem;
  line-height: 1.625;
`;

const FeatureList = styled.ul`
  list-style: none;
  line-height: 1.625;
`;

const FeatureListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-start;
`;

const CTA = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: start;
  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

const Illustration = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(100, 100, 100, 0.2),
      0 0 15px 5px rgba(100, 100, 100, 0.1);
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default function Hero() {
  return (
    <StyledHero>
      <Header />
      <Container>
        <InnerContainer>
          <Heading>
            Bring Your <span>Photos</span> to Life with <span>Color</span>{" "}
            Focus.
          </Heading>
          <Subheading>
            Highlight what matters most—keep your subject in vibrant color and
            turn the background black and white effortlessly.
          </Subheading>
          <FeatureList>
            <FeatureListItem>
              <Tick color={"green"} />
              No professional skills required
            </FeatureListItem>
            <FeatureListItem>
              <Tick color={"green"} />
              AI-Powered Subject Detection
            </FeatureListItem>
            <FeatureListItem>
              <Tick color={"green"} />
              Fast and Easy Photo Processing
            </FeatureListItem>
            <FeatureListItem>
              <Tick color={"green"} />
              Drag-and-Drop Photo Uploads
            </FeatureListItem>
          </FeatureList>
          <CTA>
            <Button
              onClick={() => {
                redirect("/dashboard");
              }}
            >
              Open App
            </Button>
          </CTA>
        </InnerContainer>
        <Illustration>
          <div>
            <BeforeAfterImage $width={"25vw"} $height={"40vw"}>
              <img src="/raul-varzar-og.jpg"></img>
              <img src="/raul-varzar-bw.png"></img>
            </BeforeAfterImage>
          </div>
        </Illustration>
      </Container>
    </StyledHero>
  );
}
