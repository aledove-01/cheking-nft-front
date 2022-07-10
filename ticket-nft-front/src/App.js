import logo from './logo.svg';
import emoptyImage from './empty.jpeg';
import './App.css';
import { createContext } from 'react';
import ContainerCentral from './components/ContainerCentral/ContainerCentral';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Events from './components/Events/Events';
import Tikets from './components/Tikets/Tikets';
import {DataEvents} from './components/Events/DataEvents';
import { ethers } from 'ethers';

import { BrowserRouter, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  WrapItem,Wrap,
  useColorModeValue,
  Flex,
  Input,
  FormControl,Badge,Image,
} from '@chakra-ui/react'
import { useState } from 'react';
import { CheckIcon } from '@chakra-ui/icons';
import axios from 'axios';

const ContextCentral = createContext([{theme: 'light'},{lenguaje: 'es'}]);

axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.get["Application-Id"] = "P2WOWGPz1ASvDLMMzqWb4dayFEtyGdzwL6oycDOo";

function HeaderF(){
  return (
    <Header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Tickets NFT</h1>
      <Profile className=""></Profile>
    </Header>
  );
}

function FooterF(){
  return (
    <footer className='App-footer'>
      <p>Tickets NFT</p>
    </footer>
  );
}
function ContainerF(){
  return (
    <ContextCentral.Provider value={[{theme: 'light'},{lenguaje: 'es'}]}>
      <div className="App">
        
        <ContainerCentral >
         
        </ContainerCentral>
        
      </div>
    </ContextCentral.Provider>
  );
}

 function  EventViewComponent(property,index) {
    const [imageUrl, setImageUrl] = useState(property.urlImg);
    let navigate = useNavigate();
    //console.log(property.name);
    function handleErrorImg(e){
      setImageUrl(emoptyImage);
    }
    function handleClickNewTicket(e){
      console.log(property.uid_decimal.value.$numberDecimal);
      navigate("../Ticket/"+property.uid_decimal.value.$numberDecimal, { replace: true });
    }
  return (
    <WrapItem key={index}  maxW='sm' borderWidth='1px' borderRadius='lg' w='300px' h='150px'>
      <Image key={'img_'+index} src={imageUrl} alt={imageUrl} onError={handleErrorImg} w='100px' h='75px' />

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {property.dateStr}
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {property.name}
        </Box>

        <Box>
          {ethers.utils.formatEther(property.price)}
          <Box as='span' color='gray.600' fontSize='sm'>
            / eth
          </Box>
          
        </Box>
        <Button onClick={handleClickNewTicket}>Buy Tickets</Button>
       
      </Box>
    </WrapItem>
  )
}

function ControlSearchEvents(){
  const [textSearch, setTextSearch] = useState('');
  const [state, setState] = useState('initial');
  const [error, setError] = useState(false);
  const [listEvents, setListEvents] = useState([]);

  async function searchEvents(){
    setState('loading');
    setError(false);
    setListEvents([]);
    console.log('axios');
    const resp = await axios.get(
      'http://localhost:3001/events/'+textSearch
    );
    if (resp.status === 200){
      console.log( resp);
      
      setListEvents(resp.data);
      console.log(listEvents[0]);
   }

    
    setState('loaded');
  }
   function handleClick(e){
     async function search(){
      console.log(textSearch,textSearch.length);
      if(textSearch.length > 0){
        console.log('first');
        await searchEvents();
        //setListEvents(DataEvents.filter(event => event.name.toLowerCase().includes(textSearch.toLowerCase())));
        setState('initial');
      }

    }
  }

  function ListEventSearch(){
    return (
      <Wrap display='flex' mt='2' alignItems='center' h='600px' >
        {listEvents.map((property,index) => (
          //console.log(property,index)
          EventViewComponent(property,index)
        ))}
    </Wrap>
    );
  }

  return (
    <>
    <Flex
      minH={'40vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('white', 'green.800')}>
      <Container
        maxW={'lg'}
        bg={useColorModeValue('white', 'whiteAlpha.100')}
        boxShadow={'xl'}
        rounded={'lg'}
        p={6}
        display={'column'}>
          <Container display={'flex'}>
            <Heading
              as={'h2'}
              fontSize={{ base: 'xl', sm: '2xl' }}
              textAlign={'center'}
              mb={2}>
              Search event and take your 
            </Heading>
            <Heading
              as={'h1'}
              fontSize={{ base: 'xl', sm: '2xl' }}
              textAlign={'center'}
              color={'green.400'}
              textStyle={'bold'}
              ml={2}
              mb={1}>
              Pass
            </Heading>
          </Container>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          as={'form'}
          spacing={'12px'}
          onSubmit={(e) => {
            e.preventDefault();
            setError(false);
            setState('submitting');
            searchEvents();
           //SearchEvent();
            // remove this code and implement your submit logic right here
            setTimeout(() => {
              if (textSearch === 'ejemplo') {
                setError(true);
                setState('initial');
                return;
              }

              setState('initial');
            }, 1000);
          }}>
          <FormControl>
            <Input
              variant={'solid'}
              borderWidth={1}
              color={'gray.800'}
              _placeholder={{
                color: 'gray.400',
              }}
              borderColor={useColorModeValue('gray.300', 'gray.700')}
              id={'textSearch'}
              type={'text'}
              required
              placeholder={'Title or description event'}
              aria-label={'Title or description event'}
              value={textSearch}
              disabled={state !== 'initial'}
              onChange={(e) =>
                setTextSearch(e.target.value)
              }
            />
          </FormControl>
          <FormControl w={{ base: '100%', md: '40%' }}>
            <Button onClick={handleClick}
              colorScheme={state === 'success' ? 'green' : 'blue'}
              isLoading={state === 'submitting'}
              w="100%"
              type={state === 'success' ? 'button' : 'submit'}>
              {state === 'success' ? <CheckIcon /> : 'Search'}
            </Button>
          </FormControl>
        </Stack>
        <Text
          mt={2}
          textAlign={'center'}
          color={error ? 'red.500' : 'gray.500'}>
          {error
            ? 'Oh no an error occured! 😢 Please try again later.'
            : "Look only for official events, check social networks! ✌️"}
        </Text>
      </Container>
    </Flex>
    <ListEventSearch></ListEventSearch>
    </>
  )
}
function MainF(){
  return (
    <Container maxW={'6xl'}>
       <ControlSearchEvents/>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Improve your experience to   <br />
            <Text as={'span'} color={'green.400'}>
            claim the tickets
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Create an event so your audience can easily claim their NFT tickets.
            Simple and clear steps.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}>
              Generate new Event
            </Button>
            <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button>
            
          </Stack>
        </Stack>
      </Container>
  );
}

function RootF(){
  return (
    <>
      <HeaderF/>
       
        <Outlet />
      <FooterF/>
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootF />} >
          <Route path="/" element={<MainF />} />
          <Route path="New%20Event" element={<Events />} />
          <Route path="Ticket/:id" element={<Tikets />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
