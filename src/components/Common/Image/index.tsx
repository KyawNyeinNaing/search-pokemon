import Image from "next/image";
import styled, { css } from "styled-components";
import { Loading } from "./svg";

type Props = {
  sx?: any;
  src?: string;
  type: string;
  bgimg?: boolean;
  className?: string;
  onLoadImage?: boolean;
  name?: string;
  width?: number;
  height?: number;
  color?: string;
  fillColor?: string;
  alt?: string;
};

const ImageWrap: React.FC<Props> = (props: Props) => {
  const obj = props?.sx;
  const entries: any = obj && Object.entries(obj);

  return (
    <Wrap entries={entries}>
      {!props.bgimg ? (
        <Image
          className={props.className}
          src={props.src || ""}
          alt={(props.name || props.src) ?? ""}
          width={props.width}
          height={props.height}
        />
      ) : (
        <BGImg src={props.src} width={props.width} height={props.height} />
      )}
    </Wrap>
  );
};

const ImageComponent: React.FC<Props> = (props: Props) => {
  switch (props.type) {
    case "image":
      return <ImageWrap {...props} />;

    case "loading":
      return <Loading {...props} />;

    default:
      return null;
  }
};

export default ImageComponent;

const Wrap = styled.div<{
  width?: string;
  height?: string;
  entries?: any;
  fullWidth?: boolean;
}>`
  width: ${(props) => props.width && props.width + "px"};
  height: ${(props) => props.height && props.height + "px"};
  ${(props) =>
    props?.entries &&
    props.entries.map(
      ([key, val]: any) => css`
        ${key}: ${val};
      `
    )}
  img,
  svg {
    width: ${(props) => props.width && props.width + "px"};
    height: ${(props) => props.width && props.height + "px"};
    color: ${(props) => (props.color ? props.color : "black")};
    ${({ fullWidth }) =>
      fullWidth &&
      css`
        width: 100%;
        height: 100%;
      `}
  }
`;

const BGImg = styled.div<{ width?: number; height?: number; src?: string }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background: url(${(props) => props.src}) no-repeat center / cover;
`;
