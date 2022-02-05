
function productCartInsertion(){

    let productCartContainer = document.getElementById('cart__items');
    let dataInLocalStorage = JSON.parse(localStorage.getItem('productDataLocalStorage'))

    for (let i=0; i < dataInLocalStorage.length; i++){
        productCartContainer.innerHTML +=
    `
    <article class="cart__item" data-id="${dataInLocalStorage[i].ProductId}" data-color="${dataInLocalStorage[i].ProductColor}">

        <div class="cart__item__img">
            <img src="IMAGE">
        </div>

        <div class="cart__item__content">

            <div class="cart__item__content__description">
                <h2>TITLE</h2>
                <p>ProductColor : ${dataInLocalStorage[i].ProductColor}</p>
                <p> PRICE €</p>
            </div>

            <div class="cart__item__content__settings">

                <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${dataInLocalStorage[i].ProductQuantity}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${dataInLocalStorage[i].ProductQuantity}">
                </div>

                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>

            </div>

        </div>

    </article>
    `
  }
}
productCartInsertion()

const cartItem = document.querySelector('.cart__item')
let dataId = cartItem.getAttribute('data-id')
console.log(dataId)

async function callProductById(){
    
    await fetch(`http://localhost:3000/api/products/${dataId}`)
    .then(res => res.json())
    .then((data) => (productData = data)) 
    console.log(productData) 
}
callProductById()

//delete element

//change quantity

// modify price with quantity



/*
const render = (product) => {
   // return ton html <article> en appliquant les valeurs de l'objet product, par ex product.url, product.name etc
};

for (let i = 0; i < localStorageArray.length; i++){
  render(localStorageArray[i]);
}
*/