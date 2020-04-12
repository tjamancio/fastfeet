import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border: 0;
    background: transparent;

    span {
      border: 2px solid ${colors.gray};
      border-radius: 2px;
      display: inline-block;
      & + span {
        margin-left: 3px;
      }
    }
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 35px;
  left: calc(50% - 75px);
  right: 0;
  padding: 10px;
  width: ${({ width }) => width};
  text-align: left;
  border: 1px solid ${colors.gray};
  background: ${colors.white};
  border-radius: 4px;
  z-index: 1000;

  display: ${({ visible }) => (visible ? 'block' : 'none')};

  button {
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.gray};
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${colors.gray};
  }

  &::after {
    content: '';
    position: absolute;
    left: calc(50% - 8px);
    top: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${colors.white};
  }
`;
