console.log("Edit in vscode");
function getElement(obj){
    return document.querySelector(obj);
}
function getAllElement(obj){
    return document.querySelectorAll(obj);
}
function sleep(ms){
    return new Promise(r => setTimeout(r, ms));
}
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max+1-min) - min);
}
function generateLine(array){
    let charLength = 0;
    let arrLine = [];
    let maxLength = 57;
    while(true){
        let word = array[getRandomNum(0, arrData.length-1)];
        charLength += word.length;
        if(charLength > maxLength){
            break;
        }else{
            arrLine.push(word);
        }
    }
    return arrLine;
}
async function resetObjs(){
    timeRun = false;
    remove_objs.forEach(e => e.remove());
    let loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    document.body.appendChild(loader);
    await sleep(1200);
    loader.remove();
    let new_f_text = document.createElement("div");
    new_f_text.setAttribute("id", "f_text");
    new_f_text.setAttribute("class", "main_objs");
    line1 = generateLine(arrData);
    line2 = generateLine(arrData);
    for(let i=0; i<line1.length; i++){
        let label = document.createElement("label");
        label.setAttribute("id", `l_line1_${i}`);
        label.setAttribute("class", "l_text line1");
        label.innerText = line1[i];
        new_f_text.appendChild(label);
        if(i == line1.length - 1){
            let brk = document.createElement("br");
            brk.setAttribute("class", "line1");
            new_f_text.appendChild(brk);
        }
    }
    for(let i=0; i<line2.length; i++){
        let label = document.createElement("label");
        label.setAttribute("id", `l_line2_${i}`);
        label.setAttribute("class", "l_text line2");
        label.innerText = line2[i];
        new_f_text.appendChild(label);
    }
    document.body.appendChild(new_f_text);

    let new_f_objs = document.createElement("div");
    new_f_objs.setAttribute("id", "f_objs");
    new_f_objs.setAttribute("class", "main_objs");
    let new_input = document.createElement("input");
    new_input.setAttribute("id", "input");
    new_f_objs.appendChild(new_input);
    let new_f_timer = document.createElement("div");
    new_f_timer.setAttribute("id", "f_timer");
    let new_l_timer = document.createElement("label");
    new_l_timer.setAttribute("id", "l_timer");
    new_l_timer.innerText = "01:00";
    new_f_timer.appendChild(new_l_timer);
    new_f_objs.appendChild(new_f_timer);
    let new_b_refresh = document.createElement("button");
    new_b_refresh.setAttribute("id", "b_refresh");
    new_b_refresh.innerText = b_refresh.innerText;
    new_f_objs.appendChild(new_b_refresh);
    document.body.appendChild(new_f_objs);

    input = getElement("#input");
    input.setAttribute("oninput", "changeEvent()");
    input.focus();
    l_timer = getElement("#l_timer");
    b_refresh = getElement("#b_refresh");
    b_refresh.addEventListener("click", resetObjs);
    invData = getElement("#inv_data");
    f_text = getElement("#f_text");
    f_objs = getElement("#f_objs");
    remove_objs = getAllElement(".main_objs");

    i = 0;
    arrLine1 = [];
    arrLine2 = [];

    cpm = 0;
    totalChar = 0;
    cWord = 0;
    icWord = 0;

    mins = Number(l_timer.innerText.split(":")[0]);
    sec = Number(l_timer.innerText.split(":")[1]);
}
function resultBoard(){
    let f_board = document.createElement("div");
    f_board.setAttribute("id", "f_board");
    //board_element
    let f_result = document.createElement("div");
    f_result.setAttribute("id", "f_result");
    f_board.appendChild(f_result);
    let l_result = document.createElement("label");
    l_result.setAttribute("id", "l_result");
    l_result.innerText = "Result";
    f_result.appendChild(l_result);

    let f_wpm = document.createElement("div");
    f_wpm.setAttribute("id", "f_wpm");
    l_wpm_1 = document.createElement("label");
    l_wpm_1.setAttribute("id", "l_wpm_1");
    let wpm = cpm/5;
    l_wpm_1.innerText = `${Math.round(wpm)} WPM`;
    f_wpm.appendChild(l_wpm_1);
    l_wpm_2 = document.createElement("label");
    l_wpm_2.setAttribute("id", "l_wpm_2");
    l_wpm_2.innerText = "(words per minute)";
    f_wpm.appendChild(l_wpm_2);
    f_board.appendChild(f_wpm);

    let f_totalChar = document.createElement("div");
    f_totalChar.setAttribute("id", "f_totalChar");
    let l_ket_totalChar = document.createElement("label");
    l_ket_totalChar.setAttribute("id", "l_ket_totalChar");
    l_ket_totalChar.innerText = "Keystroke";
    f_totalChar.appendChild(l_ket_totalChar);
    let f_totalChar2 = document.createElement("div");
    f_totalChar2.setAttribute("id", "f_totalChar2");
    f_totalChar.appendChild(f_totalChar2);
    let l_c_char = document.createElement("label");
    l_c_char.setAttribute("id", "l_c_char");
    l_c_char.innerText = `${cpm}`;
    f_totalChar2.appendChild(l_c_char);
    let l_spr = document.createElement("label");
    l_spr.setAttribute("id", "l_spr");
    l_spr.innerText = "|";
    f_totalChar2.appendChild(l_spr);
    let ic_char = totalChar - cpm;
    let l_ic_char = document.createElement("label");
    l_ic_char.setAttribute("id", "l_ic_char");
    l_ic_char.innerText = `${ic_char}`;
    f_totalChar2.appendChild(l_ic_char);
    let l_totalChar = document.createElement("label");
    l_totalChar.setAttribute("id", "l_totalChar");
    l_totalChar.innerText = `${totalChar}`;
    f_totalChar2.appendChild(l_totalChar);
    f_board.appendChild(f_totalChar);

    let f_accu = document.createElement("div");
    f_accu.setAttribute("id", "f_accu");
    let l_ket_accu = document.createElement("label");
    l_ket_accu.setAttribute("id", "l_ket_accu");
    l_ket_accu.innerText = "Accuracy";
    f_accu.appendChild(l_ket_accu);
    let accu = cpm/totalChar*100;
    if(isNaN(accu)){
        accu = 0;
    }
    let l_accu = document.createElement("label");
    l_accu.setAttribute("id", "l_accu");
    l_accu.innerText = `${Math.round(accu)}%`;
    f_accu.appendChild(l_accu);
    f_board.appendChild(f_accu);
    
    let f_cWord = document.createElement("div");
    f_cWord.setAttribute("id", "f_cWord");
    let l_ket_cWord = document.createElement("label");
    l_ket_cWord.setAttribute("id", "l_ket_cWord");
    l_ket_cWord.innerText = "Correct Words";
    f_cWord.appendChild(l_ket_cWord);
    l_cWord = document.createElement("label");
    l_cWord.setAttribute("id", "l_cWord");
    l_cWord.innerText = `${cWord}`;
    f_cWord.appendChild(l_cWord);
    f_board.appendChild(f_cWord);

    let f_icWord = document.createElement("div");
    f_icWord.setAttribute("id", "f_icWord");
    let l_ket_icWord = document.createElement("label");
    l_ket_icWord.setAttribute("id", "l_ket_icWord");
    l_ket_icWord.innerText = "Inorrect Words";
    f_icWord.appendChild(l_ket_icWord);
    l_icWord = document.createElement("label");
    l_icWord.setAttribute("id", "l_icWord");
    l_icWord.innerText = `${icWord}`;
    f_icWord.appendChild(l_icWord);
    f_board.appendChild(f_icWord);

    [f_result, f_wpm, f_totalChar, f_accu, f_cWord, f_icWord].forEach(e => e.setAttribute("class", "f_board"));
    document.body.appendChild(f_board);
}

