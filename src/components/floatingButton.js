import styled from "styled-components";
import { Tooltip } from "react-tooltip";

const Container = styled.div`
  position: relative;
  background-color: #ff000080;
`;

const StyledFloatingButton = styled.div`
  position: absolute;
  top: ${({ $floatOut }) => ($floatOut ? "-" : "")}0.5rem;
  right: ${({ $floatOut }) => ($floatOut ? "-" : "")}0.5rem;
  border-radius: 50%;
  height: 1.5rem;
  width: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.75rem;
  background: #ccccccaa;
  text-align: center;
  box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.25),
    -1px -1px 6px 2px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  transition: 0.4s;
  transform: scale(1.2, 1.2);
  z-index: 1;

  i {
    color: #212121;
  }

  &:hover {
    transform: scale(1.5, 1.5);
    box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.25),
      -1px -1px 6px 3px rgba(0, 0, 0, 0.22);
  }
`;

/**
 * FloatingButton is a reusable component that renders a floating button on top right corner of component.
 *
 * @param {Object} props - The properties passed to the FloatingButton component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the FloatingButton.
 * @param {boolean} [props.$floatOut=false] - A flag indicating whether the FloatingButton should float out or not.
 * @param {string} [props.title] - The title attribute for the FloatingButton.
 *
 * @returns {React.ReactElement} - The rendered FloatingButton component.
 */
export default function FloatingButton({
  children,
  $floatOut = false,
  dataTooltipId,
  dataTooltipContent,
}) {
  return (
    <Container>
      <StyledFloatingButton
        $floatOut={$floatOut}
        data-tooltip-id={dataTooltipId}
        data-tooltip-content={dataTooltipContent}
      >
        {children}
      </StyledFloatingButton>
      <div style={{ fontSize: "0.75rem" }}>
        <Tooltip id={dataTooltipId} place="bottom" />
      </div>
    </Container>
  );
}
