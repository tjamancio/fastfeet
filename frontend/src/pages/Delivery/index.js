import React, { useState, useEffect, createRef } from 'react';

import { Form } from '@rocketseat/unform';
import { useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
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
  FormGroup,
  FormGroupItem,
  Input,
} from '~/styles/components';

import { Container } from './styles';

const schema = Yup.object().shape({
  product: Yup.string().required('Nome do produto é obrigatório'),
  recipient_id: Yup.string().required('Destinatário é obrigatório'),
  deliveryman_id: Yup.string().required('Entregador é obrigatório'),
});

export default function Delivery() {
  const recipientRef = createRef();
  const { id } = useParams();

  const [delivery, setDelivery] = useState({
    recipient_id: '',
    deliveryman_id: '',
    product: '',
  });

  const [recipientSelected, setRecipientSelected] = useState(null);
  const [deliverymanSelected, setDeliverymanSelected] = useState(null);

  useEffect(() => {
    async function load() {
      if (id) {
        const { data } = await api.get(`/deliveries/${id}`);
        setDelivery(data);
        setRecipientSelected({
          value: data.recipient_id,
          label: data.recipient.name,
        });
        setDeliverymanSelected({
          value: data.deliveryman_id,
          label: data.deliveryman.name,
        });
      }
    }

    load();
  }, [id]);

  function loadRecipients(value) {
    async function load(query) {
      const { data } = await api.get(`/recipients?q=${query}`);

      const options = data.map(item => ({
        value: item.id,
        label: item.name,
      }));

      return options;
    }
    // eslint-disable-next-line no-new
    return new Promise(resolve => {
      resolve(load(value));
    });
  }

  function loadDeliverymen(value) {
    async function load(query) {
      const { data } = await api.get(`/deliverymen?q=${query}`);

      const options = data.map(item => ({
        value: item.id,
        label: item.name,
      }));
      return options;
    }
    // eslint-disable-next-line no-new
    return new Promise(resolve => {
      resolve(load(value));
    });
  }

  function handleRecipientChange(data) {
    setRecipientSelected(data);
    setDelivery({ ...delivery, recipient_id: data.value });
  }

  function handleDeliverymanChange(data) {
    setDeliverymanSelected(data);
    setDelivery({ ...delivery, deliveryman_id: data.value });
  }

  async function handleSubmit(data) {
    try {
      if (id) {
        await api.put(`/deliveries/${id}`, data);
        toast.success('Encomenda atualizado com sucesso!');
      } else {
        await api.post('/deliveries', data);
        toast.success('Encomenda cadastrada com sucesso!');
      }
      history.push('/orders');
    } catch (err) {
      toast.error('Erro ao salvar Encomenda');
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={delivery} onSubmit={handleSubmit}>
        <FlexRow>
          <Title>Cadastro de encomendas</Title>
          <Buttons>
            <ButtonBack />
            <ButtonSave />
          </Buttons>
        </FlexRow>
        <FormContent>
          <FormGroup>
            <FormGroupItem width="45%">
              <label>Destinatário</label>
              <AsyncSelect
                cacheOptions
                loadOptions={loadRecipients}
                defaultOptions
                onChange={handleRecipientChange}
                value={recipientSelected}
                ref={recipientRef}
              />
              <Input
                name="recipient_id"
                type="hidden"
                defaultValue={delivery.recipient_id}
              />
            </FormGroupItem>
            <FormGroupItem width="45%">
              <label>Entregador</label>
              <AsyncSelect
                cacheOptions
                loadOptions={loadDeliverymen}
                defaultOptions
                onChange={handleDeliverymanChange}
                value={deliverymanSelected}
              />
              <Input
                name="deliveryman_id"
                type="hidden"
                defaultValue={delivery.deliveryman_id}
              />
            </FormGroupItem>
          </FormGroup>
          <label>Nome</label>
          <Input name="product" />
        </FormContent>
      </Form>
    </Container>
  );
}
