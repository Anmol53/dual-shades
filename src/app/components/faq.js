import Accordion from "@/components/accordian";
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  padding-top: 1rem;
`;

const Heading = styled.h2`
  font-weight: 800;
  font-size: 1rem;
  line-height: 1.1;
  padding-top: 0.5rem;
  color: ${({ theme }) => theme.accentColor};
`;

const InnerContainer = styled.div`
  padding: 0 6rem;
  max-width: 50rem;
  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const faqs = [
  {
    title: "What is Dual Shades?",
    content:
      "Dual Shades is a photo editing app that lets you keep your subject in vibrant color while turning the background black and white.",
  },
  {
    title: "How does Dual Shades work?",
    content:
      "Dual Shades uses AI technology to detect the subject of your photo, keeping it in full color and converting the background to grayscale automatically.",
  },
  {
    title: "Do I need an account to use Dual Shades?",
    content:
      "Yes, account creation is mandatory to use Dual Shades, but no payment details are required for the free tier.",
  },
  {
    title: "What is included in the Starter Plan?",
    content:
      "The Starter Plan is free and gives you 2 credits per month, perfect for occasional use. You can upgrade to a paid plan for unlimited credits.",
  },
  {
    title: "What is the difference between the Unlimited and Forever plans?",
    content:
      "The Unlimited Plan gives you unlimited credits on a monthly basis, while the Forever Plan offers lifetime access for a one-time fee.",
  },
  {
    title: "What file formats does Dual Shades support?",
    content:
      "Dual Shades supports popular image formats such as JPEG, JPG, PNG, and WEBP.",
  },
  {
    title: "How can I save and share my edited photos?",
    content:
      "You can download your edited photos in high resolution with a single click.",
  },
  {
    title: "How do I cancel my subscription?",
    content:
      "You can cancel your subscription at any time through your account settings, and you will not be charged for the next billing cycle.",
  },
  {
    title: "I have another question",
    content:
      "If you have any other questions, feel free to contact us at <a href='mailto:contact@dual-shades.com'>contact@dual-shades.com</a>. We're here to help!",
  },
];
export default function FAQ() {
  return (
    <StyledSection id="faq">
      <Container>
        <Header>
          <Heading>Frequently Asked Questions</Heading>
        </Header>
        <InnerContainer>
          <Accordion items={faqs} />
        </InnerContainer>
      </Container>
    </StyledSection>
  );
}
