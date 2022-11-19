import {IWebService} from "../services/IWebService";
import AxiosWebService from "../services/AxiosWebService";
import {ICryptoTokenDeal} from "../models/Models";

/**
 * Function to get current implementation of Web Request Service
 */
export function getRequestService(): IWebService {
    return AxiosWebService()
}

export const sortCryptoDeals = (a: ICryptoTokenDeal, b: ICryptoTokenDeal): number => {
    return b.date - a.date
}
