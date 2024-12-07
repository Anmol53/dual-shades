import styled from "styled-components";

const StyledButton = styled.button`
  align-self: center;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 10px;
  text-align: center;
  text-transform: uppercase;
  box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.25),
    -1px -1px 6px 2px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  transition: 0.4s;
  color: white;
  transform: scale(1.1, 1.1);
  $:active {
    transform: scale(1, 1);
    box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.25),
      -1px -1px 6px 3px rgba(0, 0, 0, 0.22);
  }
`;

/**
 * A reusable transparent button component with custom styles and event handling.
 *
 * @function Button
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {Function} props.onClick - The event handler for the button's click event.
 * @param {string} [props.type="button"] - The type attribute for the button.
 * @param {Object} [props.style] - Custom styles to be applied to the button.
 * @returns {React.ReactElement} - The rendered button component.
 */
export default function Button({ children, onClick, type = "button", style }) {
  return (
    <StyledButton type={type} onClick={onClick} style={style}>
      {children}
    </StyledButton>
  );
}
