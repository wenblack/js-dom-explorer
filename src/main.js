//imports
import "./css/index.css"
import IMask from "imask"

//card variables
const ccBgColor01 = document.querySelector('.cc-bg svg>g  g:nth-child(1) path')
const ccBgColor02 = document.querySelector('.cc-bg svg>g  g:nth-child(2) path')
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img')
let card

//CVC Pattern
const cvc = document.querySelector('#security-code');
const cvcPattern = { mask: "0000" }
const cvcMasked = IMask(cvc, cvcPattern);

//Card number pattern
const cardNumber = document.querySelector('#card-number');
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
const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

//Expiration pattern
const expirationDate = document.querySelector('#expiration-date');
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

//Export global functions
globalThis.setColorByType = setColorByType



