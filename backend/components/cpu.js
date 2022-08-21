import cardDB from "DB.js";
import comboDB from "DB.js";

let cpuHP = 0
let cpuComboFrec = 0

//levelはフロントエンドから貰う。CPUの強さを指定している
export const cpuLevel = function(req, res){
  if(req.body.cpuLevel == 0){
    cpuHP = 100
    cpuComboFrec = 10
  }else if(req.body.cpuLevel == 1){
    cpuHP = 200
    cpuComboFrec = 20
  }else if(req.body.cpuLevel == 2){
    cpuHP = 300
    cpuComboFrec = 30
  }
}

//CPUの攻撃を決める
export const cpuAttack = function () {
  let flag = Math.floor(Math.random() * 10);
  if (flag < cpuComboFrec) {
    //フロントエンドから受け取るreqの形を想定して作成
    const tmp = Number(Math.floor(Math.random() * cardDB.length));
    return cardDB[tmp];
  } else {
    const tmp = Number(Math.floor(Math.random() * comboDB.length));
    return comboDB[tmp];
  }
};

//CPUのDBを作ってる。フロントエンドに渡すよう
export const CPUDB = [{
  myHP: cpuHP,
  turnFlag: 0
}];
