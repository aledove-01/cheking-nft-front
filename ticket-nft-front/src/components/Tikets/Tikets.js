import styled from "styled-components";

const Tikets = (props) => {
  return (
    <div>
        <StyledTikets>
          <h1>Tikets</h1>
        </StyledTikets>
    </div>
  );
  
}

const StyledTikets = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export default Tikets;