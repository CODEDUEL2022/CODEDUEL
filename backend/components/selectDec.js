import { Dec1 } from "../DB.js"
import { Dec2 } from "../DB.js"
import { Dec3 } from "../DB.js"
import { makeDec } from "./makeDec.js"

export const selectDec = function(decId){
    //現状テストコード　今後バランスを考えて、Decの中身を考えたい
    if(decId == 1){
        return makeDec(Dec1)
    }else if(decId == 2){
        return makeDec(Dec2)
    }else if(decId == 3){
        return makeDec(Dec4)
    }
}