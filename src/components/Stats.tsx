import { FunctionComponent, useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectAddress } from '../features/crypto/cryptoSlice';

interface StatsProps {}
interface transaction {
	index: number;
	timeStamp: string;
	transactionIndex: string;
	hash: string;
	blockNumber: number;
	from: string;
	to: string;
}
const Stats: FunctionComponent<StatsProps> = () => {
	const [blockHeight, setBlockHeight] = useState(0);
	const [transactions, setTransactions] = useState([]);
	const address = useAppSelector(selectAddress);

	const getBlockHeight = async () => {
		const res = await fetch('https://api.blockcypher.com/v1/eth/main');
		const response = await res.json();
		setBlockHeight(response.height);
	};
	const getLatestTransactions = async () => {
		const res = await fetch(`https://api.etherscan.io/api
		?module=account
		&action=txlist
		&address=${address}
		&startblock=100000
		&endblock=99999999
		&page=1
		&offset=10
		&sort=desc
		&apikey=${process.env.REACT_APP_ETH_API_KEY}`);

		const response = await res.json();
		setTransactions(response.result);
	};
	useEffect(() => {
		getLatestTransactions();
		getBlockHeight();
		//get block height every 30 secs
		const intervalCall = setInterval(() => getBlockHeight(), 30000);

		return () => {
			// clean up to save API calls
			clearInterval(intervalCall);
		};
	}, []);

	return (
		<div className='stats'>
			<h1>Stats Page</h1>
			<main>
				<div className='all-transactions'>
					<h2>List of latest transactions :</h2>
					<div>
						{transactions.length === 0 && 'No transactions done!'}
						{transactions.map((tran: transaction, i: number) => {
							// display 5 recent transactions
							if (i > 4) return '';
							return (
								<div className='transaction-div' key={tran.index}>
									<li>Time Stamp : {tran.timeStamp} </li>
									<li>Transaction Index :{tran.transactionIndex}</li>
									<li>Transaction Hash: {tran.hash}</li>
									<li>Block Number : {tran.blockNumber}</li>
									<li>Sender's address : {tran.from}</li>
									<li>Receiver's address : {tran.to}</li>
								</div>
							);
						})}
					</div>
				</div>

				<span>
					Current Block Height :{' '}
					<strong>{blockHeight === 0 ? 'Loading...' : blockHeight}</strong>
				</span>
			</main>
		</div>
	);
};

export default Stats;
