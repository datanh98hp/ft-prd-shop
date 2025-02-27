import type { SWRConfiguration } from 'swr'
import axiosClient from './axios'

export const configSWR: SWRConfiguration = {
    //refreshInterval: 3000,
   // dedupingInterval: 3000, // trigger 1 request per 3 seconds if refresh
    shouldRetryOnError: false, // disable retry if false
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
    fetcher: (url) => axiosClient.get(url),
}