import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

const WEBSOCKET_URL = 'wss://spicy-rpc-ws.chiliz.com/'
const FACTORY_ADDRESS = '0xfc1924E20d64AD4daA3A4947b4bAE6cDE77d2dBC'
const FACTORY_ABI: AbiItem[] = [
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'token0', type: 'address' },
            { indexed: true, internalType: 'address', name: 'token1', type: 'address' },
            { indexed: false, internalType: 'address', name: 'pair', type: 'address' },
            { indexed: false, internalType: 'uint256', name: '', type: 'uint256' },
        ],
        name: 'PairCreated',
        type: 'event',
    },
]

export default class FactoryListener {
    private provider = new Web3.providers.WebsocketProvider(WEBSOCKET_URL)
    private web3 = new Web3(this.provider)
    private contract = new this.web3.eth.Contract(FACTORY_ABI, FACTORY_ADDRESS)

    public async listen() {

        console.log('🧲 Listening to PairCreated events...')

        await this.web3.eth.getBlockNumber()
            .then((n) => console.log('Connected to node, current block:', n))
            .catch((err) => console.error('❌ Node unreachable:', err))


        await this.provider.on('connect', () => {
            console.log('✅ WebSocket connected to Chiliz')
        })

        await this.provider.on('error', (error) => {
            console.error('❌ WebSocket connection error:', error)
        })

        await this.provider.on('end', (error) => {
            console.warn('🔌 WebSocket disconnected:', error)
        })

        await this.contract.getPastEvents('PairCreated',
            {
                fromBlock: 0,
                toBlock: 'latest'
            }, function (error, events) {
                console.log(events);
            })
            .then(function (events) {
                console.log(events) // same results as the optional callback above
            });
        // .on('data', (event) => {
        //     console.log('✨ New LP:', {
        //         token0: event.returnValues.token0,
        //         token1: event.returnValues.token1,
        //         pair: event.returnValues.pair,
        //     })
        // })

        //     this.contract.events
        //         .PairCreated({fromBlock: 0})
        //         .on('data', (event) => {
        //             console.log('✨ New LP:', {
        //                 token0: event.returnValues.token0,
        //                 token1: event.returnValues.token1,
        //                 pair: event.returnValues.pair,
        //             })
        //         })
        //         .on('error', (err) => {
        //             console.error('🚨 Error:', err)
        //         })
    }
}
