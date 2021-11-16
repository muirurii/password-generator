const allUper = generateElements(65,90);
const allLower = generateElements(97,122);
const allNums = generateElements(48,57);
const allSymbols = generateElements(33,47).concat(generateElements(58,64)).concat(generateElements(123,126));
const form = document.querySelector('form');
const copyBtn = document.querySelector('#copy');
const upperElement = document.getElementById('upper');
const lowerElement = document.getElementById('lower');
const numberElement = document.getElementById('number');
const symbolElement = document.getElementById('symbol');
const inputElement = document.getElementById('length');
const outputElement = document.getElementById('output');
const notification = document.querySelector('#notification');

form.addEventListener('submit',generatePassword);
copyBtn.addEventListener('click',copyFunction);

function generateElements(from,to){
    const allElements = [];
    for(let i =from;i<=to;i++){
      allElements.push(String.fromCharCode(i));
    }
    return allElements;
}
function generatePassword(e){
    e.preventDefault();
    const includeUpper = upperElement.checked;
    const includeLower = lowerElement.checked;
    const includeNumber = numberElement.checked;
    const includeSymbol = symbolElement.checked;
    const length = inputElement.value;

   const uniquePassword = generateFromSelection(includeUpper,includeLower,includeNumber,includeSymbol,length);
   outputElement.textContent = uniquePassword;
}
function generateFromSelection(includeUpper,includeLower,includeNumber,includeSymbol,length){
    if(!includeUpper && !includeLower && !includeNumber && !includeSymbol) return;
    let passwordArray = [];
        if(includeUpper) passwordArray.push(...allUper);
        if(includeLower) passwordArray.push(...allLower);
        if(includeNumber) passwordArray.push(...allNums);
        if(includeSymbol) passwordArray.push(...allSymbols);
        
        let password = [];
        for(let i = 0;i<length;i++){
            password.push(passwordArray[Math.floor(Math.random() * passwordArray.length)]);
        }
        return password.join('');
}
function copyFunction(){
    if(!outputElement.textContent.length) return '';
    const textarea = document.createElement('textarea');
    textarea.value = outputElement.textContent;
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    notification.classList.add('show');
    setTimeout(()=>notification.classList.remove('show'),1500);
}