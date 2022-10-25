const tipPerPerson = document.querySelector('#tipPerPerson')
const totalPerPerson = document.querySelector('#totalPerPerson')
const tipCustom = document.querySelector('#tipCustom')
const tips = document.querySelectorAll('.tip-percent__tips__tip')
const person = document.querySelector('.person')
const button = document.querySelector('button')
const totalBillAmount = document.querySelector('#amount')
const totalPersons = document.querySelector('#people')


let tip = 0,
    people = 0,
    amount = 0

const buttonDisabled = () => {
    button.disabled = true;
}

const buttonEnable = () => {
    button.disabled = false;
}

const setValue = (tip, amount) => {
    tipPerPerson.textContent = tip.toFixed(2)
    totalPerPerson.textContent = amount.toFixed(2)
}

const setError = () => {
    person.classList.add('error')
}

const removeError = () => {
    person.classList.remove('error')
}

const tipCalc = (tip) => {
    buttonEnable()
    if (!people || people === 0) {
        setError()
        return
    }
    removeError();
    const tipAmount = amount * (tip / 100);
    const actualAmount = (amount + tipAmount) / people;
    const actualTip = tipAmount / people;
    setValue(actualTip, actualAmount);
}

const resetTips = () => {
    tips.forEach((tip) => {
        tip.checked = false;
    })
}

const resetCustomTip = () => {
    tipCustom.value = ''
}

//Events
tipCustom.addEventListener('input', (e) => {
    if (e.target.value !== '') {
        resetTips()
        tip = parseFloat(e.target.value)
    }
})

totalBillAmount.addEventListener('input', (e) => {
    amount = parseFloat(e.target.value)
    tipCalculation();
})

totalPersons.addEventListener('input', (e) => {
    people = parseFloat(e.target.value)
    if (!people || people === 0) {
        setError()
        return;
    }
    tipCalculation();
})


const tipCalculation = () => tips.forEach((tip) => {
    tip.addEventListener('click', (e) => {
        resetCustomTip();
        tip = parseFloat(e.target.value)
        tipCalc(tip)
    })
})

const resetValues = () => {
    tip = 0;
    people = 0;
    amount = 0;
    setValue(0, 0);
    totalBillAmount.value = '';
    totalPersons.value = '';
    resetCustomTip();
    resetTips();
    removeError();
    buttonDisabled();
}

resetValues()