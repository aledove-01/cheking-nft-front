import styled from "styled-components";
import { ethers } from 'ethers';
import contract from '../abiData/eventsABI.json';
import { useEffect, useState } from 'react';
const contractAddress = "0x02673fAd5F1E2776f807a8452bBb90d03043231B";
const abi = contract.abi;


export default function Web3Connect(props) {
    const [currentAccount, setCurrentAccount] = useState(null);

    const checkWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        } else {
            console.log("Wallet exists! We're ready to go!")
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account: ", account);
            setCurrentAccount(account);

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const network = await provider.getNetwork();
            const chainId = network.chainId;
            console.log(chainId);
            if (chainId != 4) {
                console.log("Wrong network! Please switch to testnet.");

                var msgRet = 0;

                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{
                        chainId: "0x4",}]
                }).then(() => {}).catch((e) => {
                    console.log(e.code);
                    msgRet = e.code;}
                    
                    //4001 user cancelled
                    //4902 no esta la chain
                    );
            

                if (msgRet == 4001){
                    alert("Debe cambiar a la chain testnet");
                }
                if (msgRet == 4902){
                    window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [{
                            chainId: "0x4",
                            rpcUrls: ["https://rinkeby.infura.io/v3/"],
                           // chainName: "Rinkeby testnet",
                            nativeCurrency: {
                                name: "ETH",
                                symbol: "ETH",
                                decimals: 18
                            },
                            blockExplorerUrls: ["https://rinkeby.etherscan.io"]
    
                            // chainId: "0x89",
                            // rpcUrls: ["https://rpc-mainnet.matic.network/"],
                            // chainName: "Matic Mainnet",
                            // nativeCurrency: {
                            //     name: "MATIC",
                            //     symbol: "MATIC",
                            //     decimals: 18
                            // },
                            // blockExplorerUrls: ["https://polygonscan.com/"]
                        }]
                    });
                }
                

                return;
            }
        } else {
            console.log("No authorized account found");
        }

        
    }
    
    const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
        alert("Please install Metamask!");
    }

    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Found an account! Address: ", accounts[0]);
        setCurrentAccount(accounts[0]);
    } catch (err) {
        console.log(err)
    }
    }
    
    const mintNftHandler = () => { }
    const connectWalletButton = () => {
    return (
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
            Connect Wallet
        </button>
        )
    }

    const mintNftButton = () => {
    return (
        <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
            Mint NFT
        </button>
        )
    }

    useEffect(() => {
        checkWalletIsConnected();
    }, [])

    return (
        <Styledweb3Connect>
            {currentAccount ? mintNftButton() : connectWalletButton()}

           {/*  <StyledButtonConnect id="btnLogin">Login</StyledButtonConnect> */}
            
        </Styledweb3Connect>
    );
  
}

const Styledweb3Connect = styled.div`
    text-align: center;
    margin: 25px;
`;

const StyledButtonConnect = styled.button`
    padding: 15px;
    border: none;
    border-radius: 12px;
    min-width: 250px;
    color: white;
    font-size: 18px;
    cursor: pointer;
    background: orange;
`;