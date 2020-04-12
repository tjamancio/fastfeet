import React, { useState } from 'react';
import { StatusBar, Image } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/fastfeet-logo.png';
import Button from '~/components/Button';
import { signInRequest } from '~/store/modules/auth/duck';
import { colors } from '~/styles';

import { Container, Form, Input } from './styles';

export default function Signin() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [email, setEmail] = useState('');

  function handleSubmit() {
    dispatch(signInRequest(email));
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Container>
        <Image source={logo} style={{ tintColor: colors.white }} />
        <Form>
          <Input
            keyboardType="email-address"
            placeholder="Informe seu ID de cadastro"
            autoFocus
            autoCapitalize="none"
            returnKeyType="send"
            onChangeText={setEmail}
            onSubmitEditing={handleSubmit}
          />
          <Button
            loading={loading}
            background={colors.green}
            onPress={handleSubmit}>
            Entrar no sistema
          </Button>
        </Form>
      </Container>
    </>
  );
}
