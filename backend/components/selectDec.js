import { testDec1 } from "backend/DB"
import { testDec2 } from "backend/DB"

export const selectDec = function(decId){
    //現状テストコード　今後バランスを考えて、Decの中身を考えたい
    if(decId == 1){
        return testDec1
    }else if(decId == 2){
        return testDec2
    }
}