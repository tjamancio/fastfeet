import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  height: 44px;
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  background: ${colors.white};
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 237px;

  label {
    display: flex;
    align-items: center;
  }
`;

export const Input = styled.input`
  border: 0;
  color: ${colors.text};
  padding-left: 10px;

  &::placeholder {
    color: ${colors.textLight};
  }
`;
