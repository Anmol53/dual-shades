import Link from "next/link";
import styled from "styled-components";

const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.accentColor};
  color: ${({ theme }) => theme.textOnAccent};
  a {
    color: inherit;
  }
`;

const StyledHeader = styled.header`
  box-sizing: border-box;
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const Brand = styled.nav`
  font-weight: bold;
  font-size: 1.5rem;
  a {
    text-decoration: none;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  justify-content: space-around;
  a:hover {
    border-bottom: 1px solid ${({ theme }) => theme.textOnAccent};
  }
  @media screen and (max-width: 768px) {
    gap: 1rem;
  }
`;

const Action = styled.div`
  display: flex;
  gap: 1rem;
  a:hover {
    border-bottom: 1px solid ${({ theme }) => theme.textOnAccent};
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default function Header() {

  return (
    <HeaderContainer>
      <StyledHeader>
        <Brand>
          <Link href="/">Dual Shades</Link>
        </Brand>
      </StyledHeader>
    </HeaderContainer>
  );
}
