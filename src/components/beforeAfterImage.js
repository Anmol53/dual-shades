import styled from "styled-components";

const Container = styled.div`
  width: ${({ $width }) => $width};
  aspect-ratio: 10 / 16;
  position: relative;
  border-radius: 1rem;
  border-width: 0px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.2),
    0 0 15px 5px rgba(100, 100, 100, 0.1);
`;

const ImageContainer = styled.div`
  width: ${({ $width }) => $width};
  position: absolute;
  overflow: hidden;
  img {
    width: ${({ $width }) => $width};
    aspect-ratio: 10 / 16;
    object-fit: cover;
  }
  &:nth-child(2) {
    width: calc(${({ $width }) => $width} / 2);
  }
`;

const Divider = styled.div`
  width: 0.25rem;
  transform: translate(-50%, 0);
  left: 50%;
  top: 0;
  height: 100%;
  background-color: ${({ theme }) => theme.accentColor};
  position: absolute;
  pointer-events: none;
`;

export default function BeforeAfterImage({ children, $width }) {
  if (children.length !== 2) {
    throw new Error("BeforeAfterImage component expects exactly two children");
  }

  const handleSlider = (e) => {
    let posX = e.nativeEvent.offsetX;
    const container = document.querySelector(".container");
    const afterContainer = document.querySelector(".after-container");
    const slider = document.querySelector(".slider");
    if (posX < 50) {
      posX = 0;
    }
    const size = container.offsetWidth;
    if (posX + 50 > size) {
      posX = size;
    }
    console.log();

    afterContainer.style.width = posX + "px";
    slider.style.left = posX + "px";
  };

  return (
    <Container
      className="container"
      onMouseMove={handleSlider}
      $width={$width || "50vw"}
    >
      <ImageContainer $width={$width || "50vw"}>{children[0]}</ImageContainer>
      <ImageContainer $width={$width || "50vw"} className="after-container">
        {children[1]}
      </ImageContainer>
      <Divider className="slider" />
    </Container>
  );
}
