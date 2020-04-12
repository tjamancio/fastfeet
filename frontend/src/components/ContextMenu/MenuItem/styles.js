import { darken } from 'polished';
import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0px;

  label {
    font-size: 16px;
    font-weight: normal;
    color: ${colors.textLight};
    margin-left: 10px;
    cursor: pointer;
  }

  &:hover {
    background: ${darken(0.05, colors.white)};
  }
`;
