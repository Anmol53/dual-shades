import styled from "styled-components";
import CheckoutButton from "@/components/checkoutButton";
import PricingCard from "./pricingCard";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const StyledSection = styled.section`
  background-color: ${({ theme }) => theme.background2};
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

const Subheading = styled.h3`
  max-width: 40rem;
  font-size: 1.75rem;
  line-height: 1.625;
  @media screen and (max-width: 768px) {
    line-height: 1.25;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 6rem;
  gap: 3rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
  }
`;

export default function Pricing() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("/api/plans/active")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPlans(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <StyledSection id="pricing">
      <Container>
        <Header>
          <Heading>Simple Plans for Everyone</Heading>
          <Subheading>
            Simple pricing, no hidden fees—pay for what you need, when you need
            it.
          </Subheading>
        </Header>
        <InnerContainer>
          {plans.map((plan) => (
            <PricingCard
              key={plan._id}
              label={plan.name}
              description={plan.description}
              price={plan.price}
              anchorPrice={plan.anchor_price}
              currency={plan.currency}
              footer={plan.footer}
              cta={
                plan.type.toLowerCase() === "free" ? (
                  <Button
                    onClick={() => {
                      redirect("/dashboard");
                    }}
                  >
                    Try Now
                  </Button>
                ) : (
                  <CheckoutButton label={"Get It Now"} />
                )
              }
            />
          ))}
        </InnerContainer>
      </Container>
    </StyledSection>
  );
}
