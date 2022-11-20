import {View, Text} from "react-native";
import {ICryptoToken} from "../../../models/Models";
import {ENoteMode, IModable} from "../../Notes/NotesUtils";

interface IProps {
    cryptoNote: ICryptoToken
    currentTokenPrice?: string
}

export const CryptoPL = ({cryptoNote, currentTokenPrice, mode}: IProps & IModable) => {

    /**
     * Get average amount of USD held by User, based on his trades
     */
    const averageHolderUSD = (): number => {
        return cryptoNote.deals.map((deal) => {
            return Number(deal.quantity) * Number(deal.price)
        }).reduce((acc, item) => {
            return acc + item
        }, 0)
    }

    /**
     * Total token quantity
     */
    const totalQuantity = (): number => {
        return cryptoNote.deals.reduce((acc: number, deal) => {
            return Number(deal.quantity) + acc
        }, 0)
    }

    /**
     * Get average amount of user according to current Binance Price
     */
    const currentAvgTotal = (totalQuantity() * Number(currentTokenPrice)).toFixed(2)
    const isLoss: boolean =  Number(currentAvgTotal) < averageHolderUSD()
    return <View style={{marginBottom: 20}}>
        <Text>
            {`Avg. Total USD: ${averageHolderUSD().toFixed(2)}$`}
        </Text>
        {mode === ENoteMode.EDIT && <><View style={{display: 'flex', flexDirection: 'row'}}>
            {!isNaN(Number(currentTokenPrice)) && currentTokenPrice && <>
                <Text>
                    {`Avg. Total USD at (`}
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                    {`${currentTokenPrice}$`}
                </Text>
                <Text>{`): `}</Text>
            </>}
            {!isNaN(Number(currentAvgTotal)) && currentAvgTotal && <>
                <Text
                    style={{color: isLoss ? 'red' : 'green'}}>
                    {currentAvgTotal}$
                </Text>
            </>
            }
        </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text>PL: </Text>
                <Text style={{color: isLoss ? 'red' : 'green'}}>
                    {`${isLoss ? '-': '+'}${Math.abs(averageHolderUSD() - Number(currentAvgTotal)).toFixed(2)}`}$
                </Text>
            </View>
        </>}
    </View>
}
