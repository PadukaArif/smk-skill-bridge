export function encrypt(text:string){
    return Buffer.from(text).toString('base64')
}
export function decrypt(text:string){
    return Buffer.from(text,"base64").toString('utf-8')
}