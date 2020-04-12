import { RNCamera } from 'react-native-camera';
import styled from 'styled-components/native';

import { metrics, colors } from '~/styles';

export const Camera = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  bottom: 20px;
  right: 0px;
  left: 50%;
  margin-left: -30px;

  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.3);

  align-items: center;
  justify-content: center;
`;

export const WatingText = styled.Text`
  position: absolute;
  bottom: 20px;
  text-align: center;
  color: ${colors.white};
  font-size: 20px;
  align-self: center;
`;

export const CameraContainer = styled(RNCamera)`
  height: ${metrics.screenHeight - 220}px;
`;

export const ButtonContainer = styled.View`
  padding-top: ${metrics.baseMargin * 2}px;
  background: ${colors.white};
`;

export const Image = styled.Image`
  height: ${metrics.screenHeight - 220}px;
`;
