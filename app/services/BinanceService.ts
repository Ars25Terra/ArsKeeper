import {getRequestService} from "../utils/Utils";

export const BINANCE_API = 'https://api.binance.com/api/v3/'

/**
 * Web Service Client to work with Binance API
 */
const BinanceService = () => {
    return {
        /**
         * Get current token price by it's symbol
         */
        getPriceBySymbol: async (symbol: string): Promise<string> => {
            return await getRequestService().get(
                {url: `${BINANCE_API}ticker/price?symbol=${symbol.toUpperCase()}USDT`},
                (response) => {
                    const price: string = response.data.price
                    const priceNumber: number = parseFloat(price)
                    console.log('Binance: Price', price)
                    return !isNaN(priceNumber)
                        ? priceNumber.toFixed(2)
                        : 0
                },
                e => {
                    console.log(`Ошибка: ${e}`)
                }
            )
        },
        /**
         * Get token prices at mentioned period of time
         */
        getPriceBySymbolOnDate: async (symbol: string, startDate: Date, endDate: Date): Promise<string> => {
            const startTime = startDate.getTime()
            const endTime  = endDate.getTime()
            return await getRequestService().get(
                {url: `${BINANCE_API}aggTrades?symbol=${symbol.toUpperCase()}USDT&startTime=${startTime}&endTime=${endTime}`},
                (response) => {
                    const price: string = response.data[0]["p"]
                    const priceNumber: number = parseFloat(price)
                    return !isNaN(priceNumber)
                        ? priceNumber.toFixed(2)
                        : 0
                },
                error => {
                    console.log(`Ошибка ${error}`)
                }
            )
        }
    }

}

export default BinanceService()
