import styled from "styled-components";

const StyledButton = styled.button`
  border: 1px solid
    ${({ $color, theme }) => ($color ? $color : theme.accentColor)};
  background-color: ${({ $color, theme }) =>
    $color ? $color : theme.accentColor}cc;
  cursor: pointer;
  padding: 1rem 2rem;
  border-radius: 10px;
  text-align: center;
  color: ${({ theme }) => theme.textOnAccent};
  font-size: 1rem;
  font-weight: bold;
`;

/**
 * A reusable button component with customizable styles and behavior.
 *
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {function} props.onClick - The callback function to be executed when the button is clicked.
 * @param {string} [props.type="button"] - The type of the button (e.g., "button", "submit", "reset").
 * @param {string} [props.color] - The background color of the button.
 *
 * @returns {React.ReactElement} - The rendered button component.
 */
export default function Button({ children, onClick, type = "button", color }) {
  return (
    <StyledButton type={type} onClick={onClick} $color={color}>
      {children}
    </StyledButton>
  );
}
