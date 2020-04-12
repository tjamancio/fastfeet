import React, { useEffect, useState } from 'react';

import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import ContextMenu from '~/components/ContextMenu';
import MenuItem from '~/components/ContextMenu/MenuItem';
import Modal from '~/components/Modal';
import Search from '~/components/Search';
import api from '~/services/api';
import colors from '~/styles/colors';
import { Title, FlexRow, Table } from '~/styles/components';

import { Container } from './styles';
import Viewer from './Viewer';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [viewerVisible, setViewerVisible] = useState(false);

  async function load(query) {
    const { data } = await api.get(`/delivery-problems?q=${query}`);
    setProblems(data);
  }

  useEffect(() => {
    load('');
    return () => {};
  }, []);

  function handleSearchChange(event) {
    load(event.target.value);
  }

  function handleModalCloseClick() {
    setViewerVisible(false);
  }

  function handleViewerClick(problem) {
    setSelected(problem);
    setViewerVisible(true);
  }

  async function handleCancelDeliveryClick(id) {
    const resp = window.confirm('Deseja realmente excluir esta encomenda?');
    if (resp) {
      try {
        await api.delete(`/delivery-problems/${id}/cancel-delivery`);
        toast.success('Encomenda cancelada com sucesso!');
      } catch (err) {
        toast.error('Erro ao cancelar encomenda');
      }
    }
  }

  return (
    <Container>
      <Title>Problemas na entrega</Title>

      <FlexRow>
        <Search
          placeholder="Buscar por problemas"
          onChange={handleSearchChange}
        />
      </FlexRow>

      <Table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(problem => (
            <tr key={problem.id}>
              <td>#{problem.delivery_id}</td>
              <td>{problem.description}</td>
              <td>
                <ContextMenu width="200px">
                  <MenuItem onClick={() => handleViewerClick(problem)}>
                    <MdEdit color={colors.blue} size={15} />
                    <label>Visualizar</label>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleCancelDeliveryClick(problem.id)}
                  >
                    <MdDelete color={colors.red} size={15} />
                    <label>Cancelar encomenda</label>
                  </MenuItem>
                </ContextMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {viewerVisible && (
        <Modal onCloseClick={handleModalCloseClick}>
          <Viewer problem={selected} />
        </Modal>
      )}
    </Container>
  );
}
