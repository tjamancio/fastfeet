import React from 'react';
import { StatusBar } from 'react-native';

import { parseISO, format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';

import Button from '~/components/Button';
import { signOut } from '~/store/modules/auth/duck';
import { colors } from '~/styles';

import {
  Container,
  Avatar,
  Info,
  InfoLabel,
  InfoValue,
  InfoContainer,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);

  function handleSignOutClick() {
    dispatch(signOut());
  }

  return (
    <>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <Container>
        <Avatar source={{ uri: user.avatar.url }} />
        <InfoContainer>
          <Info>
            <InfoLabel>Nome completo</InfoLabel>
            <InfoValue>{user.name}</InfoValue>
          </Info>
          <Info hasMargin>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{user.email}</InfoValue>
          </Info>
          <Info>
            <InfoLabel>Data de cadastro</InfoLabel>
            <InfoValue>
              {format(parseISO(user.created_at), 'dd/MM/yyyy')}
            </InfoValue>
          </Info>
        </InfoContainer>

        <Button background={colors.red} onPress={handleSignOutClick}>
          Logout
        </Button>
      </Container>
    </>
  );
}
