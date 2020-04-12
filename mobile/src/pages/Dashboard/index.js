import React from 'react';
import { View } from 'react-native';

import { useDispatch } from 'react-redux';

import Button from '~/components/Button';
import { signOut } from '~/store/modules/auth/duck';

// import { Container } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <View>
      <Button background="#f00" onPress={handleSignOut}>
        Sair
      </Button>
    </View>
  );
}
