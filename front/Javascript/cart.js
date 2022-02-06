
function productCartInsertion(){
  
    let productCartContainer = document.getElementById('cart__items');
    let dataInLocalStorage = JSON.parse(localStorage.getItem('productDataLocalStorage'))

    for (let i=0; i < dataInLocalStorage.length; i++){
        productCartContainer.innerHTML +=
    `
    <article class="cart__item" data-id="${dataInLocalStorage[i].ProductId}" data-color="${dataInLocalStorage[i].ProductColor}">

        <div class="cart__item__img">
            
        </div>

        <div class="cart__item__content">

            <div class="cart__item__content__description">

                <p>ProductColor : ${dataInLocalStorage[i].ProductColor}</p>
                
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

// I get the id of the product with recuperation of the data-id attribut of the article 
const cartItem = document.querySelector('.cart__item')
let dataId = cartItem.getAttribute('data-id')
console.log(dataId)

// i use the id to call the rest of the product data on the API
async function callProductById(){
await fetch(`http://localhost:3000/api/products/${dataId}`)
.then(res => res.json())
.then((data) => (productData = data)) 
console.log(productData) 
}

// DATA FROM THE API TO INSERT IN THE DOM //
async function dataFromApi(){
    await callProductById();
    await productCartInsertion();

   //IMG & ALT//
    document.querySelector('.cart__item__img').innerHTML = `
       <img src="${productData.imageUrl}" alt="${productData.altTxt}">
    `
    //TITLE & PRICE//
    document.querySelector('.cart__item__content__description').innerHTML=`
       <h2>${productData.name}</h2>
       <p>${productData.price} €</p>
    `
}
dataFromApi()
/* 
pb to fix : 
_ Data from api innerhtml crush the color chosen
_ only the 1st product get his data from api
_ multiple x2 the product article


////////////TO//DO/////////////

 delete element eventlistener [ON CLICK]{
     
    // enlever element du dom
    element.parentElement.remove(); 

    // enlever element du local storage
    1. let dataInLocalStorage = JSON.parse(localStorage.getItem('productDataLocalStorage'))
    2. Splice the product that i don't want
    3. localStorage.setItem('productDataLocalStorage', JSON.stringify(dataInLocalStorage))

}             
                             
 change quantity eventlistener [ON VALUE CHANGE]{

      let newQuantity =
        parseInt(productOptionSelected.ProductQuantity) + parseInt(optionInArray.ProductQuantity);
        optionInArray.ProductQuantity = newQuantity ;
        localStorage.setItem('productDataLocalStorage', JSON.stringify(dataInLocalStorage));
 }             
                                      
 modify price with quantity {
     
     productData.price * ProductQuantity = Sum
 }

////////////////////////////////

//// Vincent tips ////

const render = (product) => {
   // return ton html <article> en appliquant les valeurs de l'objet product, par ex product.url, product.name etc
};

for (let i = 0; i < localStorageArray.length; i++){
  render(localStorageArray[i]);
}*/