function changeEvent(){
    let labelWord = getElement(`#l_line1_${i}`);
    let inputWord = input.value;
    if(!timeRun){
        timeRun = true;
        timer_event();
    }
    if(inputWord != " "){
        if(labelWord.innerText.startsWith(inputWord)){
            labelWord.style.backgroundColor = "#dddddd";
        }else{
            labelWord.style.backgroundColor = "red";
        }
        if(inputWord.endsWith(" ")){
            inputWord = input.value.slice(0, -1);
            labelWord.style.backgroundColor = "white";
            totalChar += inputWord.length + 1;
            if(inputWord == labelWord.innerText){
                cpm += inputWord.length + 1;
                cWord++;
                labelWord.style.color = "green";
            }else if(inputWord != labelWord.innerText){
                icWord++;
                labelWord.style.color = "red";
            }
            input.value = "";
            try{
                getElement(`#l_line1_${i+1}`).style.backgroundColor = "#dddddd";
                i++;
            }catch{
                i = 0;
                f_text.innerHTML = "";
                line1 = [];
                line2.forEach(e => line1.push(e));
                line2 = generateLine(arrData);
                for(let i=0; i<line1.length; i++){
                    let label = document.createElement("label");
                    label.setAttribute("id", `l_line1_${i}`);
                    label.setAttribute("class", "l_text line1");
                    label.innerText = line1[i];
                    f_text.appendChild(label);
                    if(i == line1.length - 1){
                        let brk = document.createElement("br");
                        brk.setAttribute("class", "l_text line1");
                        f_text.appendChild(brk);
                    }
                }
                for(let i=0; i<line2.length; i++){
                    let label = document.createElement("label");
                    label.setAttribute("id", `l_line2_${i}`);
                    label.setAttribute("class", "l_text line2");
                    label.innerText = line2[i];
                    f_text.appendChild(label);
                }
                getElement(`#l_line1_${i}`).style.backgroundColor = "#dddddd";
            }
        }
    }
    if(inputWord.endsWith(" ")){
        input.value = "";
    }
}
let input = getElement("#input");
let l_timer = getElement("#l_timer");
let b_refresh = getElement("#b_refresh");
let invData = getElement("#inv_data");
let f_text = getElement("#f_text");
let f_objs = getElement("#f_objs");
let remove_objs = getAllElement(".main_objs");

