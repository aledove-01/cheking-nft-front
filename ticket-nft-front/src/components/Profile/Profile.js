import styled from "styled-components";
import Web3Connect from "../web3/Web3Connect";

export default function Profile(props) {
  return (
    <StyledProfile>
       {/*  <button id="btnLogin">Login</button> */}
        <Web3Connect></Web3Connect>

    </StyledProfile>
  );
  
}

const StyledProfile = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;