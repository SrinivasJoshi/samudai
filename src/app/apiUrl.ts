export const apiUrl = (chainId: number): string => {
	if (chainId === 80001)
		return `https://api-testnet.polygonscan.com/api?module=account&${process.env.REACT_APP_POLYGON_API_KEY}`;
	if (chainId === 137)
		return `https://api.polygonscan.com/api?module=account&${process.env.REACT_APP_POLYGON_API_KEY}`;
	if (chainId === 1)
		return `https://api.etherscan.io/api?module=account${process.env.REACT_APP_ETH_API_KEY}`;
	if (chainId === 4)
		return `https://api-rinkeby.etherscan.io/api?module=account${process.env.REACT_APP_ETH_API_KEY}`;
	if (chainId === 5)
		return `https://api-goerli.etherscan.io/api?module=account${process.env.REACT_APP_ETH_API_KEY}`;

	return `https://api.etherscan.io/api?module=account${process.env.REACT_APP_ETH_API_KEY}`;
};

// const data = {
//     var1: 'value1',
//     var2: 'value2'
//   };

//   const searchParams = new URLSearchParams(data);

// searchParams.toString() === 'var1=value1&var2=value2'
