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

const TOS = () => {
  return (
    <ThemeWrapper>
      <Main>
        <Container>
          <Link href="/">Back</Link>
          <Heading>Terms and Conditions for Dual Shades</Heading>

          <Content>
            <p>
              <strong>Effective Date</strong>: December 11, 2024
            </p>
            <p>
              Welcome to Dual Shades ("we," "our," "us"). By accessing or using
              our website{" "}
              <Link href="https://dual-shades.com">dual-shades.com</Link>{" "}
              ("Website") and services, you agree to the following terms and
              conditions. Please read them carefully.
            </p>
            <hr />
            <ol>
              <li>
                <h2>Services</h2>
                <p>
                  Dual Shades is a photo editing software that transforms images
                  by keeping the subject colored while changing the background
                  to black and white. Our services are available via
                  subscription or a one-time payment for lifetime access.
                </p>
              </li>
              <li>
                <h2>User Accounts</h2>
                <p>
                  To use our services, you must provide accurate and complete
                  information, including your name, email, and payment details.
                  By registering, you agree to:
                </p>
                <ul>
                  <li>Maintain the security of your account.</li>
                  <li>
                    Accept responsibility for all activities that occur under
                    your account.
                  </li>
                </ul>
              </li>
              <li>
                <h2>Subscriptions and Payments</h2>
                <p>
                  Users can choose between monthly subscriptions or a one-time
                  payment for lifetime access. All payments are non-refundable
                  unless otherwise stated.
                </p>
              </li>
              <li>
                <h2>Data Collection</h2>
                <p>We collect the following data:</p>
                <ul>
                  <li>
                    <strong>Personal Data</strong>: Name, email, and payment
                    information.
                  </li>{" "}
                  <li>
                    <strong>Non-Personal Data</strong>: Web cookies for
                    improving user experience. For more details, see our{" "}
                    <Link href="https://dual-shades.com/privacy-policy">
                      Privacy Policy
                    </Link>
                    .
                  </li>
                </ul>
              </li>
              <li>
                <h2>Intellectual Property</h2>
                <p>
                  All content and software provided by Dual Shades are protected
                  by intellectual property laws. Users may not copy, modify, or
                  distribute our content without prior written permission.
                </p>
              </li>
              <li>
                <h2>Termination</h2>
                <p>
                  We reserve the right to terminate or suspend access to our
                  services at our discretion, with or without notice, for
                  violations of these Terms.
                </p>
              </li>
              <li>
                <h2>Updates to the Terms</h2>
                <p>
                  We may update these Terms from time to time. Users will be
                  notified via email of any significant changes. Continued use
                  of our services after updates signifies your acceptance of the
                  revised Terms.
                </p>
              </li>
              <li>
                <h2>Governing Law</h2>
                <p>
                  These Terms are governed by and construed in accordance with
                  the laws of India. Any disputes will be resolved in the courts
                  of India.
                </p>
              </li>
              <li>
                <h2>Prohibited Use</h2>
                <p>
                  You agree not to use our services for any unlawful or
                  prohibited purposes, including but not limited to:
                </p>
                <ul>
                  <li>Violating any applicable laws or regulations.</li>
                  <li>
                    Uploading or sharing content that is offensive, obscene, or
                    infringes on the rights of others.
                  </li>
                  <li>
                    Attempting to gain unauthorized access to our systems or
                    other user accounts.
                  </li>
                  <li>
                    Disrupting the integrity or performance of our services.
                  </li>
                </ul>
              </li>
              <li>
                <h2>Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Dual Shades shall not
                  be liable for any direct, indirect, incidental, special, or
                  consequential damages arising from the use or inability to use
                  our services, even if advised of the possibility of such
                  damages. Your sole remedy is to discontinue the use of our
                  services.
                </p>
              </li>
              <li>
                <h2>Contact Information</h2>
                <p>
                  If you have questions or concerns, contact us at{" "}
                  <Link href="mailto:contact@dual-shades.com">
                    contact@dual-shades.com
                  </Link>
                  .
                </p>
              </li>
            </ol>
            <hr />
            <p>Thank you for using Dual Shades!</p>
          </Content>
        </Container>
      </Main>
    </ThemeWrapper>
  );
};

export default TOS;
