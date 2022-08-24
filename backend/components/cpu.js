import cardDB from "DB.js";
import comboDB from "DB.js";

let cpuHP = 0
let cpuComboFrec = 0

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

export const cpuAttack = function () {
    let flag = Math.floor(Math.random() * 10);
    if (flag < cpuComboFrec) {
        const cardNumber = Number(Math.floor(Math.random() * cardDB.length));
        return cardDB[cardNumber];
    } 
    const cardNumber = Number(Math.floor(Math.random() * comboDB.length));
    return comboDB[cardNumber];
  
};

export const cpuCard = function(){

}

export let cpuDB = [{
  yourHP: cpuHP,
  turnFlag: 0
}];

export let cpuPlayerDB = [
    {
        yourHP: 200,
        playerId: "",
        turnFlag: 0,
        cardList: []
    }
]


export const cpuCulculateHP = function (cardValue, playerId, isCPU) {
    const indexAttacked = cpuPlayerDB.findIndex((e) => e.playerId === playerId);
    let effect = "";
    let updatedData = cardValue.selectedCardData.map((obj) => obj.id);
    let HPinfo = {
      action: effect,
      playerHP: cpuPlayerDB[indexAttacked].yourHP,
      cpuHP: cpuDB.yourHP,
      usedCardIdList: updatedData,
    };

    if(isCPU == 0){
      if (cardValue.selectedCardData.length == 1) {
        let damageValue = cardValue.selectedCardData[0].value;
        if (cardValue.selectedCardData[0].action == "enhancement") {
          effect += "enhancement";
          cpuPlayerDB[indexAttacked].yourHP += damageValue;
          return HPinfo
        }
        if (cardValue.selectedCardData[0].action == "steal") {
          effect += "steal";
          cpuPlayerDB[indexAttacked].yourHP += damageValue;
          cpuDB.yourHP -= damageValue;
          return HPinfo
        }
        effect += "attack";
        cpuDB.yourHP -= damageValue;
        return HPinfo
      } 
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
      return HPinfo
    }

    if(isCPU == 1){
      if(cardValue.selectedCardData.length == 1){
        effect += "attack"
        cpuPlayerDB[indexAttacked].yourHP -= damageValue;
        return HPinfo
      }
      effect += ableAttacks(selectedCardData)[0].nameEn;
      const isIncludes = (arr, target) => arr.every((el) => target.includes(el));
      comboDB.filter((comboDB) => {
        if (isIncludes(updatedData, comboDB.idList)) {
          if (updatedData.length == comboDB.idList.length) {
            let damageValue = comboDB.actionValue;
            cpuPlayerDB[indexAttacked].yourHP -= damageValue;
          }
        }
      });
      return HPinfo
    }

  };

  const ableAttacks = function (selectedData) {
    let updatedData = selectedData.map((obj) => obj.id);
    let canAttackData = updatedData.sort((a, b) => (a < b ? -1 : 1));
  
    const isIncludes = (arr, target) => arr.every((el) => target.includes(el));
    if (canAttackData.length === 0) {
      return [];
    } else {
      return this.comboDB.filter((comboDB) => {
        return isIncludes(canAttackData, comboDB.idList);
      });
    }
  };

export const cpuAction = function(req,res){
  cpuCulculateHP(req.body.selectedCardData, req.body.userId, 0)
  let cpuCard = cpuAttack()
  cpuCulculateHP(cpuCard, req.body.userId, 1)
  return cpuCard
}
  
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
    const decNumber = 6;
    const cardNumber = 56;
    for (let j = cpuPlayerDB[selectId].cardList.length; j < decNumber; ) {
      //const tmp = Number(Math.floor(Math.random() * selectDec(playerDB[selectId].decId).length));
      const tmp = Number(Math.floor(Math.random() * cardNumber));
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

