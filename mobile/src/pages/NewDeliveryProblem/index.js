import React, { useState } from 'react';
import { Alert } from 'react-native';

import PropTypes from 'prop-types';

import Background from '~/components/Background';
import Button from '~/components/Button';
import api from '~/services/api';
import { colors } from '~/styles';

import { Input } from './styles';

export default function NewDeliveryProblem({ route, navigation }) {
  const { delivery } = route.params;
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSendClick() {
    setLoading(true);
    try {
      await api.post(`deliveries/${delivery.id}/problems`, {
        description: problem,
      });
      navigation.goBack();
    } catch (err) {
      const error =
        err.response.data.error ||
        'Erro ao salvar mensagem. Tente novamente mais tarde!';
      Alert.alert('Atenção', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Background>
      <Input
        multiline
        autoFocus
        numberOfLines={10}
        textAlignVertical="top"
        onChangeText={setProblem}
        placeholder="Inclua aqui o problema que ocorreu na entrega"
      />

      <Button
        loading={loading}
        background={colors.primary}
        onPress={handleSendClick}>
        Enviar
      </Button>
    </Background>
  );
}

NewDeliveryProblem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
