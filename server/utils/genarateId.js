exports.generateUniqueId = ()=>{
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '1234567890'

    let userid = '';
    for(let i = 0; i < 3; i++){
        userid += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    for(let i = 0; i < 3; i++){
        userid += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    return userid;
}