import React, { useState, useEffect } from 'react';

import { Form } from '@rocketseat/unform';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import api from '~/services/api';
import history from '~/services/history';
import {
  Title,
  FlexRow,
  FormContent,
  Buttons,
  Input,
} from '~/styles/components';

import { Container, FormGroup, FormGroupItem } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  street: Yup.string().required('Rua é obrigatório'),
  number: Yup.string().required('Número é obrigatório'),
  complement: Yup.string().required('Complemento é obrigatório'),
  city: Yup.string().required('Cidade é obrigatório'),
  state: Yup.string().required('Estado é obrigatório'),
  postalcode: Yup.string()
    .length(8, 'CEP deve ter 8 dígitos')
    .required('CEP é obrigatório'),
});

export default function Recipient() {
  const { id } = useParams();

  const [recipient, setRecipient] = useState(null);

  useEffect(() => {
    async function load() {
      if (id) {
        const { data } = await api.get(`/recipients/${id}`);
        setRecipient(data);
      }
    }

    load();
  }, [id]);

  async function handleSubmit(data) {
    try {
      if (id) {
        await api.put(`/recipients/${id}`, data);
        toast.success('Destinatário atualizado com sucesso!');
      } else {
        await api.post('/recipients', data);
        toast.success('Destinatário cadastrado com sucesso!');
      }
      history.push('/recipients');
    } catch (err) {
      toast.error('Erro ao salvar Destinatário');
    }
  }
  return (
    <Container>
      <Form schema={schema} initialData={recipient} onSubmit={handleSubmit}>
        <FlexRow>
          <Title>Cadastro de entregadores</Title>
          <Buttons>
            <ButtonBack />
            <ButtonSave />
          </Buttons>
        </FlexRow>
        <FormContent>
          <label>Nome</label>
          <Input name="name" />

          <FormGroup>
            <FormGroupItem width="50%">
              <label>Rua</label>
              <Input name="street" />
            </FormGroupItem>
            <FormGroupItem width="20%">
              <label>Número</label>
              <Input name="number" />
            </FormGroupItem>
            <FormGroupItem width="20%">
              <label>Complemento</label>
              <Input name="complement" />
            </FormGroupItem>
          </FormGroup>

          <FormGroup>
            <FormGroupItem width="30%">
              <label>Cidade</label>
              <Input name="city" />
            </FormGroupItem>
            <FormGroupItem width="30%">
              <label>Estado</label>
              <Input name="state" />
            </FormGroupItem>
            <FormGroupItem width="30%">
              <label>CEP</label>
              <Input name="postalcode" />
            </FormGroupItem>
          </FormGroup>
        </FormContent>
      </Form>
    </Container>
  );
}
