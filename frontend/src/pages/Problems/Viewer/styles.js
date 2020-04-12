import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  padding-bottom: 20px;

  strong {
    text-transform: uppercase;
    color: ${colors.label};
  }

  p {
    margin-top: 10px;
    line-height: 18px;
    font-size: 16px;
    color: ${colors.text};
  }
`;
