import { Link } from 'react-router-dom';
import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  background: ${colors.white};
  padding: 20px 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      max-width: 150px;
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    strong {
      color: ${colors.text};
    }

    button {
      color: ${colors.red};
      display: block;
      margin-top: 2px;
      padding: 0;
      border: 0;
      background: transparent;
    }
  }
`;

export const Menu = styled.div`
  margin-left: 15px;
  padding-left: 15px;
  border-left: 1px solid ${colors.gray};
  height: 30px;
  display: flex;
  align-items: center;
`;

export const MenuItem = styled(Link)`
  color: ${({ activeroute }) => (activeroute ? colors.text : colors.textLight)};
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
`;
