let product = {
    plainBurger: {
      name: "Гамбургер простой",
      price: 10000,
      kcall: 500,
      amount: 0,
      img: "images/product2.jpg",
      id: "img-1",
      descr:
        "Встречайте простой ГАМБУРГЕР. Он не сочный и не сытный за то дешевый",
      get Summ() {
        return this.price * this.amount;
      },
      get Kcall() {
        return this.kcall * this.amount;
      },
    },
    freshBurger: {
      name: "Гамбургер FRESH",
      price: 20500,
      kcall: 700,
      amount: 0,
      img: "images/product1.jpg",
      id: "img-2",
      descr: "Встречайте Фрешмена FAS FOOD`а. Он набрал в себя всё самое старое.",
      get Summ() {
        return this.price * this.amount;
      },
      get Kcall() {
        return this.kcall * this.amount;
      },
    },
    freshCombo: {
      name: "FRESH COMBO",
      price: 31900,
      kcall: 1200,
      amount: 0,
      img: "images/product3.jpg",
      descr: "FRESH и Картошка фри. Тот же самый FRESH и Фри объяденились.",
      id: "img-3",
      get Summ() {
        return this.price * this.amount;
      },
      get Kcall() {
        return this.kcall * this.amount;
      },
    },
  }
  
  let ExtraProduct = {
    doubleMayonnaise: {
      name: "Двойной майонез",
      price: 1000,
      kcall: 100,
    },
    lettuce: {
      name: "Салатный лист",
      price: 500,
      kcall: 30,
    },
    cheese: {
      name: "Сыр",
      price: 700,
      kcall: 60,
    },
  }
  
  let str = "";
  
  function createBurger() {
    let main = document.querySelector("main");
    for (let key in product) {
      let { name, price, descr, img, id } = product[key];
      str += `<section class="main__product" id="${key}">
         <div class="main__product-preview">
             <div class="main__product-info" id="${id}">
                 <img src="${img}" alt="" class="main__product-img">
                 <h2 class="main__product-title">${name}
                     <span class="main__product-many">${price} сум</span>
                 </h2>
             </div>
             <p class="main__product-descr">
                ${descr}
             </p>
         </div>
         <div class="main__product-extra">
             <div class="main__product-number">
                 <a class="main__product-btn fa-reg minus" data-symbol="-"></a>
                 <output class="main__product-num">0</output>
                 <a class="main__product-btn fa-reg plus" data-symbol="+"></a>
             </div>
             <div class="main__product-price"><span>0</span> сум</div> 
         </div>
         <div class="main__product-extraProduct">`;
         for(let newKey in ExtraProduct) {
              str += ` <label class="main__product-label">
              <input type="checkbox" class="main__product-checkbox" data-extra="${newKey}">
              <span class="main__product-check"></span>
              ${ExtraProduct[newKey].name}
          </label>`;
         }
         str +=  `</div>
         <div class="main__product-kcall"><span>0</span> калорий</div> 
     </section> `
    }
    main.innerHTML = str;
    burgers();
  
  }
  
  setTimeout(() => createBurger(),1000);
  
  function burgers() {
  
  let btnPlusOrMinus = document.querySelectorAll(".main__product-btn"),
    checkExtraProduct = document.querySelectorAll(".main__product-checkbox"),
    addCart = document.querySelector(".addCart"),
    receipt = document.querySelector(".receipt"),
    receiptWindow = document.querySelector(".receipt__window"),
    receiptOut = document.querySelector(".receipt__window-out"),
    receiptBtn = document.querySelector(".receipt__window-btn");
  
  // делаем перебор наших кнопок ( + и - )
  
  for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener("click", function () {
      plusOrMinus(this);
    });
  }
  
  // Функция для обработки + или -
  
  function plusOrMinus(element) {
    // closest() - подключаеться к ближайщему заданому родителю
  
    let parentId = element.closest(".main__product").getAttribute("id"),
      out = element.closest(".main__product").querySelector(".main__product-num"),
      price = element
        .closest(".main__product")
        .querySelector(".main__product-price span"),
      kcall = element
        .closest(".main__product")
        .querySelector(".main__product-kcall span");
  
    if (element.getAttribute("data-symbol") == "+") {
      product[parentId].amount++;
    } else if (
      element.getAttribute("data-symbol") == "-" &&
      product[parentId].amount > 0
    ) {
      product[parentId].amount--;
    }
  
    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
  }
  
  checkExtraProduct.forEach((item) => {
    item.addEventListener("click", function () {
      addExtraProduct(this);
    });
  });
  
  function addExtraProduct(el) {
    let parent = el.closest(".main__product"),
      parentId = parent.getAttribute("id");
  
    product[parentId][el.getAttribute("data-extra")] = el.checked;
  
    let kcall = parent.querySelector(".main__product-kcall span"),
      price = parent.querySelector(".main__product-price span"),
      elDataInfo = el.getAttribute("data-extra");
  
    if (product[parentId][elDataInfo] == true) {
      product[parentId].kcall += ExtraProduct[elDataInfo].kcall;
      product[parentId].price += ExtraProduct[elDataInfo].price;
    } else {
      product[parentId].kcall -= ExtraProduct[elDataInfo].kcall;
      product[parentId].price -= ExtraProduct[elDataInfo].price;
    }
  
    kcall.innerHTML = product[parentId].Kcall;
    price.innerHTML = product[parentId].Summ;
  }
  
  let arrProduct = [],
    totalName = "",
    totalPrice = 0,
    totalKcall = 0;
  
  addCart.addEventListener("click", function () {
    for (let key in product) {
      let productObj = product[key];
      if (productObj.amount > 0) {
        arrProduct.push(productObj);
        for (let newKey in productObj) {
          if (productObj[newKey] === true) {
            productObj.name += "\n" + ExtraProduct[newKey].name;
          }
        }
      }
      productObj.price = productObj.Summ;
      productObj.kcall = productObj.Kcall;
    }
  
    for (let i = 0; i < arrProduct.length; i++) {
      let el = arrProduct[i];
      totalPrice += el.price;
      totalKcall += el.kcall;
      totalName += "\n" + el.name + "\n";
    }
  
    receiptOut.innerHTML = `Вы заказали: \n ${totalName} \nКаллорийность ${totalKcall} \nОбщая стоимость ${totalPrice} сумм`;
  
    receipt.style.display = "flex";
    setTimeout(() => (receipt.style.opacity = "1"), 100);
    setTimeout(() => (receiptWindow.style.top = "0"), 200);
  
    let outNum = document.querySelectorAll(".main__product-num"),
      outPrice = document.querySelectorAll(".main__product-price span"),
      outKcall = document.querySelectorAll(".main__product-kcall span");
  
    for (let i = 0; i < outNum.length; i++) {
      outNum[i].innerHTML = 0;
      outPrice[i].innerHTML = 0;
      outKcall[i].innerHTML = 0;
    }
  });
  
  receiptBtn.addEventListener("click", function () {
    location.reload();
  });
  
