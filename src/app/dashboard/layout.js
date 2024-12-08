"use client";
import Copyright from "@/components/copyright";
import styled from "styled-components";
import { getRandomGradient } from "@/utils/helper";
import { signIn, useSession } from "next-auth/react";
import PreviewContainer from "./previewContainer";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";

const GradientContainer = styled.div`
  background-color: ${({ $gradient }) => $gradient.backgroundColor};
  background-image: ${({ $gradient }) => $gradient.backgroundImage};
  min-height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 1fr auto;
  overflow-x: hidden;
`;

const Main = styled.main`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 1rem;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  gap: 0.5rem;
  background: linear-gradient(
    210deg,
    rgba(224, 224, 224, 0.3) 0,
    rgba(36, 34, 34, 0.1) 70%
  );
  border-radius: 20px;
  box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 7px rgba(0, 0, 0, 0.22), 3px 3px 10px rgba(0, 0, 0, 0.25);
  flex: 1 1 300px;
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navs = styled.div`
  display: flex;
  font-size: 1.25rem;
  justify-content: space-around;
  gap: 1rem;
  color: white;
  a {
    color: #aaaaaa;
  }
  a.active {
    background: linear-gradient(231deg, #ab8d9b, #edcd04);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const RightContainer = styled.div`
  box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 7px rgba(0, 0, 0, 0.22), 3px 3px 10px rgba(0, 0, 0, 0.25);
  flex: 5 1 500px;
  aspect-ratio: 16/9;
  border-radius: 20px;
  color: white;
`;

const Footer = styled.footer`
  width: 100%;
  background-color: rgb(77, 67, 60, 0.5);
`;

const randomGradient = getRandomGradient();

/**
 * DashboardLayout is a functional component that acts as a layout for the dashboard pages.
 * It handles user authentication, renders the children components, and provides a navbar with navigation links.
 *
 * @param {Object} props - The props object containing the children components to be rendered.
 * @param {React.ReactNode} props.children - The children components to be rendered within the layout.
 *
 * @returns {React.ReactElement} - The DashboardLayout component with the specified children and layout structure.
 */
export default function DashboardLayout({ children }) {
  // Fetch the user session using NextAuth's useSession hook
  const { data: session, status } = useSession();

  const pathname = usePathname();

  // If the session status is loading, display a loading message
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // If the user is not authenticated, redirect them to the sign-in page
  if (!session) {
    signIn(undefined, { callbackUrl: "/dashboard" });
    return null;
  }

  // Render the layout with the children, a random gradient background, and a footer
  return (
    <ThemeWrapper>
      <GradientContainer $gradient={randomGradient}>
        <Main>
          <LeftContainer>
            <Header>
              <h1>Dual Shades</h1>
              <Navs>
                <Link
                  href="/dashboard"
                  className={pathname === "/dashboard" ? "active" : ""}
                >
                  <i
                    className="fa-solid fa-wand-magic-sparkles"
                    data-tooltip-id="generate"
                    data-tooltip-content="Generate image"
                  ></i>
                </Link>
                <Link
                  href="/dashboard/account"
                  className={pathname === "/dashboard/account" ? "active" : ""}
                >
                  <i
                    className="fa-regular fa-circle-user"
                    data-tooltip-id="account-details"
                    data-tooltip-content="Account"
                  ></i>
                </Link>
                <div style={{ fontSize: "0.75rem" }}>
                  <Tooltip id="generate" />
                  <Tooltip id="account-details" />
                </div>
              </Navs>
            </Header>
            {children}
          </LeftContainer>
          <RightContainer>
            <PreviewContainer />
          </RightContainer>
        </Main>
        <Footer>{<Copyright appName="Dual Shades" />}</Footer>
      </GradientContainer>
    </ThemeWrapper>
  );
}
