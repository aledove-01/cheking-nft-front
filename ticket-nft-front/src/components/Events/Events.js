import styled from "styled-components";
import { useState, useEffect } from "react";
import { Formik, Form, isInteger, ErrorMessage, useFormik, Field } from 'formik';
import { ethers } from 'ethers';
import contract from '../abiData/eventsABI.json';
import * as Yup from 'yup';
import axios from 'axios';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,Stack,
    Flex, Box,VStack, createLocalStorageManager
  } from '@chakra-ui/react'

const contractAddress = "0xD8294dbaa958b9EE85971fF8D77e139C0214f0c3";
const abi = contract.abi;

const eventShema= Yup.object({
    name: Yup.string().max(30,"Use shortly link").required("Name is required"),
    description: Yup.string().max(30,"Use shortly link").required("Desc. is required"),
    date: Yup.date().required("Should be a date"),
    time: Yup.string().required("Should be in 24 hour format"),
    location: Yup.string().max(30,"Use shortly link"),
    price: Yup.number("Only value numeric").min(0).typeError('Specify a number'),
    cantToken: Yup.number("Only value numeric").min(5,"A very private event?").max(10000,"If you need more tickets please contact support").typeError('Specify a number'),
    url: Yup.string().max(60,"Use shortly link").matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
    ),
})
/*const getProviderOrSigner = async (needSigner = false) => {
    //connect to MetaMask
    //since we store 'web3Modal' as a reference, we need to access the 'current' value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    //if user is not connected to the Rinkeby network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Cambia la red de tu billetera a Rinkeby");
      throw new Error("Cambia la red de tu billetera a Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
};   */ 

const createEvent = async () => {
    try{

    }catch(e){
    
    }

}
const Events = (props) => {
    
    const createEventInChain = async (_formData) => {
        console.log("createEventInChain");
        const dateTimeSpan = _formData.date + " " + _formData.time;
        console.log('fecha entera',dateTimeSpan);
        const dateStr = dateTimeSpan.split(' ')[0].split('-');
        const timeStr = dateTimeSpan.split(' ')[1].split(':');
        console.log(dateStr,timeStr);
        const dateFrm = new Date(dateStr[0], dateStr[1]-1,dateStr[2],timeStr[0], timeStr[1],0);
        console.log(ethers.utils.parseEther("100"));
       

        try{
            const { ethereum } = window;
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
           
            const cantValuePrice = (_formData.price*parseInt(_formData.cantToken))*1.025;
            console.log('cantValPrice',cantValuePrice.toFixed(8));
            const tx = await contract.addEvent(_formData.name, _formData.description, dateTimeSpan.toString(),
                    parseInt(_formData.cantToken), ethers.utils.parseEther(_formData.price.toString()), dateFrm.getTime(), 
                    dateFrm.getTime(), _formData.url.toString(),false,false,{ gasLimit: 420920,value: ethers.utils.parseUnits(cantValuePrice.toFixed(8).toString(), 'ether') });

           //hacer que funcione la tx
           //crear un evento y esperarlo que se complete 
           //ver los eventos generados y listarlos
            
            console.log(tx);
            alert("Evento creado con éxito");
            console.log(tx);
        }
        catch(e){
            console.log(e);
        }
    }
    function handleSubmit(values) {
       // e.preventDefault();

       console.log(values);

       /* const form = e.target;
        console.log(
            form.name.value,
            form.description.value,
            form.date.value,
            form.time.value,
            form.cantToken.value,
            form.price.value,
            form.url.value
        );   */
        //createEventInChain(form);
    }


    

    useEffect(() => {
        console.log('effect');
        
    }, []);

    return (
        <Flex bg="whiteAlpha" align="center" justify="center" h="100vh">
            <Box bg="white" p={2} rounded="md" w="600px">
            <StyledEvents>
                <h1>New Event</h1>
                <Formik 
                     initialValues= {{
                        name: '',
                        description: '',
                        date: '',
                        time: '',
                        location: '',
                        cantToken: '',
                        price: '',
                        url: '',
                    }}
                    
                    validationSchema={eventShema}
                    onSubmit={(values) => {
                        console.log(JSON.stringify(values, null, 2));
                        createEventInChain(values);
                      }}
                    
                    >
                   {({ handleSubmit, errors, handReset }) => (
                        <form id="frm" name="frm" onSubmit={handleSubmit} onReset={handReset} >
                            <VStack spacing={4} align="flex-start">
                                <FormControl isInvalid={!!errors.name}>
                                    <FormLabel>Name Event</FormLabel>
                                    <Field as={Input} id="name" name="name" placeholder="Name Event"
                                    />
                                    <FormHelperText  >
                                        We are obviously giving this straight to Facebook.
                                    </FormHelperText>
                                    <FormErrorMessage name="name">{errors.name}</FormErrorMessage>
                                </FormControl><FormControl isInvalid={!!errors.description}>
                                    <FormLabel>Description</FormLabel>
                                    <Field as={Input} id="description" name="description" placeholder="Description" />
                                    <FormErrorMessage name="description" >{errors.description}</FormErrorMessage>
                                </FormControl>
                                <StyledDivInline>
                                <FormControl isInvalid={!!errors.date} pr={3}>
                                    <FormLabel>Date</FormLabel>
                                    <Field as={Input} id="date" type="date" name="date" placeholder="Date" />
                                    <FormErrorMessage name="date" >{errors.date}</FormErrorMessage>
                                </FormControl><FormControl isInvalid={!!errors.time}>
                                    <FormLabel>Time</FormLabel>
                                    <Field as={Input} type="time" name="time" placeholder="Time" />
                                    <FormErrorMessage name="time" >{errors.time}</FormErrorMessage>
                                </FormControl>
                                </StyledDivInline><FormControl isInvalid={!!errors.price} >
                                    <FormLabel>Price</FormLabel>
                                    <Field as={Input} type="number" name="price" placeholder="Price"  />
                                    <FormErrorMessage name="price" >{errors.price}</FormErrorMessage>
                                </FormControl><FormControl isInvalid={!!errors.cantToken}>
                                    <FormLabel>Cant. Token</FormLabel>
                                    <Field as={Input} type="number" name="cantToken" placeholder="Cant. Token" />
                                    <FormErrorMessage name="cantToken" >{errors.cantToken}</FormErrorMessage>
                                </FormControl><FormControl isInvalid={!!errors.url}>
                                    <FormLabel htmlFor='url'>Image</FormLabel>
                                    <Field as={Input} type="text" name="url" placeholder="Url"  />
                                    <FormErrorMessage name="url" >{errors.url}</FormErrorMessage>
                                </FormControl>
                                <Stack spacing={4} direction={['column', 'row']}>
                                    <Button type="submit" colorScheme='blue' >Create</Button>
                                    <Button type="reset">Cancel</Button>
                                </Stack>
                            
                            </VStack>
                        </form>
                    )}
                </Formik>
            </StyledEvents>
        </Box>
    </Flex>
    
  );
  
}

const StyledDivInline = styled.div`
    display:flex;
    flex-direction: row;
    
`;

const StyledEvents = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
 
`;



export default Events;