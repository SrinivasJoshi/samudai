import './App.css';
import { Button } from '@chakra-ui/react';
import { SiweMessage } from 'siwe';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addAddress, addChainId } from './features/crypto/cryptoSlice';

function App() {
	const dispatch = useAppDispatch();
	const domain = window.location.host;
	const origin = window.location.origin;
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const [isMetaMaskConnected, setisMetaMaskConnected] = useState(false);
	const [stateAddress, setStateAddress] = useState('');

	useEffect(() => {
		provider
			.send('eth_requestAccounts', [])
			.catch(() => alert('Cannot proceed without metamask'));
		metamask();
	}, []);

	const metamask = async () => {
		const accounts = await provider.listAccounts();
		if (accounts.length > 0) {
			setisMetaMaskConnected(true);
		}
		const address = await signer.getAddress();
		const chainId = await signer.getChainId();
		setStateAddress(address);
		dispatch(addAddress(address));
		dispatch(addChainId(chainId));
	};

	async function sendInfo(address: string, chainId: number) {
		const reqBody = {
			walletAddress: address,
			chainId,
			member: {
				did: 'yes',
			},
		};
		const res = await fetch('http://dev-gcn.samudai.xyz/api/member/login', {
			method: 'POST',
			body: JSON.stringify(reqBody),
			mode: 'no-cors',
		});
		console.log(res);
	}
	async function signInWithEthereum() {
		const message = createSiweMessage(
			await signer.getAddress(),
			'Sign in with Ethereum to the app.'
		);
		console.log(await signer.signMessage(message));
		setisMetaMaskConnected(true);
		const ad = await signer.getAddress();
		setStateAddress(ad);
		// remove below comment
		// sendInfo(address,chainId)
	}
	function createSiweMessage(address: string, statement: string) {
		const message = new SiweMessage({
			domain,
			address,
			statement,
			uri: origin,
			version: '1',
			chainId: 1,
		});
		console.log(message);
		return message.prepareMessage();
	}
	return (
		<div className='App'>
			{isMetaMaskConnected && (
				<nav className='navbar'>
					<li>Address : {stateAddress}</li>
				</nav>
			)}
			{isMetaMaskConnected ? (
				<div className='otherRoutes'>
					<Button>
						<Link to={'dashboard'}>Dashboard</Link>
					</Button>
					<Button style={{ marginTop: '1rem' }}>
						<Link to={'stats'}>Stats</Link>
					</Button>
				</div>
			) : (
				<Button colorScheme='blue' onClick={signInWithEthereum}>
					Sign In With Ethereum
				</Button>
			)}
		</div>
	);
}

export default App;
