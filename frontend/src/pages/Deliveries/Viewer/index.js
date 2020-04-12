import React from 'react';

import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import { Container, Address, Dates, Signature } from './styles';

export default function Viewer({ delivery }) {
  return (
    <Container>
      <Address>
        <strong>Informações da encomenda</strong>
        <span>
          {delivery.recipient.street}, {delivery.recipient.number}
        </span>
        <span>
          {delivery.recipient.city} - {delivery.state}
        </span>
        <span>
          {delivery.recipient.postalcode.substring(0, 5)} -{' '}
          {delivery.recipient.postalcode.substring(5, 8)}
        </span>
      </Address>
      <Dates>
        <div>
          <strong>Datas</strong>
        </div>
        <div>
          <strong>Retirada: </strong>{' '}
          {delivery.start_date &&
            format(parseISO(delivery.start_date), 'dd/MM/yyyy')}
        </div>
        <div>
          <strong>Entrega:</strong>{' '}
          {delivery.end_date &&
            format(parseISO(delivery.end_date), 'dd/MM/yyyy')}
        </div>
      </Dates>
      {delivery.signature && (
        <Signature>
          <strong>Assinatura do destinatário</strong>
          <img src={delivery.signature.url} alt="Assinatura" />
        </Signature>
      )}
    </Container>
  );
}

Viewer.propTypes = {
  delivery: PropTypes.shape({
    recipient: PropTypes.shape({
      street: PropTypes.string,
      number: PropTypes.number,
      state: PropTypes.string,
      city: PropTypes.string,
      postalcode: PropTypes.string,
    }),
    signature: PropTypes.shape({
      url: PropTypes.string,
    }),
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};
