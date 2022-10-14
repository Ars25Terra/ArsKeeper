/**
 * Web Service Client Interface
 */
export interface IWebService {

    post: (data: any, onSuccess: (response: any) => void, onFail: (error: any) => void) => Promise<any>
    get:  (data: any, onSuccess: (response: any) => void, onFail: (error: any) => void) => Promise<any>

}