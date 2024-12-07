"use client";

import { useSession, signOut } from "next-auth/react";
import Button from "@/components/transparentButton";
import PricingCard from "@/app/components/pricingCard";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";
import CheckoutButton from "@/components/checkoutButton";

const Header = styled.div`
  a {
    color: inherit;
    text-decoration: underline;
    font-weight: 600;
  }
`;

const PricingContainer = styled.div`
  display: grid;
  gap: 1rem;
`;

const BorderedContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.accentColor};
  padding: 1.5rem 1rem;
  position: relative;
  background: inherit;
  border-radius: 0.5rem;

  h1 {
    border-radius: 0.5rem;
    position: absolute;
    top: -0.5rem;
    background-color: ${({ theme }) => theme.accentColor};
    padding: 0 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }
`;

export default function Account() {
  const { data: session } = useSession();
  const [currentPlan, setCurrentPlan] = useState({});
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    fetch("/api/plans/active")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setCurrentPlan(
          res.data.filter((plan) => plan.plan_id === session.user.plan_id)[0]
        );
        setUpgrades(
          res.data.filter((plan) => plan.plan_id > session.user.plan_id)
        );
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      {currentPlan.plan_id >= 100 ? (
        <Header>
          Hello {session.user.name}, Enjoy exploring your{" "}
          <strong>Dual Shades Pro</strong>. If you need help, we are just an
          email away at{" "}
          <Link href="mailto:help@dualshades.com">help@dualshades.com</Link>
        </Header>
      ) : (
        <Header>
          Hi {session.user.name}, you have{" "}
          <strong>{session.user.credits} credits</strong> remaining. Upgrade
          your plan today to unlock <strong>unlimited access</strong>!
        </Header>
      )}
      {upgrades.length > 0 && (
        <BorderedContainer>
          <h1>Upgrades</h1>
          <PricingContainer>
            {upgrades.map((plan) => (
              <PricingCard
                key={plan._id}
                label={plan.name}
                description={plan.small_description}
                price={plan.price}
                anchorPrice={plan.anchor_price}
                currency={plan.currency}
                footer={plan.footer}
                style={"shrinked"}
                cta={<CheckoutButton label={"Get It Now"} />}
              />
            ))}
          </PricingContainer>
        </BorderedContainer>
      )}
      <Button onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
        Sign out
      </Button>
    </>
  );
}
