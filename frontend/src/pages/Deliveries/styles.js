import { lighten } from 'polished';
import styled from 'styled-components';

export const DeliverymanContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const Status = styled.div`
  position: relative;
  color: ${({ color }) => color};
  background: ${({ color }) => lighten(0.3, color)};
  padding: 0 10px 0 25px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  height: 25px;
  display: inline-flex;
  align-items: center;
  border-radius: 20px;

  &::before {
    content: '';
    position: absolute;
    left: 5px;
    width: 0;
    height: 0;
    border: 5px solid ${({ color }) => color};
    border-radius: 5px;
  }
`;
