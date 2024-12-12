import styled from "styled-components";

const Container = styled.div`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  position: relative;
`;

const ImageContainer = styled.div`
  width: ${({ $width }) => $width};
  position: absolute;
  overflow: hidden;
  img {
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
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

export default function BeforeAfterImage({ children, $width, $height }) {
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

    afterContainer.style.width = posX + "px";
    slider.style.left = posX + "px";
  };

  return (
    <Container
      className="container"
      onMouseMove={handleSlider}
      $width={$width || "50vw"}
      $height={$height || "80vw"}
    >
      <ImageContainer $width={$width || "50vw"} $height={$height || "80vw"}>
        {children[0]}
      </ImageContainer>
      <ImageContainer
        $width={$width || "50vw"}
        $height={$height || "80vw"}
        className="after-container"
      >
        {children[1]}
      </ImageContainer>
      <Divider className="slider" />
    </Container>
  );
}
