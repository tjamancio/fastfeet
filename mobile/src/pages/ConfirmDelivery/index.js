import React, { createRef, useState } from 'react';
import { Alert } from 'react-native';

import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import Background from '~/components/Background';
import Button from '~/components/Button';
import api from '~/services/api';
import { colors } from '~/styles';

import {
  ButtonContainer,
  Camera,
  CameraContainer,
  Image,
  WatingText,
} from './styles';

export default function ConfirmDelivery({ route, navigation }) {
  let cameraRef = createRef();

  const { delivery } = route.params;
  const user = useSelector((state) => state.user.profile);
  const [signature, setSignature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [takingPicture, setTakingPicture] = useState(false);

  async function takePicture() {
    if (cameraRef && !signature) {
      setTakingPicture(true);
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.takePictureAsync(options);
      setSignature(data);
      setTakingPicture(false);
    } else {
      setSignature(null);
    }
  }

  async function handleSendClick() {
    setLoading(true);
    const imageData = new FormData();
    imageData.append('file', {
      uri: signature.uri,
      type: 'image/jpeg',
      name: `signature.jpg`,
    });

    try {
      const { data } = await api.post('/files', imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await api.put(
        `/deliverymen/${user.id}/deliveries/${delivery.id}/finish`,
        {
          signature_id: data.id,
        }
      );

      Alert.alert('Atenção', 'Encomenda entregada com Sucesso');

      navigation.replace('Deliveries');
    } catch (err) {
      const error =
        err.response.data.error.message ||
        err.response.data.error ||
        'Erro ao salvar mensagem. Tente novamente mais tarde!';
      Alert.alert('Atenção', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Background>
      <CameraContainer
        ref={(ref) => {
          cameraRef = ref;
        }}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permissão para usar camera',
          message: 'Precisamos da sua permissão para usar a camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Camncelar',
        }}>
        {signature && <Image source={{ uri: signature.uri, isStatic: true }} />}
        {takingPicture ? (
          <WatingText>Aguarde...</WatingText>
        ) : (
          <Camera onPress={takePicture}>
            <Icon name="camera-alt" size={26} color={colors.white} />
          </Camera>
        )}
      </CameraContainer>
      <ButtonContainer>
        <Button
          disabled={!signature}
          loading={loading}
          background={colors.primary}
          onPress={handleSendClick}>
          Enviar
        </Button>
      </ButtonContainer>
    </Background>
  );
}

ConfirmDelivery.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};
