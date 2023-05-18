import styled, { css } from 'styled-components';
import { colors, font } from '@/components/Constant';
import { ColorType } from '@/types/Constant';

type Props = {
  color: string | undefined;
  bg?: string;
  mb?: string;
  link?: boolean;
  size: string;
  weight: string;
};

/**
 * @param color Font color
 */

export const Color = styled.p<Props>`
  ${({ color }) => {
    const split = color?.split('-') as string[];

    let pickColor;
    pickColor = colors[color as keyof ColorType];
    if (!split[1]) {
      pickColor = colors[color as keyof ColorType];
    } else {
      pickColor = colors[split[0]][split[1]];
    }

    return (
      color &&
      css`
        color: ${pickColor};
      `
    );
  }}
`;

/**
 * @param color Font color
 * @param size Font size
 * @param weight Font weight
 * @param link Link
 */

export const Text = styled(Color)`
  font-size: ${font.fontSize.sm}px;
  font-weight: ${font.fontWeight.md};
  transition: color .2s ease;
  ${({ link }) =>
    link &&
    css`
      &:hover {
        color: ${props => props.theme.primary};
      }
    `}
  ${({ size }) =>
    size &&
    css`
      font-size: ${font.fontSize[size]}px;
    `}
  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${font.fontWeight[weight]};
    `};
`;

/**
 * @param color Font color
 * @param size Font size
 * @param weight Font weight
 * @param link Link
 */

export const Title = styled(Text)`
  font-size: ${font.fontSize.md}px;
  margin-bottom: ${props => (props.mb ? props.mb : '20')}px;
  ${({ size }) =>
    size &&
    css`
      font-size: ${font.fontSize[size]}px;
    `}
  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${font.fontWeight[weight]};
    `}
`;

/**
 * @param width Element width
 * @param height Element height
 */

/**
 * @param bg Background color
 */

export const View = styled(Text)<{ width?: string; height?: string; as: string }>`
  width: ${props => (props.width ? `${props.width}px` : '100%')};
  height: ${props => props.height && `${props.height}px`};
  background-color: ${props => props.bg};
`;