let info = document.querySelectorAll('.main__product-info');
let view = document.querySelector('.view');
let viewClose = document.querySelector('.view__close');
let viewImg = document.querySelector('.view-img');

function clicker () {
  info.forEach(item => {
    item.addEventListener ('dblclick', function () {
      view.classList.add('active');
      viewClose.classList.add('close');
      if (item == info[0]) {
        viewImg.setAttribute('src', 'images/product2.jpg');
      }else if (item == info[1]) {
        viewImg.setAttribute('src', 'images/product1.jpg');
      }else{
        viewImg.setAttribute('src', 'images/product3.jpg');
      }
    })
    console.log(item);
  });
  viewClose.addEventListener('click', function () {
      view.classList.remove('active');
  })
}
clicker();
console.log(info.length);

  }

////////////////////////////////////// timer lvl


let timer = document.querySelector('.header__timer-extra');
let txt = document.querySelector('.header__timer')

function timerLevel1 () {
    timer.innerHTML == 100 ? timer.innerHTML = '100' : timer.innerHTML++;
    if (timer.innerHTML <= 50) {
        _timer1 = setTimeout(() => timerLevel1(), 500);
    }else {
        clearTimeout(_timer1);
        timer2 = setTimeout(() => timerLevel1(), 250);
    }
}

timerLevel1();



