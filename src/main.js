//imports
import "./css/index.css"
import IMask from "imask"

//DOM Elements
const ccBgColor01 = document.querySelector('.cc-bg svg>g  g:nth-child(1) path')
const ccBgColor02 = document.querySelector('.cc-bg svg>g  g:nth-child(2) path')

const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img')

const cvc = document.querySelector('#security-code');
const cardNumber = document.querySelector('#card-number');
const expirationDate = document.querySelector('#expiration-date');

const ccSecurity = document.querySelector('.cc-security .value');
const ccHolder = document.querySelector('.cc-holder .value')
const ccNumber = document.querySelector('.cc-number')
const ccExpiration = document.querySelector('.cc-expiration .value')
const cardHolder = document.querySelector('#card-holder')

const addButton = document.querySelector('#button')

//Patterns
const cvcPattern = { mask: "0000" }
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      cardtype: 'visa',
      regex: /^4\d{0,15}/,
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: 'mastercard',
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: 'default'
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: 'american_express',
      regex: /^3[47]\d{0,13}/,
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    //Change letters for blank spaces
    let number = (dynamicMasked.value + appended).replace(/\D/g, '');
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    console.log(foundMask)
    return foundMask
  }
}
const expirationDatePattern = {
  mask: 'mm{/}yy',
  blocks: {
    mm: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    yy: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    }
  }
}


//Masks
const cvcMasked = IMask(cvc, cvcPattern);
const cardNumberMasked = IMask(cardNumber, cardNumberPattern);
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

//Functions
function setColorByType(type) {
  const colors = {
    visa: ['#2D57F2', '#436D99'],
    mastercard: ['#DF6F29', '#C69347'],
    elo: ['#44AAE8', '#EED228'],
    american_express: ['hsl(208, 100%, 41%)', 'hsl(208, 100%, 30%)'],
    default: ['black', 'gray']
  }

  ccBgColor01.setAttribute('fill', colors[type][0])
  ccBgColor02.setAttribute('fill', colors[type][1])
  ccLogo.setAttribute('src', `cc-${type}.svg`)
}
function updateCvc(code) {
  ccSecurity.innerText = code.length === 0 ? "123" : code
}
function updateCardNumber(number) {
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}
function updateExpirationDate(date) {
  ccExpiration.innerText = date.length === 0 ? "02/32" : date
}



//Events
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
})
addButton.addEventListener('click', () => {
  alert('Cartão adicionado!')
})
cardHolder.addEventListener('input', () => {
  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})
cvcMasked.on('accept', () => {
  updateCvc(cvcMasked.value)
})
cardNumberMasked.on('accept', () => {
  const card = cardNumberMasked.masked.currentMask.cardtype
  setColorByType(card)
  updateCardNumber(cardNumberMasked.value)
})
expirationDateMasked.on('accept', () => {
  updateExpirationDate(expirationDateMasked.value)
})


globalThis.setColorByType = setColorByType