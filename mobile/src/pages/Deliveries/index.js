import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, BackHandler } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/duck';
import { colors } from '~/styles';

import DeliveryList from './DeliveryList';
import {
  Container,
  Avatar,
  Header,
  User,
  Name,
  Welcome,
  DeliveryHeader,
  DeliveryHeaderText,
  DeliveryHeaderStatus,
  DeliveryHeaderStatusText,
} from './styles';

export default function Deliveries() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);

  const [deliveryStatus, setDeliveryStatus] = useState('pendente');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  function handleLogoutClick() {
    dispatch(signOut());
  }

  function handleDeliveryStatusClick(status) {
    setDeliveryStatus(status);
  }
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <Container>
        <Header>
          <User>
            <Avatar source={{ uri: user.avatar.url }} />
            <View>
              <Welcome>Bem vindo de volta,</Welcome>
              <Name numberOfLines={1}>{user.name}</Name>
            </View>
          </User>
          <TouchableOpacity
            hitSlop={{
              top: 5,
              right: 5,
              bottom: 5,
              left: 5,
            }}
            activeOpacity={0.7}
            onPress={handleLogoutClick}>
            <Icon name="exit-to-app" color={colors.red} size={20} />
          </TouchableOpacity>
        </Header>

        <DeliveryHeader>
          <DeliveryHeaderText>Entregas</DeliveryHeaderText>
          <DeliveryHeaderStatus>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleDeliveryStatusClick('pendente')}>
              <DeliveryHeaderStatusText
                margin
                active={deliveryStatus === 'pendente'}>
                Pendentes
              </DeliveryHeaderStatusText>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleDeliveryStatusClick('entregue')}>
              <DeliveryHeaderStatusText active={deliveryStatus !== 'pendente'}>
                Entregues
              </DeliveryHeaderStatusText>
            </TouchableOpacity>
          </DeliveryHeaderStatus>
        </DeliveryHeader>

        <DeliveryList status={deliveryStatus} />
      </Container>
    </>
  );
}
