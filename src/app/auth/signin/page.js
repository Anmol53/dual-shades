"use client";

import { signIn } from "next-auth/react";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  background-image: url("/dual-shades-1733774031163.png");
  background-size: cover;
  background-position: center top;

  @media screen and (max-width: 768px) {
    background-image: none;
    background-color: #161b22;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100vh;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Card = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.background2}bb;
  color: ${({ theme }) => theme.text};
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2);
  border-radius: 0.75rem;
`;

const Logo = styled.img`
  border-radius: 1rem;
  border: 1px solid #666;
  max-width: 6rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  color: #000;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const ButtonDark = styled(Button)`
  background-color: #24292f;
  border-color: rgba(0, 0, 0, 0.1);
  color: #fff;
  &:hover {
    background-color: rgba(36, 41, 47, 0.8);
  }
`;

const Icon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
`;

export default function LoginPage({ searchParams }) {
  const { callbackUrl } = React.use(searchParams);

  return (
    <Container>
      <LeftContainer>
        <Card>
          <Logo src="/icons/apple-icon.png" alt="App Logo" />
          <h2>Dual Shades</h2>
          <p>Sign in to your account</p>
          <Button
            onClick={() =>
              signIn("google", { callbackUrl: callbackUrl || "/" })
            }
          >
            <Icon src="/google.png" alt="Google Logo" />
            Sign in with Google
          </Button>
          <ButtonDark
            onClick={() =>
              signIn("github", { callbackUrl: callbackUrl || "/" })
            }
          >
            <Icon src="/github-mark-white.png" alt="GitHub Logo" />
            Sign in with GitHub
          </ButtonDark>
        </Card>
      </LeftContainer>
    </Container>
  );
}
