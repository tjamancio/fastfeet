import styled from 'styled-components';

export const Container = styled.div``;

export const Address = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  strong {
    padding-bottom: 5px;
  }

  span {
    padding: 5px 0px;
  }
`;

export const Dates = styled.div`
  margin-bottom: 20px;
  div {
    padding-bottom: 10px;
  }
`;

export const Signature = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    padding-bottom: 5px;
  }

  img {
    max-height: 150px;
  }
`;
