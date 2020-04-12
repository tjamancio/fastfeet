import React, { useState, useEffect } from 'react';

import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import api from '~/services/api';

import { Title, Problem, ProblemDescription, ProblemDate } from './styles';

export default function DeliveryProblems({ route }) {
  const { delivery } = route.params;

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await api.get(`deliveries/${delivery.id}/problems`);
      setProblems(data);
    }
    load();
    return () => {};
  }, [delivery.id]);
  return (
    <Background>
      <Title>{delivery.product}</Title>
      {problems.map((problem) => (
        <Problem key={problem.id}>
          <ProblemDescription>{problem.description}</ProblemDescription>
          <ProblemDate>
            {format(parseISO(problem.createdAt), 'dd/MM/yyyy')}
          </ProblemDate>
        </Problem>
      ))}
    </Background>
  );
}

DeliveryProblems.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
};
