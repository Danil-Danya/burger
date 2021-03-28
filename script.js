
let product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 1200,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
}


let ExtraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 100,
    },
    lettuce: {
        name: 'Салатный лист',
        price: 500,
        kcall: 30,
    },
    cheese: {
        name: 'Сыр',
        price: 700,
        kcall: 60,
    }
}



    let btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
        checkEXtraProduct = document.querySelectorAll('.main__product-checkbox'),
        addCart = document.querySelector('.addCart'),
        receipt = document.querySelector('.receipt'),
        receiptWindow = document.querySelector('.receipt__window'),
        receiptOut = document.querySelector('.receipt__window-out'),
        receiptBtn = document.querySelector('.receipt__window-btn');
        

// делаем перебор наших кнопок ( + и - )

for(let i = 0; i < btnPlusOrMinus.length;i++) {
    btnPlusOrMinus[i].addEventListener('click', function() {
        plusOrMinus(this);
    })
}

// Функция для обработки + или -


function plusOrMinus(element) {
    
    // closest() - подключаеться к ближайщему заданому родителю

    let parentId = element.closest('.main__product').getAttribute('id'),
         out = element.closest('.main__product').querySelector('.main__product-num'),
         price = element.closest('.main__product').querySelector('.main__product-price span'),
         kcall = element.closest('.main__product').querySelector('.main__product-kcall span');


    if(element.getAttribute('data-symbol') == '+') {
        product[parentId].amount++
    }else if(element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }
    
    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;

}


////////////////////////////////////// timer lvl


let timer = document.querySelector('.header__timer-extra');

function timerLevel () {
    timer.innerHTML == 100 ? timer.innerHTML = '100' : timer.innerHTML++;
    setTimeout(() => timerLevel(), 500);
}
timerLevel(); 

