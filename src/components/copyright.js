import styled, { keyframes } from "styled-components";

const CopyrightContainer = styled.div`
  height: auto;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: rgb(130, 130, 130);
  line-height: 2rem;
  font-size: 0.7rem;
  box-sizing: border-box;
  padding: 0.5rem;
  a {
    text-decoration: none;
    font-weight: 700;
  }
`;

const bgcolor = keyframes`
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
`;

const ColoredText = styled.span`
  white-space: nowrap;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 500% 500%;
  -webkit-animation: ${bgcolor} 5s ease infinite;
  -moz-animation: ${bgcolor} 5s ease infinite;
  animation: ${bgcolor} 5s ease infinite;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

/**
 * This function returns a React component that displays a copyright notice with a link to the developer's website.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.appName - The name of the application.
 *
 * @returns {JSX.Element} - A React component displaying the copyright notice.
 */
export default function Copyright({ appName }) {
  return (
    <CopyrightContainer>
      <p>
        Copyright &copy; {appName} {new Date().getFullYear()} | This website is
        developed by{" "}
        <a href="https://www.anmolagrawal.dev">
          <ColoredText>Anmol Agrawal</ColoredText>
        </a>
      </p>
    </CopyrightContainer>
  );
}
