import styled from 'styled-components';

import colors from '~/styles/colors';
import { Button } from '~/styles/components';

export const Container = styled(Button)`
  background: ${colors.primary};
  width: 142px;
  text-transform: uppercase;
`;
