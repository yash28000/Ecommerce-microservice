export function wordlimiter (productName : string , maxWords: number) {
    let res = productName.slice(0,maxWords) + '.....'
    return res
}