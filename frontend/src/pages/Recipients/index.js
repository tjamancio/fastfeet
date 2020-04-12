import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import ButtonAdd from '~/components/ButtonAdd';
import ContextMenu from '~/components/ContextMenu';
import MenuItemDelete from '~/components/ContextMenu/MenuItem/Delete';
import MenuItemEdit from '~/components/ContextMenu/MenuItem/Edit';
import Search from '~/components/Search';
import api from '~/services/api';
import history from '~/services/history';
import { Title, FlexRow, Table } from '~/styles/components';

// import { Container } from './styles';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);

  async function load(query = '') {
    const { data } = await api.get(`/recipients?q=${query}`);
    setRecipients(data);
  }

  useEffect(() => {
    load();
    return () => {};
  }, []);

  function handleSearchChange(event) {
    load(event.target.value);
  }

  function handleNewRecipientClick() {
    history.push('/recipients/new');
  }

  function handleEditClick(id) {
    history.push(`/recipients/${id}`);
  }

  async function handleDeleteClick(id) {
    const resp = window.confirm('Deseja realmente excluir este destinatário?');
    if (resp) {
      try {
        await api.delete(`/recipients/${id}`);
        toast.success('Destinatário excluido com sucesso!');
        setRecipients(recipients.filter(recipient => recipient.id !== id));
      } catch (err) {
        toast.error('Erro ao excluir destinatário');
      }
    }
  }

  return (
    <>
      <Title>Gerenciando destinatários</Title>
      <FlexRow>
        <Search
          placeholder="Buscar por destinatários"
          onChange={handleSearchChange}
        />
        <ButtonAdd onClick={handleNewRecipientClick} />
      </FlexRow>

      <Table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map(recipient => (
            <tr key={recipient.id}>
              <td>#{recipient.id}</td>
              <td>{recipient.name}</td>
              <td>
                {`${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`}
              </td>
              <td>
                <ContextMenu>
                  <MenuItemEdit onClick={() => handleEditClick(recipient.id)} />
                  <MenuItemDelete
                    onClick={() => handleDeleteClick(recipient.id)}
                  />
                </ContextMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
