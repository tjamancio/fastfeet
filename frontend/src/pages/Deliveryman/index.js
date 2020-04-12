import React, { useState, useEffect } from 'react';

import { Form } from '@rocketseat/unform';
import Dropzone from 'react-dropzone';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import DefaultAvatar from '~/assets/default_avatar.png';
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

import { Container, DropzoneContent } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  name: Yup.string().required('Nome é obrigatório'),
  avatar_id: Yup.string().required('Avatar é obrigatório'),
});

export default function Deliveryman() {
  const { id } = useParams();

  const [avatar, setAvatar] = useState({
    id: '',
    url: null,
  });

  const [deliveryman, setDeliveryman] = useState(null);

  useEffect(() => {
    async function load() {
      if (id) {
        const { data } = await api.get(`/deliverymen/${id}`);
        setDeliveryman(data);
        setAvatar(data.avatar);
      }
    }

    load();
  }, [id]);

  function handleUpload(files) {
    files.forEach(async file => {
      const data = new FormData();
      data.append('file', file);

      const { data: fileInfo } = await api.post(`/files`, data);
      setAvatar({
        id: fileInfo.id,
        url: fileInfo.url,
      });
    });
  }

  async function handleSubmit({ name, email, avatar_id }) {
    try {
      if (id) {
        await api.put(`/deliverymen/${id}`, { name, email, avatar_id });
        toast.success('Entregador atualizado com sucesso!');
      } else {
        await api.post('/deliverymen', { name, email, avatar_id });
        toast.success('Entregador cadastrado com sucesso!');
      }
      history.push('/deliverymen');
    } catch (err) {
      toast.error('Erro ao salvar entregador');
    }
  }
  return (
    <Container>
      <Form schema={schema} initialData={deliveryman} onSubmit={handleSubmit}>
        <FlexRow>
          <Title>Cadastro de entregadores</Title>
          <Buttons>
            <ButtonBack />
            <ButtonSave />
          </Buttons>
        </FlexRow>

        <FormContent>
          <Dropzone onDropAccepted={handleUpload}>
            {({ getRootProps, getInputProps }) => (
              <DropzoneContent {...getRootProps()}>
                <input {...getInputProps()} />

                <img src={avatar.url || DefaultAvatar} alt="Avatar" />

                <Input type="hidden" name="avatar_id" value={avatar.id} />
              </DropzoneContent>
            )}
          </Dropzone>

          <label>Nome</label>
          <Input name="name" />

          <label>E-mail</label>
          <Input name="email" type="email" />
        </FormContent>
      </Form>
    </Container>
  );
}
