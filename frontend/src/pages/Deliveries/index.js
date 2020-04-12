import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import ButtonAdd from '~/components/ButtonAdd';
import ContextMenu from '~/components/ContextMenu';
import MenuItemDelete from '~/components/ContextMenu/MenuItem/Delete';
import MenuItemEdit from '~/components/ContextMenu/MenuItem/Edit';
import MenuItemViewer from '~/components/ContextMenu/MenuItem/Viewer';
import Modal from '~/components/Modal';
import Search from '~/components/Search';
import api from '~/services/api';
import history from '~/services/history';
import { Title, FlexRow, Table } from '~/styles/components';

import { DeliverymanContainer, Status } from './styles';
import Viewer from './Viewer';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  async function load(query = '') {
    const { data } = await api.get(`/deliveries?q=${query}`);
    setDeliveries(data);
  }

  useEffect(() => {
    load();
    return () => {};
  }, []);

  function handleSearchChange(event) {
    load(event.target.value);
  }

  function handleModalCloseClick() {
    setViewerVisible(false);
  }

  function handleViewerClick(delivery) {
    setSelected(delivery);
    setViewerVisible(true);
  }

  function handleNewDeliveryClick() {
    history.push('/orders/new');
  }

  function handleEditClick(id) {
    history.push(`/orders/${id}`);
  }

  async function handleDeleteClick(id) {
    const resp = window.confirm('Deseja realmente excluir esta encomenda?');
    if (resp) {
      try {
        await api.delete(`/deliveries/${id}`);
        toast.success('Entregador excluido com sucesso!');
        setDeliveries(deliveries.filter(delivery => delivery.id !== id));
      } catch (err) {
        toast.error('Erro ao excluir encomenda');
      }
    }
  }

  function getStatus(delivery) {
    if (delivery.canceled_at) return { name: 'cancelada', color: '#de3b3b' };
    if (delivery.end_date) return { name: 'entregue', color: '#2ca42b' };
    if (delivery.start_date) return { name: 'retirada', color: '#4d85ee' };

    return { name: 'pendente', color: '#c1bc35' };
  }

  return (
    <>
      <Title>Gerenciando encomendas</Title>
      <FlexRow>
        <Search
          placeholder="Buscar por encomendas"
          onChange={handleSearchChange}
        />
        <ButtonAdd onClick={handleNewDeliveryClick} />
      </FlexRow>

      <Table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(delivery => {
            const status = getStatus(delivery);
            return (
              <tr key={delivery.id}>
                <td>#{delivery.id}</td>
                <td>{delivery.product}</td>
                <td>{delivery.recipient.name}</td>
                <td>
                  <DeliverymanContainer>
                    <img
                      src={delivery.deliveryman.avatar.url}
                      alt={`Avatar ${delivery.deliveryman.name}`}
                    />
                    {delivery.deliveryman.name}
                  </DeliverymanContainer>
                </td>
                <td>{delivery.recipient.city}</td>
                <td>{delivery.recipient.state}</td>
                <td>
                  <Status color={status.color}>{status.name}</Status>
                </td>
                <td>
                  <ContextMenu>
                    <MenuItemViewer
                      onClick={() => handleViewerClick(delivery)}
                    />
                    <MenuItemEdit
                      onClick={() => handleEditClick(delivery.id)}
                    />
                    <MenuItemDelete
                      onClick={() => handleDeleteClick(delivery.id)}
                    />
                  </ContextMenu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {viewerVisible && (
        <Modal onCloseClick={handleModalCloseClick}>
          <Viewer delivery={selected} />
        </Modal>
      )}
    </>
  );
}
