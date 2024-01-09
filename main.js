let container = document.querySelector('.container')
let contentContainer = document.querySelector('.content-container')

let inputEl = document.querySelectorAll('input')
let errorMsg = document.querySelectorAll('.error-msg')
let errorTwo = document.querySelector('.error-two')
let inputItem2 = document.querySelectorAll('.input-item-2')
let label2 = document.querySelectorAll('.label-2')
let inputItem3 = document.querySelectorAll('.input-item-3')

let changeBtn = document.querySelector('.change-btn')

let nextBtnOne = document.querySelector('.next-btn.one')
let nextBtnTwo = document.querySelector('.next-btn.two')
let nextBtnThree = document.querySelector('.next-btn.three')
let confirmBtn = document.querySelector('.next-btn.confirm')

let backBtnTwo = document.querySelector('.back-btn.two')
let backBtnThree = document.querySelector('.back-btn.three')
let backBtnFour = document.querySelector('.back-btn.four')

let switchBtn = document.querySelector('.switch-btn')

let subLabelDisplay = document.querySelector('.sub-label-display')
let subPriceDisplay = document.querySelector('.sub-price-display')
let addOnsDisplay = document.querySelector('.add-ons-display')
let sumPriceDisplay = document.querySelector('.sum-price-display')

let subPrice, subLabel, addOnsPrice
let hasClickedOne, hasClickedTwo
let hasMultiplied = false
let errorValue

function getValue(obj, n) {
  return obj[Object.keys(obj)[n]]
}
function objKeys(obj) {
  objKey = Object.keys(obj)
  return objKey
}

let subscription = {
  subscriptionOne: {
    name: 'Arcade',
    price: 9
  },
  subscriptionTwo: {
    name: 'Advanved',
    price: 12
  },
  subscriptionThree: {
    name: 'Pro',
    price: 15
  }
}
let addOns = {
  addOnsOne: {
    name: 'Online Service',
    price: 1
  },
  addOnsTwo: {
    name: 'Larger Storage',
    price: 2
  },
  addOnsThree: {
    name: 'Costumizable Profile',
    price: 2
  }
}

inputEl.forEach((inputEl, i) => {
  inputEl.addEventListener('input', () => {
    if (inputEl.value !== '') {
      errorMsg[i].textContent = ''
      inputEl.classList.remove('error')
    }
  })
})

function errorCheck() {
  inputEl.forEach((inputEl, i) => {
    if (inputEl.value === '') {
      errorMsg[i].textContent = 'This field is required'
      inputEl.classList.add('error')
      errorValue = true
    } else {
      errorValue = false
    }
  })
  
  let emailInputValue = inputEl[1].value
  if (emailInputValue != '') {
    if (emailInputValue.includes('@') && emailInputValue.includes('.com')) {
      if (emailInputValue.indexOf('@') < emailInputValue.indexOf('.com')) {
        errorValue = false
      } else {
        errorValue = true
        errorMsg[1].textContent = 'Valid email required'
        inputEl[1].classList.add('error')
      }
    }
  }
  
  let phoneInputValue = inputEl[2].value
  if (phoneInputValue.length < 10) {
    errorValue = true
    inputEl[2].classList.add('error')
    errorMsg[2].textContent = 'Valid phone number required'
  }
  return errorValue
}

// step 2
for (let i = 0; i < inputItem2.length; i++) {
  inputItem2[i].addEventListener('click', () => {
    hasClickedOne = true
    errorTwo.textContent = ''
    inputItem2.forEach((inputItem2) => {
      if (inputItem2.classList.contains('clicked')) {
        inputItem2.classList.remove('clicked')
      }
    })
    inputItem2[i].classList.add('clicked')
  })
}

function getSubscription() {
  inputItem2.forEach((inputItem2, i) => {
    if (inputItem2.classList.contains('clicked')) {
      subLabel = getValue(subscription, i).name
      subPrice = getValue(subscription, i).price
    }
  })
  subLabelDisplay.textContent = subLabel
  subPriceDisplay.textContent = subPrice
  return subPrice
}

// step 3
for (let i = 0; i < inputItem3.length; i++) {
  inputItem3[i].addEventListener('click', () => {
    inputItem3[i].classList.toggle('checked')
  })
}

function getAddOns() {
  if (hasClickedTwo === true) {
    addOnsDisplay.innerHTML = ''
  }
  objKeys(addOns)
  inputItem3.forEach((inputItem3, i) => {
    if (inputItem3.classList.contains('checked')) {
      addOnsDisplay.innerHTML += `
        <div class="display-item">
          <div class="add-ons-name">${getValue(addOns, i).name}</div>
          <div class="add-ons-price">
            +$${getValue(addOns, i).price}<span class="addons-price-value"></span>/<span class="yearly">yr</span><span class="monthly">mo</span>
          </div>
        </div>`
      addOnsPrice += getValue(addOns, i).price
    }
  })
  return addOnsPrice
}

function sumPrice() {
  addOnsPrice = 0
  
  if (contentContainer.classList.contains('yr') && hasMultiplied === false) {
    objKeys(subscription)
    for (let i in objKey) {
      getValue(subscription, i).price *= 10
    }
    objKeys(addOns)
    for (let i in objKey) {
      getValue(addOns, i).price *= 10
    }
    hasMultiplied = true
  } else if (!contentContainer.classList.contains('yr') && hasMultiplied === true) {
    objKeys(subscription)
    for (let i in objKey) {
      getValue(subscription, i).price /= 10
    }
    objKeys(addOns)
    for (let i in objKey) {
      getValue(addOns, i).price /= 10
    }
    hasMultiplied = false
  }
  
  getSubscription()
  getAddOns()
  
  sumAmount = subPrice + addOnsPrice
  sumPriceDisplay.textContent = sumAmount
  sumAmount = 0
}

//btn section
switchBtn.addEventListener('click', () => {
  contentContainer.classList.toggle('yr')
})

changeBtn.addEventListener('click', () => {
  container.classList.remove(container.classList[1])
  container.classList.add('two')
  console.log('change-btn has been clicked');
})

nextBtnOne.addEventListener('click', () => {
  errorCheck()
  if (errorValue === false) {
    container.classList.toggle('two')
  }
})

backBtnTwo.addEventListener('click', () => {
  container.classList.toggle('two')
})
nextBtnTwo.addEventListener('click', () => {
  if (hasClickedOne == true) {
    container.classList.toggle('two')
    container.classList.toggle('three')
  } else {
    errorTwo.textContent = 'Please make a selection'
  }
})

backBtnThree.addEventListener('click', () => {
  container.classList.toggle('two')
  container.classList.toggle('three')
})
nextBtnThree.addEventListener('click', () => {
  container.classList.toggle('three')
  container.classList.toggle('four')
  hasClickedTwo = true
  sumPrice()
})

backBtnFour.addEventListener('click', () => {
  container.classList.toggle('three')
  container.classList.toggle('four')
})
confirmBtn.addEventListener('click', () => {
  container.classList.toggle('four')
  container.classList.toggle('five')
})



