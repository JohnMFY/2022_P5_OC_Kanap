//// RECUPERATION OF DATA IN LOCALSTORAGE ////

let dataInLocalStorage = JSON.parse(localStorage.getItem('productDataLocalStorage'))

//// LOOP TO GET DATA FROM API AND INCRENTATION OF ARTICLE INNERHTML ////

let boxArticleCart = document.getElementById('cart__items');
let articlesPromise = []; // promises storage

async function looping(){
     
    for(let productDataLocalStorage of dataInLocalStorage){

        let ProductId = productDataLocalStorage.ProductId
        articlesPromise.push(fetch(`http://localhost:3000/api/products/${ProductId}`)

        .then(res => res.json())

        .then((data) => {

            productData = data;
            const article = render(productData, productDataLocalStorage);
            return article;
            
        })

        .catch((error) => console.log(error)))
    }

  return articlesPromise;
}  

//// RENDER PRODUCT ARTICLE ////

    const render = (dataAPI, dataLocalStorage) =>{

        return `
        <article class="cart__item" data-id="${dataLocalStorage.ProductId}" data-color="${dataLocalStorage.ProductColor}">

        <div class="cart__item__img">
            <img src="${dataAPI.imageUrl}" alt="${dataAPI.altTxt}">
        </div>

        <div class="cart__item__content">

            <div class="cart__item__content__description">
                <h2>${dataAPI.name}</h2>
                <p>ProductColor : ${dataLocalStorage.ProductColor} </p>
                <p>${dataAPI.price} €</p>
            </div>

            <div class="cart__item__content__settings">

                <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${dataLocalStorage.ProductQuantity} </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${dataLocalStorage.ProductQuantity}">
                </div>

                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>

            </div>

        </div>

    </article>
    `
    }


//// SUPPRESSION MODIFICATION AND CALCUL OF TOTAL PRICE ////
async function afterPromise() {
    await looping().then(articlesPromesse => {
    
        Promise.all(articlesPromesse) // Recuperation of all promise

        .then(articles => {

            boxArticleCart.innerHTML = articles;
            
            //// DELETE PRODUCT OF CART ////

                let deleteBtn = Array.from(document.getElementsByClassName('deleteItem')) // create an array of the HTMLcollection

                for(let i = 0; i < deleteBtn.length; i++){

                    let buttonDel = deleteBtn[i]

                    buttonDel.addEventListener('click', function(e){

                        // Remove article of the DOM //
                        let buttonDelClick = e.target
                        buttonDelClick.closest('.cart__item').remove()

                        // Remove item from LocalStorage //
                    
                        let deletedId = dataInLocalStorage[i].ProductId;
                        let deletedColor = dataInLocalStorage[i].ProductColor; // recuperation of data id & color associate to the article of the buttonDel clicked
                        
                        dataInLocalStorage = dataInLocalStorage.filter( e => e.ProductId !== deletedId || e.ProductColor !== deletedColor ); // exclusion of data from upper variable and creation of new array         
                        localStorage.setItem('productDataLocalStorage', JSON.stringify(dataInLocalStorage)); // replacement of array in LocalStorage

                        location.reload(); // we can use location.reload() to avoid "bug" (Cannot read properties of undefined (reading 'ProductId')) who can appear time to time with a big cart
                        
                    })       
                } 

            //// TOTAL PRICE & QUANTITY ////
            
                // QUANTITY INTEGRATE IN THE DOM //

                    let productsTotalQuantity = 0
                    let productsQuantityInput = Array.from(document.getElementsByClassName('itemQuantity'))
                    
                    for (let j = 0; j < productsQuantityInput.length; j++){
                        productsTotalQuantity += productsQuantityInput[j].valueAsNumber //valueAsNumber if only value = JS dark magic string + string 1+2 = 12
                        
                    }

                    let totalQuantity = document.getElementById('totalQuantity')
                    totalQuantity.innerHTML = productsTotalQuantity
                    
                // TOTAL PRICE INTEGRATE IN THE DOM //

                    // /!\ BUG  N'utilise que le dernier price integré dans le DOM /!\

                   let productsTotalPrice = 0

                    for (let j = 0; j < productsQuantityInput.length; j++){
                        productsTotalPrice += (productsQuantityInput[j].valueAsNumber * productData.price)
                    }
                    console.log(productsTotalPrice)
                    let totalPrice = document.getElementById('totalPrice')
                    totalPrice.innerHTML = productsTotalPrice

            //// MODIFICATION OF QUANTITY ////

                // /!\ BUG  the quantity of the 1st product change on every change of other product (with the same value of the change done) /!\

                for (let k = 0; k < productsQuantityInput.length; k++){  
                    
        
                    productsQuantityInput[k].addEventListener("change" , (e) => {
                        
                        let quantityModif = dataInLocalStorage[k].ProductQuantity
                       
                        let productsQuantityInputValue = productsQuantityInput[k].value
                        
                        const newQantity = dataInLocalStorage.find((product) => product.productsQuantityInputValue !== quantityModif)
        
                        newQantity.ProductQuantity = productsQuantityInputValue
                        dataInLocalStorage[k].ProductQuantity = newQantity.ProductQuantity
        
                        localStorage.setItem('productDataLocalStorage', JSON.stringify(dataInLocalStorage))
        
                        location.reload();
                    })
                    
                }
        });
    });        
}

afterPromise();

//// RECUPERATION OF FORM DATA ////

const btnOrder = document.querySelector('#order')
btnOrder.addEventListener('click', () =>{
    console.log('click order is working')

    // collecting value from form //
    
    const userData = {
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        address: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        email: document.querySelector('#email').value,
    }
    
    localStorage.setItem('userData', JSON.stringify(userData))

    console.table(userData)


})



/*

  **************
 * HTML DU FORM *
  **************

div class="cart__price">

    <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>

</div>

<div class="cart__order">

    <form method="get" class="cart__order__form">

        <div class="cart__order__form__question">

            <label for="firstName">Prénom: </label>
            <input type="text" name="firstName" id="firstName" required>
            <p id="firstNameErrorMsg"><!-- ci est un message d'erreur --></p>

        </div>

        <div class="cart__order__form__question">

            <label for="lastName">Nom: </label>
            <input type="text" name="lastName" id="lastName" required>
            <p id="lastNameErrorMsg"></p>

        </div>

        <div class="cart__order__form__question">

            <label for="address">Adresse: </label>
            <input type="text" name="address" id="address" required>
            <p id="addressErrorMsg"></p>

        </div>

        <div class="cart__order__form__question">

            <label for="city">Ville: </label>
            <input type="text" name="city" id="city" required>
            <p id="cityErrorMsg"></p>

        </div>

        <div class="cart__order__form__question">

            <label for="email">Email: </label>
            <input type="email" name="email" id="email" required>
            <p id="emailErrorMsg"></p>

        </div>

        <div class="cart__order__form__submit">

            <input type="submit" value="Commander !" id="order">

        </div>
        
    </form>

</div>
*/