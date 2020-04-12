import AsyncSelect from 'react-select/async';
import styled from 'styled-components';

export const Container = styled.div``;

export const RecipientInput = styled(AsyncSelect)`
  & .Select_control {
    background: red;
  }
`;
