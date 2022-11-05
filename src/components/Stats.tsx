import { FunctionComponent, useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectAddress } from '../features/crypto/cryptoSlice';

interface StatsProps {}

const Stats: FunctionComponent<StatsProps> = () => {
	const [blockHeight, setBlockHeight] = useState(0);
	const [transactions, setTransactions] = useState([]);
	const address = useAppSelector(selectAddress);

	const loadData = async () => {
		//fetch data for georli network - mainnet not free :(
		const head = new Headers();
		head.append('Content-Type', 'application/json');
		head.append('X-API-Key', process.env.REACT_APP_BLOCK_API_KEY || '');
		const options = {
			method: 'GET',
			headers: head,
		};
		const response: any = await fetch(
			'https://rest.cryptoapis.io/v2/blockchain-data/ethereum/goerli/blocks/last',
			options
		);
		setBlockHeight(response.data.item.height);
	};
	const getLatestTransacstion = async () => {
		const head = new Headers();
		head.append('Content-Type', 'application/json');
		head.append('X-API-Key', process.env.REACT_APP_BLOCK_API_KEY || '');
		const options = {
			method: 'GET',
			headers: head,
		};
		const response: any = await fetch(
			`https://rest.cryptoapis.io/v2/blockchain-data/ethereum/goerli/addresses/${address}`,
			options
		);
		console.log(response);
		setTransactions(response.data.items);
	};
	useEffect(() => {
		// getLatestTransacstion();
		// const intervalCall = setInterval(() => loadData(), 60000);

		return () => {
			// clean up
			// clearInterval(intervalCall);
		};
	}, []);

	return (
		<div className='stats'>
			<h1>Stats Page</h1>
			<main>
				<div className='all-transactions'>
					<h2>List of transactions :</h2>
					<div>
						{transactions.length === 0 && 'No transactions done!'}
						{transactions.map((tran: any) => {
							return (
								<div className='transaction-div' key={tran.index}>
									<li>
										Transaction ID :
										4b66461bf88b61e1e4326356534c135129defb504c7acb2fd6c92697d79eb250
									</li>
									<li>
										Transaction Hash :
										1ec73b0f61359927d02376b35993b756b1097cb9a857bec23da4c98c4977d2b2
									</li>
									<li>Fee : 0.00016932 BTC</li>
									<li>
										Receipient address : 2MzakdGTEp8SMWEHKwKM4HYv6uNCBXtHpkV
									</li>
									<li>Sender address : 2N5PcdirZUzKF9bWuGdugNuzcQrCbBudxv1</li>
								</div>
							);
						})}
					</div>
				</div>

				<span>
					Current Block Height : <strong>{blockHeight}</strong>
				</span>
			</main>
		</div>
	);
};

export default Stats;
