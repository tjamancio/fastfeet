import { darken } from 'polished';
import styled from 'styled-components';

import colors from '~/styles/colors';
import { Button } from '~/styles/components';

export const Container = styled(Button)`
  background: ${colors.grayDark};
  width: 112px;
  text-transform: uppercase;

  transition: background 0.2s;

  &:hover {
    background: ${darken(0.1, colors.grayDark)};
  }
`;
