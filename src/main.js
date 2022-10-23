import "./css/index.css"

const ccBgColor01 = document.querySelector('.cc-bg svg>g  g:nth-child(1) path')
const ccBgColor02 = document.querySelector('.cc-bg svg>g  g:nth-child(2) path')
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img')


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

globalThis.setColorByType = setColorByType