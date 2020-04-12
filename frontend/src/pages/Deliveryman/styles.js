import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-bottom: 10px;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
`;
