import 'react-native-gesture-handler';
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import ConfirmDelivery from './pages/ConfirmDelivery';
import Deliveries from './pages/Deliveries';
import DeliveryDetail from './pages/DeliveryDetail';
import DeliveryProblems from './pages/DeliveryProblems';
import NewDeliveryProblem from './pages/NewDeliveryProblem';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import { navigationRef } from './services/RootNavigation';
import { colors } from './styles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DeliveryTab = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Deliveries"
      component={Deliveries}
      options={{
        headerShown: false,
        tabBarVisible: false,
      }}
    />
    <Stack.Screen
      name="DeliveryDetail"
      component={DeliveryDetail}
      options={{
        title: 'Detalhes da encomenda',
        headerTransparent: true,
        headerTintColor: colors.white,
      }}
    />
    <Stack.Screen
      name="NewDeliveryProblem"
      component={NewDeliveryProblem}
      options={{
        title: 'Informar Problema',
        headerTransparent: true,
        headerTintColor: colors.white,
      }}
    />
    <Stack.Screen
      name="DeliveryProblems"
      component={DeliveryProblems}
      options={{
        title: 'Visualizar Problemas',
        headerTransparent: true,
        headerTintColor: colors.white,
      }}
    />
    <Stack.Screen
      name="ConfirmDelivery"
      component={ConfirmDelivery}
      options={{
        title: 'Confirmar entrega',
        headerTransparent: true,
        headerTintColor: colors.white,
      }}
    />
  </Stack.Navigator>
);

export default function Routes() {
  const signed = useSelector((state) => state.auth.signed);
  return (
    <NavigationContainer ref={navigationRef}>
      {!signed ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          tabBarOptions={{
            drawUnderNavBar: false,
            activeTintColor: colors.primary,
            style: {
              alignItems: 'center',
            },
            tabStyle: {
              paddingVertical: 5,
            },
          }}>
          <Stack.Screen
            name="Dashboard"
            component={DeliveryTab}
            options={{
              title: 'Entregas',
              // eslint-disable-next-line react/prop-types
              tabBarIcon: ({ color }) => (
                <Icon name="menu" color={color} size={20} />
              ),
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: 'Meu Perfil',
              // eslint-disable-next-line react/prop-types
              tabBarIcon: ({ color }) => (
                <Icon name="account-circle" color={color} size={20} />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
