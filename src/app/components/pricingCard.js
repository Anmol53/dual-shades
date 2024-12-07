import styled from "styled-components";
import { Cross, Tick } from "@/components/svg";

const Card = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.background1};
  padding: ${({ $style }) => ($style === "shrinked" ? "1rem" : "2rem")};
  gap: ${({ $style }) => ($style === "shrinked" ? "0.5rem" : "3rem")};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $style }) => ($style === "shrinked" ? "0.25rem" : "1rem")};
`;

const Heading = styled.h3`
  font-weight: 800;
  font-size: 1.25rem;
  padding-top: 0.5rem;
  color: ${({ theme }) => theme.accentColor};
  span {
    font-weight: 400;
    font-size: 1rem;
  }
`;

const Subheading = styled.p`
  max-width: 32rem;
  font-size: 1.125rem;
  line-height: 1.625;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
`;

const AnchorPrice = styled.span`
  text-decoration: line-through;
`;

const Price = styled.span`
  font-weight: 800;
  font-size: 2.5rem;
  line-height: 1.1;
  background: ${({ theme }) => theme.accentColor};
  background: linear-gradient(270deg, #25b38b, #3ca3b7);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Currency = styled.span`
  align-self: end;
  font-size: 0.75rem;
  padding-bottom: 0.25rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.6;
`;

const FeatureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .unavailable {
    opacity: 0.5;
  }
`;

const FeatureListItem = styled.li`
  display: grid;
  grid-template-columns: 1rem 1fr;
  align-items: center;
  gap: 0.5rem;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.5rem;
  p {
    font-size: 0.75rem;
    font-weight: 600;
  }
`;

export default function PricingCard({
  label,
  description,
  price,
  anchorPrice,
  currency,
  cta,
  availableFeatures,
  unavailableFeatures,
  footer,
  style,
  active,
}) {
  return (
    <Card $style={style} $active={active}>
      <Header $style={style}>
        <Heading>
          {label}
          {active && <span> (current plan)</span>}
        </Heading>
        <Subheading>{description}</Subheading>
      </Header>

      <PriceContainer>
        {anchorPrice && <AnchorPrice>{anchorPrice}</AnchorPrice>}
        <Price>{price}</Price>
        <Currency>{currency}</Currency>
      </PriceContainer>
      {(availableFeatures || unavailableFeatures) && (
        <FeatureList>
          {availableFeatures &&
            availableFeatures.map((feature, idx) => (
              <FeatureListItem key={`${label}_feature_${idx}`}>
                <Tick color={"green"} />
                <span>{feature}</span>
              </FeatureListItem>
            ))}
          {unavailableFeatures &&
            unavailableFeatures.map((feature, idx) => (
              <FeatureListItem
                key={`${label}_unavailable_feature_${idx}`}
                className="unavailable"
              >
                <Cross color={"red"} />
                <span>{feature}</span>
              </FeatureListItem>
            ))}
        </FeatureList>
      )}
      <Footer>
        {cta}
        <p>{footer}</p>
      </Footer>
    </Card>
  );
}
