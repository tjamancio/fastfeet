import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  padding: 20px;
  text-align: left;
  min-width: 450px;
`;
