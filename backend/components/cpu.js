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

//CPUの使用したカード(あるいはカード一覧)を返す
export const cpuCard = function(){

}

//CPUのDB フロントエンドに渡すよう
export let cpuDB = [{
  yourHP: cpuHP,
  turnFlag: 0
}];

//CPU戦の際のplayerDB
export let cpuPlayerDB = [
    {
        yourHP: 200,
        playerId: "",
        turnFlag: 0,
        cardList: []
    }
]


//CPU戦用のHP計算
export const cpuCulculateHP = function (cardValue, playerId) {
    const indexAttacked = cpuPlayerDB.findIndex((e) => e.playerId === playerId);
    let effect = "";
    let updatedData = cardValue.selectedCardData.map((obj) => obj.id);

    if (cardValue.selectedCardData.length == 1) {
      let damageValue = cardValue.selectedCardData[0].value;
      if (cardValue.selectedCardData[0].action == "enhancement") {
        //回復の処理
        effect += "enhancement";
        cpuPlayerDB[indexAttacked].yourHP += damageValue;
      } else if (cardValue.selectedCardData[0].action == "steal") {
        //ハッカーカードの処理
        effect += "steal";
        cpuPlayerDB[indexAttacked].yourHP += damageValue;
        cpuDB.yourHP -= damageValue;
      } else {
        //攻撃の処理
        effect += "attack";
        cpuDB.yourHP -= damageValue;
      }
    } else {
      effect += ableAttacks(selectedCardData)[0].nameEn;
      const isIncludes = (arr, target) => arr.every((el) => target.includes(el));
      comboDB.filter((comboDB) => {
        if (isIncludes(updatedData, comboDB.idList)) {
          if (updatedData.length == comboDB.idList.length) {
            let damageValue = comboDB.actionValue;
            cpuDB.yourHP -= damageValue;
          }
        }
      });
    }
    let HPinfo = {
      action: effect,
      playerHP: cpuPlayerDB[indexAttacked].yourHP,
      cpuHP: cpuDB.yourHP,
      usedCardIdList: updatedData,
    };
    return HPinfo;
  };

  const ableAttacks = function (selectedData) {
    // selecteddataのidだけを集めた
    let updatedData = selectedData.map((obj) => obj.id);
    let canAttackData = updatedData.sort((a, b) => (a < b ? -1 : 1));
  
    // 一致してるものがあるかを判定
    const isIncludes = (arr, target) => arr.every((el) => target.includes(el));
    //recent_selectdataに、idに対応するカードの名前を入れたい
    if (canAttackData.length === 0) {
      // 何も選択されていないとき空の配列を返す
      return [];
    } else {
      // updateddataにあるのと一致した攻撃だけを返す
      return this.comboDB.filter((comboDB) => {
        return isIncludes(canAttackData, comboDB.idList);
      });
    }
  };
  
export const cpuHPReload = function(req,res){
    let selectId = cpuPlayerDB.findIndex((e) => e.playerId === req.body.playerId);
    const HPdata = {
        yourHP: cpuPlayerDB[selectId].yourHP,
        opponentHP: cpuDB.yourHP,
      };
    return HPdata
}



export const cardDraw = function (selectId) {
    console.log("ドロー関数が発火されました");
    for (let j = cpuPlayerDB[selectId].cardList.length; j < 6; ) {
      //tmpには、デッキの中からランダムに1つ数字を選ぶようにしている
      //const tmp = Number(Math.floor(Math.random() * selectDec(playerDB[selectId].decId).length));
      const tmp = Number(Math.floor(Math.random() * 56));
      //選んだIDのものをpushする
      //playerDB[selectId].cardList.push(selectDec(playerDB[selectId].decId)[tmp]);
      cpuPlayerDB[selectId].cardList.push(cardDB[tmp]);
  
      j++;
    }
  };
  
export const cpuPostCardDraw = function (req, res) {
    let selectId = cpuPlayerDB.findIndex((e) => e.playerId === req.body.playerId);
    if (req.body.cardData.length != 0) {
      cpuPlayerDB.cardList = req.body.cardData;
    }
    cardDraw(selectId);
    return cpuPlayerDB[selectId].cardList;
};

export const cpuGetTurn = function(req,res){
    let selectId = cpuPlayerDB.findIndex((e) => e.playerId === req.body.playerId);
    return cpuPlayerDB[selectId].turnFlag
}

export const cpuContorlTrun = function(req,res){
    let selectId = cpuPlayerDB.findIndex((e) => e.playerId === req.body.playerId);
    cpuPlayerDB[selectId].turnFlag += 1
}

