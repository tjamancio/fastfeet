import styled from 'styled-components';

export const Container = styled.div``;

export const FormGroup = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const FormGroupItem = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || '100%'};
`;
