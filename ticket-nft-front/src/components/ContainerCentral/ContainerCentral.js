import styled from "styled-components";
import Events from '../Events/Events';

const ContainerCentral = (props) => {
  return (
    <div>
        <StyledContainerCentral>
          <h1>ContextCentral</h1>
          <Events></Events>
        </StyledContainerCentral>
    </div>
  );
  
}

const StyledContainerCentral = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export default ContainerCentral;