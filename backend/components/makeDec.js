import { cardDB } from "../DB.js";

export const makeDec = function(decIdList){
    let decList = []    
    decIdList.forEach(cardId => {
        //検索して、それに該当するデータをdecListに格納
        let cardData = cardDB.find((v) => v.id === cardId)
        decList.push(cardData)
    });
    return decList
}