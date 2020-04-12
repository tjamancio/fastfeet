import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import logo from '~/assets/fastfeet-logo.png';
import { signInRequest } from '~/store/modules/auth/duck';
// import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Fastfeet" title="Fastfeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">SEU E-MAIL</label>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="exemplo@email.com"
        />
        <label htmlFor="password">SUA SENHA</label>
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="*********"
        />
        <button type="submit">{loading ? 'Caregando...' : 'Acessar'}</button>
      </Form>
    </>
  );
}
