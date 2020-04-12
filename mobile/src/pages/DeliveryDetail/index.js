import React from 'react';
import { StatusBar, View } from 'react-native';

import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import { colors } from '~/styles';

import {
  Box,
  BoxHeader,
  BoxHeaderText,
  Info,
  InfoLabel,
  InfoValue,
  InlineInfo,
  BoxOptions,
  BoxOption,
  BoxOptionText,
} from './styles';

export default function DeliveryDetail({ route, navigation }) {
  const { delivery } = route.params;
  const { recipient } = delivery;

  function handleNewDeliveryProblemClick(_delivery) {
    if (!delivery.end_date) {
      navigation.navigate('NewDeliveryProblem', { delivery: _delivery });
    }
  }

  function handleDeliveryProblemsClick(_delivery) {
    navigation.navigate('DeliveryProblems', { delivery: _delivery });
  }

  function handleConfirmDeliveryClick(_delivery) {
    if (!delivery.end_date) {
      navigation.navigate('ConfirmDelivery', { delivery: _delivery });
    }
  }

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Background>
        <Box>
          <BoxHeader>
            <Icon name="local-shipping" color={colors.primary} size={20} />
            <BoxHeaderText>Informações da entrega</BoxHeaderText>
          </BoxHeader>
          <Info hasMargin>
            <InfoLabel>Destinatário</InfoLabel>
            <InfoValue>{recipient.name}</InfoValue>
          </Info>
          <Info hasMargin>
            <InfoLabel>Endereço de entrega</InfoLabel>
            <InfoValue>
              {recipient.street}, {recipient.number}, {recipient.city} -{' '}
              {recipient.state}, {recipient.postalcode}
            </InfoValue>
          </Info>
          <Info>
            <InfoLabel>Produto</InfoLabel>
            <InfoValue>{delivery.product}</InfoValue>
          </Info>
        </Box>

        <Box>
          <BoxHeader>
            <Icon name="local-shipping" color={colors.primary} size={20} />
            <BoxHeaderText>Situação da entrega</BoxHeaderText>
          </BoxHeader>
          <Info hasMargin>
            <InfoLabel>Status</InfoLabel>
            <InfoValue>{delivery.end_date ? 'Entregue' : 'Pendente'}</InfoValue>
          </Info>
          <InlineInfo>
            <View>
              <InfoLabel>Data de Retirada</InfoLabel>
              <InfoValue>
                {delivery.start_date
                  ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
                  : '--/--/--'}
              </InfoValue>
            </View>
            <View>
              <InfoLabel>Data de Entrega</InfoLabel>
              <InfoValue>
                {delivery.end_date
                  ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
                  : '--/--/--'}
              </InfoValue>
            </View>
          </InlineInfo>
        </Box>

        <BoxOptions>
          <BoxOption onPress={() => handleNewDeliveryProblemClick(delivery)}>
            <Icon name="highlight-off" color={colors.red} size={25} />
            <BoxOptionText>Informar Problema</BoxOptionText>
          </BoxOption>
          <BoxOption
            hasBorder
            onPress={() => handleDeliveryProblemsClick(delivery)}>
            <Icon name="info-outline" color={colors.gold} size={25} />
            <BoxOptionText>Visualizar Problema</BoxOptionText>
          </BoxOption>
          <BoxOption onPress={() => handleConfirmDeliveryClick(delivery)}>
            <Icon name="alarm-on" color={colors.primary} size={25} />
            <BoxOptionText>Confirmar Entrega</BoxOptionText>
          </BoxOption>
        </BoxOptions>
      </Background>
    </>
  );
}

DeliveryDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery: PropTypes.shape({
        product: PropTypes.string,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        recipient: PropTypes.shape({
          name: PropTypes.string,
          street: PropTypes.string,
          number: PropTypes.number,
          city: PropTypes.string,
          state: PropTypes.string,
          postalcode: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
