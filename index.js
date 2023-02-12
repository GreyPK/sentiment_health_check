import fetch from 'node-fetch';
import BigNumber from "bignumber.js";

const ARBISCAN_API = ''
const SENTIMENT_ACCOUNT = ''
const TG_API_TOKEN = ''
const TG_CHAT_ID = ''

const HEALT_FACTOR_WARNING = 1.29
const HEALT_FACTOR_CHECK_INTERVAL = 300000 // 5 mins

const GET_BALANCE_URL = `https://api.arbiscan.io/api?module=proxy&action=eth_call&to=0xc0ac97a0ea320aa1e32e9ded16fb580ef3c078da&data=f8b2cb4f000000000000000000000000${SENTIMENT_ACCOUNT.substring(2)}&apikey=my-api-key=${ARBISCAN_API}`;
const GET_BORROWS_URL = `https://api.arbiscan.io/api?module=proxy&action=eth_call&to=0xc0ac97a0ea320aa1e32e9ded16fb580ef3c078da&data=cd81b803000000000000000000000000${SENTIMENT_ACCOUNT.substring(2)}&apikey=my-api-key=${ARBISCAN_API}`;

const run = async () => {
	console.log('started')

	setInterval(async () => {
		try {
			const getBalanceResponse = await fetch(GET_BALANCE_URL)
			const getBalance = await getBalanceResponse.json();
			console.log(getBalance.result)
			console.log(BigInt(getBalance.result))


			const getBorrowsResponse = await fetch(GET_BORROWS_URL)
			const getBorrows = await getBorrowsResponse.json();
			console.log(getBorrows.result)
			console.log(BigInt(getBorrows.result))

			const healthFactor = BigNumber(BigInt(getBalance.result)) / BigNumber(BigInt(getBorrows.result))

			console.log(healthFactor)
			if (healthFactor <= HEALT_FACTOR_WARNING) {
				const text = (`Warning: liquidation threshold is 1.2! Your healthFactor now ${healthFactor}`)
				await fetch(`https://api.telegram.org/bot${TG_API_TOKEN}/sendmessage?parse_mode=HTML&chat_id=${TG_CHAT_ID}&text=${text}`)
			}

		} catch (error) {
			console.log(error)
		}
	}, HEALT_FACTOR_CHECK_INTERVAL);
}

run();