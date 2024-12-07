import Copyright from "@/components/copyright";
import Link from "next/link";
import styled from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  background-color: #000000ee;
  color: #ccc;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

const FooterMain = styled.div`
  padding: 5rem 10rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10rem;
  @media screen and (max-width: 768px) {
    padding: 2rem;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  p {
    font-size: 0.75rem;
    line-height: 1.5;
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StyledSubsection = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 12rem;
  gap: 0.25rem;
  font-size: 0.75rem;
  h3 {
    padding: 0.5rem 0;
    text-transform: uppercase;
    opacity: 0.4;
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  a {
    text-decoration: none;
    color: #ffffff;
  }
  a:hover {
    border-bottom: 1px solid #ffffff;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <FooterMain>
        <Brand>
          <h3>Dual Shades</h3>
          <p>
            Transform your photos with Dual Shades — Keep your subject in full
            color and turn the background to black and white effortlessly. Edit,
            save, and share with ease.
          </p>
        </Brand>
        <Links>
          <StyledSubsection>
            <h3>Links</h3>
            <ul>
              <li>
                <Link href={"#pricing"}>Pricing</Link>
              </li>
              <li>
                <Link href={"#faq"}>FAQ</Link>
              </li>
            </ul>
          </StyledSubsection>

          <StyledSubsection>
            <h3>Legal</h3>
            <ul>
              <li>
                <Link href={"/privacy-policy"}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={"/tos"}>Terms of Services</Link>
              </li>
              <li>
                <Link href={"/license"}>License</Link>
              </li>
            </ul>
          </StyledSubsection>
          <StyledSubsection>
            <h3>Tools</h3>
            <ul>
              <li>
                <Link
                  href={"https://www.anmolagrawal.dev/gradient-generator"}
                  target="_blank"
                >
                  Gradient Generator
                </Link>
              </li>
            </ul>
          </StyledSubsection>
        </Links>
      </FooterMain>
      <Copyright appName="Dual Shades" />
    </StyledFooter>
  );
}
