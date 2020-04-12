import styled from 'styled-components/native';

import { metrics, colors } from '~/styles';

export const Container = styled.View`
  padding: ${metrics.basePadding}px ${metrics.basePadding}px 0
    ${metrics.basePadding}px;
  background: ${colors.white};
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const User = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
  margin-right: ${metrics.baseMargin}px;
`;

export const Welcome = styled.Text`
  color: ${colors.grayDark};
`;

export const Name = styled.Text`
  color: ${colors.dark};
  font-size: 22px;
  font-weight: bold;
  max-width: ${metrics.screenWidth / 2}px;
`;

export const DeliveryHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${metrics.baseMargin * 2}px;
`;

export const DeliveryHeaderText = styled.Text`
  color: ${colors.dark};
  font-size: 22px;
  font-weight: bold;
`;

export const DeliveryHeaderStatus = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DeliveryHeaderStatusText = styled.Text`
  color: ${({ active }) => (active ? colors.primary : colors.gray)};
  /* text-decoration-line: ${({ active }) =>
    active ? 'underline' : 'none'}; */
  margin-right: ${({ margin }) => (margin ? '10px' : '0px')};
  padding-bottom: 2px;
  border-bottom-width: ${({ active }) => (active ? '1px' : 0)};;
  border-bottom-color: ${colors.primary};
`;
