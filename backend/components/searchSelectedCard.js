import cardDB from "../DB.js"


export const searchSelectedCard = function(id){
    let selectId = cardDB.findIndex((e) => e.id === id);
    return "../../ui/assets/cards/" + cardDB[selectId].img;
}