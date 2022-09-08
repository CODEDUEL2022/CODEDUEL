import {cardDB} from "../DB.js";
import {comboDB} from "../DB.js";

export let cpuDB = [{
  playerId: "",
  yourHP: 200,
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
    let cpuCard = []
    //if (flag < 5) {
        console.log("1枚カードが返ります")
        const cardNumber = Number(Math.floor(Math.random() * cardDB.length));
        cpuCard.push(cardDB[cardNumber])
        return cpuCard
    // } 
    // const cardNumber = Number(Math.floor(Math.random() * comboDB.length));
    // return comboDB[cardNumber];
  
};

export const cpuPostPlayerData = function (req, res) {
  cpuPlayerDB.push({
    playerId: req.body.playerId,
    cardList: [],
    yourHP: 200,
    turnFlag: 0
  });
  cpuDB.push({
    playerId: req.body.playerId,
    yourHP: 200,
    turnFlag: 0
  })
}


export const cpuCulculateHP = function (selectedCardData, playerId, isCPU) {
    const indexAttacked = cpuPlayerDB.findIndex((e) => e.playerId === playerId);
    let effect = "";
    let givenCard = []
    for (let i = 0; i < selectedCardData.length; i++) {
      givenCard.push(selectedCardData[i]);
    }
    let updatedData = givenCard.map((obj) => obj.id);


    if(isCPU == 0){
      if (selectedCardData.length == 1) {
        let damageValue = selectedCardData[0].actionValue;
        if (selectedCardData[0].action == "enhancement") {
          effect += "enhancement";
          cpuPlayerDB[indexAttacked].yourHP += damageValue;
        }
        if (selectedCardData[0].action == "steal") {
          effect += "steal";
          cpuPlayerDB[indexAttacked].yourHP += damageValue;
          cpuDB[indexAttacked].yourHP -= damageValue;
          console.log(cpuDB[indexAttacked].yourHP)
        }
        if (selectedCardData[0].action == "attack") {
          effect += "attack";
          cpuDB[indexAttacked].yourHP -= damageValue;
          console.log(cpuDB[indexAttacked].yourHP)
        }
      } else {
        effect += ableAttacks(givenCard)[0].nameEn;
        const isIncludes = (arr, target) => arr.every((el) => target.includes(el));
        comboDB.filter((comboDB) => {
          if (isIncludes(updatedData, comboDB.idList)) {
            if (updatedData.length == comboDB.idList.length) {
              let damageValue = comboDB.actionValue;
              cpuDB[indexAttacked].yourHP -= damageValue;
            }
          }
        });
      }
      let HPinfo = {
        action: effect,
        playerHP: cpuPlayerDB[indexAttacked].yourHP,
        cpuHP: cpuDB[indexAttacked].yourHP,
        usedCardIdList: updatedData,
      };
      console.log(HPinfo)
      return HPinfo
    }

    if(isCPU == 1){
      if(selectedCardData.length == 1){
        let damageValue = selectedCardData[0].actionValue;
        effect += "attack"
        cpuPlayerDB[indexAttacked].yourHP -= damageValue;
      }else{
        effect += ableAttacks(givenCard)[0].nameEn;
        const isIncludes = (arr, target) => arr.every((el) => target.includes(el));
        comboDB.filter((comboDB) => {
          if (isIncludes(updatedData, comboDB.idList)) {
            if (updatedData.length == comboDB.idList.length) {
              let damageValue = comboDB.actionValue;
              cpuPlayerDB[indexAttacked].yourHP -= damageValue;
            }
          }
        });
      }
      let HPinfo = {
        action: effect,
        playerHP: cpuPlayerDB[indexAttacked].yourHP,
        cpuHP: cpuDB[indexAttacked].yourHP,
        usedCardIdList: updatedData,
      };
      console.log(HPinfo)
      return HPinfo
    }

  };

  const ableAttacks = function (selectedData) {
    let updatedData = selectedData.map((obj) => obj.id);
    let canAttackData = updatedData.sort((a, b) => (a < b ? -1 : 1));
    const isIncludes = (arr, target) => arr.every((el) => target.includes(el));
    if (canAttackData.length === 0) return [];
    return comboDB.filter((comboDB) => {
        return isIncludes(canAttackData, comboDB.idList);
    });
  };

export const cpuAction = function(req,res){
  cpuCulculateHP(req.body.cardValue.selectedCardData, req.body.cardValue.userId, 0)
  let cpuCard = cpuAttack()
  let cpuAction = cpuCulculateHP(cpuCard, req.body.cardValue.userId, 1)
  return cpuAction
}
  
export const cpuHPReload = function(req,res){
    console.log(req.body.playerId)
    let selectId = cpuPlayerDB.findIndex((e) => e.playerId === req.body.playerId);
    console.log(selectId)
    const HPdata = {
        yourHP: cpuPlayerDB[selectId].yourHP,
        oponentHP: cpuDB[selectId].yourHP,
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