let timeRun = false;
let i = 0;
let arrLine1 = [];
let arrLine2 = [];

let cpm = 0;
let totalChar = 0;
let cWord = 0;
let icWord = 0;

//resultBoard();

let mins = Number(l_timer.innerText.split(":")[0]);
let sec = Number(l_timer.innerText.split(":")[1]);
async function timer_event(){
    while(!(mins == 0 && sec == -1)){
        let l_mins = String(mins);
        let l_sec = String(sec);
        if(l_mins.length == 1){
            l_mins = "0" + l_mins;
        }
        if(l_sec.length == 1){
            l_sec = "0" + l_sec;
        }
        l_timer.innerText = `${l_mins}:${l_sec}`;
        if(!timeRun){
            break;
        }
        sec--;
        await sleep(1000);
        if(sec == -1 && mins != 0){
            mins--;
            sec = 59;
        }
    }
    if(timeRun){
        let f_board = getElement("#f_board");
        if(f_board != null){
            f_board.remove();
        }
        resultBoard();
        resetObjs();
    }
}

b_refresh.addEventListener("click", resetObjs);

//readLine
fetch("https://raw.githubusercontent.com/CaaziExe/Typing-Test/main/id_words.txt?token=GHSAT0AAAAAABSHFJBA6BICW5NJ3O3ZWAHSYRFTZDA")
.then(response => response.text())
.then(data => useData(data));
function useData(data){
    globalThis.arrData = data.split("\r\n");
    globalThis.line1 = generateLine(arrData);
    globalThis.line2 = generateLine(arrData);
    for(let i=0; i<line1.length; i++){
        let label = document.createElement("label");
        label.setAttribute("id", `l_line1_${i}`);
        label.setAttribute("class", "l_text line1");
        label.innerText = line1[i];
        f_text.appendChild(label);
        if(i == line1.length - 1){
            let brk = document.createElement("br");
            brk.setAttribute("class", "line1");
            f_text.appendChild(brk);
        }
    }
    for(let i=0; i<line2.length; i++){
        let label = document.createElement("label");
        label.setAttribute("id", `l_line2_${i}`);
        label.setAttribute("class", "l_text line2");
        label.innerText = line2[i];
        f_text.appendChild(label);
    }
    input.setAttribute("oninput", "changeEvent()");
}
