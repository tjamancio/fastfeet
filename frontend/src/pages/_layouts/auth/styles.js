import { darken } from 'polished';
import styled from 'styled-components';

import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: white;
  padding: 50px 20px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      align-self: flex-start;
      font-weight: bold;
      padding: 5px 0;
      color: ${colors.label};
    }

    input {
      background: white;
      border: 1px solid ${colors.gray};
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
      color: ${colors.text};

      &::placeholder {
        color: ${colors.textLight};
      }
    }

    span {
      color: ${colors.danger};
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: ${colors.primary};
      font-weight: bold;
      color: ${colors.white};
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, colors.primary)};
      }
    }
  }
`;
