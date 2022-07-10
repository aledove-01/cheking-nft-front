import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import contract from '../abiData/eventsABI.json';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
const contractAddress = "0xD8294dbaa958b9EE85971fF8D77e139C0214f0c3";
const abi = contract.abi;



const Tikets =  (props) => {
  const [eventData, setEventData] = useState([]);
  let params = useParams();

  const idEvt = params.id;
  const addressOwnerEvt = params.addressOwner;

  useEffect(() => {
    searchDataEvt();
    
  }, []);
  //const priceTicket = params.price;
  //console.log(first)
  async function searchDataEvt(_id){
    //try{
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const address = await signer.getAddress();
      const dataEvtTmp = await contract.getEventById(address,idEvt);
      console.log(dataEvtTmp);
      let objEvent = {
          id:dataEvtTmp.id.toNumber(),
          namEvt:dataEvtTmp.namEvt,
          cantTikets:dataEvtTmp.contTickets.toNumber(),
          cantTokenMax:dataEvtTmp.cantTicketsMax.toNumber(),
          price:dataEvtTmp.price.toNumber(),
          dateOff:dataEvtTmp.dateOff,
          dateEvent:dataEvtTmp.dateEvent,
          dateStr:dataEvtTmp.dateStr,
          urlImg:dataEvtTmp.urlImg,
          line2:dataEvtTmp.line2,
          freeEvent:dataEvtTmp.freeEvent,
          paused:dataEvtTmp.paused,
        };
      setEventData(objEvent);
      //console.log(dataEvt);
     
      return objEvent;
   /* }
    catch(e){
      console.log(e);
    }*/
  }
  
  async function  handleClickBtnNewTicket(){
    try{
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      //getEventById
      const cantValuePrice = (ethers.utils.formatEther(eventData.price)*1.025).toFixed(8);
      console.log(idEvt-1,cantValuePrice,ethers.utils.parseUnits(cantValuePrice.toString(), 'ether'));
      const tx = await contract.newTicket(address,idEvt,{ gasLimit: 380920,value: ethers.utils.parseUnits(cantValuePrice.toString(), 'ether') });
  
      //hacer que funcione la tx
      //crear un evento y esperarlo que se complete 
      //ver los eventos generados y listarlos
      
      console.log(tx);
      alert("Evento creado con éxito");
      console.log(tx);
      searchDataEvt();
    }
    catch(e){
      console.log(e);
    }
  }
  

  return (
    <div>
        <StyledTikets>
          <Center py={6}>
            <Box
              maxW={'450px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}>
              <Image
                h={'120px'}
                w={'full'}
                src={
                  eventData.urlImg
                }
                objectFit={'cover'}
              />
              
              <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                  <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                    {eventData.namEvt}
                  </Heading>
                  <Text color={'gray.500'}>{eventData.line2}</Text>
                </Stack>

                <Stack direction={'row'} justify={'center'} spacing={6}>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>{eventData.cantTokenMax}</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      Cant. Max. Tickets
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>{eventData.cantTikets}</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      Cant. Max. Minted
                    </Text>
                  </Stack>
                </Stack>

                <Button
                  w={'full'}
                  mt={8}
                  bg={useColorModeValue('#151f21', 'gray.900')}
                  color={'white'}
                  rounded={'md'}
                  onClick={handleClickBtnNewTicket}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}>
                  Minted
                </Button>
              </Box>
            </Box>
          </Center>
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