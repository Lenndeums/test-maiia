import products from './mockPhones'

export const fetchProducts = async () => {
    return new Promise(resolve => {
        resolve(products)
    })
}
