import React, { useEffect, useState } from 'react';

import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import ButtonAdd from '~/components/ButtonAdd';
import ContextMenu from '~/components/ContextMenu';
import MenuItem from '~/components/ContextMenu/MenuItem';
import Search from '~/components/Search';
import api from '~/services/api';
import history from '~/services/history';
import colors from '~/styles/colors';
import { Title, FlexRow, Table } from '~/styles/components';

import { Container } from './styles';

export default function Deliveryman() {
  const [deliverymen, setDeliverymen] = useState([]);

  async function load(query = '') {
    const { data } = await api.get(`/deliverymen?q=${query}`);
    setDeliverymen(data);
  }

  useEffect(() => {
    load('');
    return () => {};
  }, []);

  function handleSearchChange(event) {
    load(event.target.value);
  }

  function handleEditClick(id) {
    history.push(`/deliverymen/${id}`);
  }

  async function handleDeleteClick(id) {
    const resp = window.confirm('Deseja realmente excluir este entregador?');
    if (resp) {
      try {
        await api.delete(`/deliverymen/${id}`);
        toast.success('Entregador excluido com sucesso!');
        setDeliverymen(
          deliverymen.filter(deliveryman => deliveryman.id !== id)
        );
      } catch (err) {
        toast.error('Erro ao excluir entregador');
      }
    }
  }

  function handleNewDeliverymanClick() {
    history.push('/deliverymen/new');
  }

  return (
    <Container>
      <Title>Gerenciando entregadores</Title>
      <FlexRow>
        <Search
          placeholder="Buscar por entregadores"
          onChange={handleSearchChange}
        />
        <ButtonAdd onClick={handleNewDeliverymanClick} />
      </FlexRow>

      <Table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymen.map(deliveryman => (
            <tr key={deliveryman.id}>
              <td>#{deliveryman.id}</td>
              <td>
                <img src={deliveryman.avatar.url} alt="Avatar" title="Avatar" />
              </td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <td>
                <ContextMenu>
                  <MenuItem onClick={() => handleEditClick(deliveryman.id)}>
                    <MdEdit color={colors.blue} size={15} />
                    <label>Editar</label>
                  </MenuItem>
                  <MenuItem onClick={() => handleDeleteClick(deliveryman.id)}>
                    <MdDelete color={colors.red} size={15} />
                    <label>Excluir</label>
                  </MenuItem>
                </ContextMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
