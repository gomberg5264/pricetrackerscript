import axios, { AxiosInstance } from 'axios'
import cheerio from 'cheerio'

/**
 * Scrapes the price of Amazon items.
 *  
 * @author Nicolaus Rossi
 * @since 2020-08-14
 */
export default class WebScraper {
    private static instance: WebScraper
    private axiosInstance: AxiosInstance = axios.create()

    constructor() {
        if (WebScraper.instance) {
            throw new Error('WebScraper has already been instantiated!')
        }
        WebScraper.instance = this
    }

    public static getInstance(): WebScraper {
        return WebScraper.instance
    }

    /**
     * Gets and returns the price of the passed item from Amazon.
     * @param itemURL The item URL.
     */
    public fetchItemPrice(itemURL: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.axiosInstance.get(itemURL, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0' } })
                .then(
                    response => {
                        let $ = cheerio.load(response.data)
                        let price: Cheerio = $('#priceblock_ourprice')
                        resolve(price.text())
                    }
                )
                .catch((error) => reject(error))
        })
    }
}