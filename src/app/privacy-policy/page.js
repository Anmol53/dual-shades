"use client";
import Link from "next/link";
import styled from "styled-components";
import dynamic from "next/dynamic";

const ThemeWrapper = dynamic(
  () => import("@/components/wrappers/ThemeWrapper"),
  { ssr: false }
);
const Main = styled.main`
  background-color: ${({ theme }) => theme.background2};
  color: ${({ theme }) => theme.text};
  width: 100vw;
  display: grid;
  place-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 6rem 2rem 8rem;
  width: 90vw;
  max-width: 40rem;
  a {
    color: ${({ theme }) => theme.accentColor};
    text-wrap: nowrap;
  }
`;

const Heading = styled.h1`
  font-weight: 800;
  font-size: 1rem;
  line-height: 1.1;
  padding-top: 0.5rem;
  color: ${({ theme }) => theme.accentColor};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ol {
    padding: 1rem;
    li {
      padding: 1rem 0;
    }
  }
  h2 {
    font-size: 1rem;
    padding: 0.5rem 0;
  }
  p {
    font-size: 1rem;
    line-height: 1.625;
  }
  ul {
    list-style-position: outside;
    list-style-type: disc;
  }
  hr {
    margin: 1rem 0;
  }
`;

const PrivacyPolicy = () => {
  return (
    <ThemeWrapper>
      <Main>
        <Container>
          <Link href="/">Back</Link>
          <Heading>Privacy Policy for Dual Shades</Heading>

          <Content>
            <p>
              <strong>Effective Date</strong>: December 11, 2024
            </p>
            <p>
              Your privacy is important to us. It is Dual Shades' policy to
              respect your privacy regarding any information we may collect from
              you across our website,{" "}
              <Link href="https://dual-shades.com">dual-shades.com</Link>.
            </p>
            <hr />
            <ol>
              <li>
                <h2>Information We Collect</h2>
                <p>
                  We only ask for personal information when we truly need it to
                  provide our services to you. This includes:
                </p>
                <ul>
                  <li>
                    <strong>Personal Data</strong>: We collect your name, email
                    address, and payment information to process your orders.
                  </li>
                  <li>
                    <strong>Non-Personal Data</strong>: We use cookies to
                    enhance your browsing experience and improve the
                    functionality of our website.
                  </li>
                </ul>
                <p>
                  We collect this information by fair and lawful means, with
                  your knowledge and consent.
                </p>
              </li>
              <li>
                <h2>How We Use Your Information</h2>
                <p>We use the information we collect in the following ways:</p>

                <ul>
                  <li>
                    <strong>Order Processing</strong>: Your personal information
                    (name, email, payment details) is used to process and
                    fulfill your orders.
                  </li>
                  <li>
                    <strong>Improving User Experience</strong>: Non-personal
                    data collected through cookies helps us optimize website
                    performance and functionality.
                  </li>
                </ul>
              </li>
              <li>
                <h2>Payment Processing</h2>
                <p>
                  Payments are securely processed through{" "}
                  <strong>Stripe</strong>, a third-party service. We do not
                  store your payment information on our servers.
                </p>
              </li>
              <li>
                <h2>Data Sharing</h2>
                <p>
                  We do not share your personal or non-personal data with any
                  third parties, except when required by law.
                </p>
              </li>
              <li>
                <h2>Links to External Sites</h2>
                <p>
                  Our website may contain links to external sites that are not
                  operated by us. Please be aware that we have no control over
                  the content and privacy practices of these external sites and
                  cannot accept responsibility for their respective privacy
                  policies.
                </p>
              </li>
              <li>
                <h2>Children’s Privacy</h2>
                <p>
                  We do not knowingly collect or solicit data from children
                  under 13 years of age. Our services are not intended for
                  children.
                </p>
              </li>
              <li>
                <h2>Your Consent</h2>
                <p>
                  By using our website, you consent to our privacy practices and
                  agree to the collection and use of your information as
                  outlined in this policy.
                </p>
              </li>
              <li>
                <h2>Updates to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy periodically. Any changes
                  will be communicated to you via email.
                </p>
              </li>
              <li>
                <h2>Contact Us</h2>
                <p>
                  If you have any questions or concerns about how we handle user
                  data and personal information, please contact us at{" "}
                  <Link href="mailto:contact@dual-shades.com">
                    contact@dual-shades.com
                  </Link>
                </p>
              </li>
            </ol>
            <p>
              By using Dual Shades, you agree to the terms of this Privacy
              Policy. Thank you for trusting us!
            </p>
          </Content>
        </Container>
      </Main>
    </ThemeWrapper>
  );
};

export default PrivacyPolicy;
