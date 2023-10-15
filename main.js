const userInput = document.getElementById("userInput");
const numBtn = document.querySelectorAll(".number-btn");
const oprBtn = document.querySelectorAll(".operator-btn");
const delBtn = document.getElementById("del-btn");
const clearBtn = document.getElementById("clear-btn");
const calculateText = document.getElementById("calculate-text");

const calculate = function(finalFormula){
    if (finalFormula[finalFormula.length-1]==='.'){
        finalFormula = finalFormula.slice(0, -1);
    };
    const splitNum = finalFormula.split(/[+|\-|/|x]/);
    let formulaOperator = finalFormula;


    splitNum.forEach(number => {
        formulaOperator = formulaOperator.replace(number,'');
    });

    if (formulaOperator==='+'){
        userInput.innerText=`${Number(splitNum[0]) + Number(splitNum[1])}`;
        return;  
    }else if (formulaOperator==='-'){
        userInput.innerText=`${Number(splitNum[0]) - Number(splitNum[1])}`;
        return;  
    }else if (formulaOperator==='x'){
        userInput.innerText=`${Number(splitNum[0]) * Number(splitNum[1])}`;
        return;  
    }else if (formulaOperator==='/'){
        userInput.innerText=`${Number(splitNum[0]) / Number(splitNum[1])}`;
        return;  
    }
}

const addText = function (text) {
  const splitNum = userInput.innerText.split(/[+|\-|/|x]/);
  const lastNum = splitNum[splitNum.length - 1];

  // 피연산자에 .이 포함되었는지 확인. 포함되었다면 아무 동작없이 리턴
  if (text === "." && lastNum.includes(text)) {
    return;
  }

  // .이 들어왔을 때
  if (text === ".") {
    // 만약 마지막 피연산자 입력이 0이였다면, 소수점 만들기
    if (lastNum === "0") {
      userInput.innerText += text;
      return;
      // 만약 마지막 피연산자 입력이 없었다면, 0.으로 시작하는 소수점 만들기
    } else if (lastNum === "") {
      userInput.innerText += `0${text}`;
      return;
    }
    // 아무 제한사항에도 해당되지 않는다면, 소수점 만들기
    else {
      userInput.innerText += text;
      return;
    }
  }

  // 숫자 정규식으로 표현된 값이 들어왔다면 반환
  if (/\d/.test(text)) {
    if (lastNum === "0") {
      userInput.innerText = userInput.innerText.slice(0, -1);
      userInput.innerText += text;
      return;
    }
    userInput.innerText += text;
    return;
  }

  // 연산자 값이 들어왔다면
  if (/[+|\-|/|x]/.test(text)) {
    // 아무 값을 가지지 않았다면 (초기값상태)
    if (userInput.innerText==='0') return;
    // 입력 문자열의 마지막이 연산자이거나 .이 들어있으면 삭제하고 추가
    if (lastNum === "" || lastNum[lastNum.length - 1] === ".") {
      userInput.innerText = userInput.innerText.slice(0, -1);
      userInput.innerText += text;
      return;
    }
    if (splitNum.length===2) {
        calculate(userInput.innerText);
        userInput.innerText += text;
        return;
    }

    userInput.innerText += text;
    return;
  }

};

// 입력된 계산식에서 가장 최근 요소를 삭제하는 함수
const delText = function () {
    userInput.innerText = userInput.innerText.slice(0, -1);
    if (userInput.innerText.length===0) {
        userInput.innerText += '0';
        return;
    }
    return;
}

// 입력된 계산식을 초기화 하는 함수
const clearText = function(){
    userInput.innerText = '0';
    return;
}


// 버튼클릭 이벤트
numBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    addText(this.innerText);
    e.preventDefault();
  });
});

oprBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    addText(this.innerText);
    e.preventDefault();
  });
});

delBtn.addEventListener("click",function(e){
    delText();
    e.preventDefault();
});

clearBtn.addEventListener("click",function(e){
    clearText();
    e.preventDefault();
})

calculateText.addEventListener("submit",function(e){
    calculate(userInput.innerText);
    e.preventDefault();
})