//// RECUPERATION OF DATA IN LOCALSTORAGE ////

    let dataInLocalStorage = JSON.parse(localStorage.getItem('productDataLocalStorage'))

//// LOOP TO GET DATA FROM API AND INCRENTATION OF ARTICLE INNERHTML ////

    let boxArticleCart = document.getElementById('cart__items');
    let articlesPromise = []; // promises storage
    let prices = []

    async function looping(){
        
        for(let productDataLocalStorage of dataInLocalStorage){

            let ProductId = productDataLocalStorage.ProductId
            articlesPromise.push(fetch(`http://localhost:3000/api/products/${ProductId}`)

            .then(res => res.json())

            .then((data) => {

                productData = data;
                const article = render(productData, productDataLocalStorage);

                let price = {}
                price[productData._id] = productData.price
                prices.push(price)

                return article;
                
            })

            .catch((error) => console.log(error)))
        }

        return articlesPromise;
    }  

//// RENDER PRODUCT ARTICLE ////

    const render = (dataAPI, dataLocalStorage) =>{ // Return with data from API and LS the HTLM of the product in the cart

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

    async function afterPromise() { // Function who recover the promises needed to operate the option of modification of quantity, suppression of product and calacul of total quantity and total price
        await looping().then(articlesPromesse => {
        
            Promise.all(articlesPromesse) // Recuperation of all promise

            .then(articles => {

                boxArticleCart.innerHTML = articles;
                
                //// DELETE PRODUCT OF CART ////

                    const deleteProductFromCart = () =>{

                        let deleteBtn = Array.from(document.getElementsByClassName('deleteItem')) // create an array of the HTMLcollection

                        for(let i = 0; i < deleteBtn.length; i++){

                            let buttonDel = deleteBtn[i]
                            let productInCart = document.querySelectorAll('.cart__item')
                            let productInCartId = productInCart[i].dataset.id
                            let productInCartColor = productInCart[i].dataset.color

                            buttonDel.addEventListener('click', function(e){

                                // Remove item from LocalStorage //
                                dataInLocalStorage = dataInLocalStorage.filter( e => (e.ProductId !== productInCartId || e.ProductColor !== productInCartColor))
                                console.log(dataInLocalStorage)

                                localStorage.setItem('productDataLocalStorage', JSON.stringify(dataInLocalStorage)); 
                                console.log(dataInLocalStorage)

                                // Remove article of the DOM //
                                let buttonDelClick = e.target
                                buttonDelClick.closest('.cart__item').remove()

                            })       
                        } 
                    }
                    
                    deleteProductFromCart()

                //// TOTAL PRICE & QUANTITY ////
                
                    // QUANTITY INTEGRATE IN THE DOM //

                        let productsTotalQuantity = 0
                        let productsQuantityInput = Array.from(document.getElementsByClassName('itemQuantity'))
                        
                        for (let j = 0; j < productsQuantityInput.length; j++){
                            productsTotalQuantity += productsQuantityInput[j].valueAsNumber                      
                        }

                        let totalQuantity = document.getElementById('totalQuantity')
                        totalQuantity.innerHTML = productsTotalQuantity
                        
                    // TOTAL PRICE INTEGRATE IN THE DOM //

                        // /!\ BUG  N'utilise que le dernier price integré dans le DOM /!\

                        let productsTotalPrice = 0

                        const productsPrice = [];

                        for (let price of prices){

                            let productPrice = Object.values(price)
                            let productPriceString = productPrice.toString()
                            productsPrice.push(productPriceString)
                        } 
                        console.log(productsPrice)

                        for (let j = 0; j < productsQuantityInput.length; j++){   

                           productsTotalPrice += (productsQuantityInput[j].valueAsNumber * productsPrice[j])

                        }
                        
                        let totalPrice = document.getElementById('totalPrice')
                        totalPrice.innerHTML = productsTotalPrice

                //// MODIFICATION OF QUANTITY ////

                    // /!\ BUG  the quantity of the 1st product change on every change of other product (with the same value of the change done) /!\

                        
                    for (let k = 0; k < productsQuantityInput.length; k++){  

                            
                                
                        productsQuantityInput[k].addEventListener("change" , (e) => {

                            let productsQuantityInputValue = productsQuantityInput[k].value
                            console.log(productsQuantityInputValue)
                            let quantityModif = dataInLocalStorage[k].ProductQuantity
                            const newQantity = dataInLocalStorage.find((Product) => (Product.productsQuantityInputValue !== quantityModif))
                            console.log(newQantity)
                            newQantity.ProductQuantity = productsQuantityInputValue
                            console.log(newQantity)
                            dataInLocalStorage[k].ProductQuantity = newQantity.ProductQuantity
            
                            localStorage.setItem('productDataLocalStorage', JSON.stringify(dataInLocalStorage))
            
                            location.reload(); // mettre a jour le LS pas de reload et le champ total
                        })
                        
                    }
            });
        });        
    }

    afterPromise()

    

////// RECUPERATION OF FORM DATA //////

    const btnOrder = document.querySelector('#order')
    btnOrder.addEventListener('click', (event) =>{
        event.preventDefault()

        // VERIFICATION OF DATA FROM FORM //

        // function with a regex & errorMsg for FName LName and City

            const regexTestLetter3_20NothingElse = (test) =>{  //control if there is between 3 to 20 letters, capital autorized and refuse all other characters 
            return  /^[A-Z a-z\s]{3,20}$/.test(test)
            }

            let errorMessage = `Chiffre et symboles ne sont pas autorisé. Nombre de caractères autorisés 3 à 20.`

        // First name 
            function firstNameTest(){

                const firstName = document.querySelector('#firstName').value
                const firstNameError = document.getElementById('firstNameErrorMsg')
                
                if(regexTestLetter3_20NothingElse(firstName)){
                    return true
                } else{
                    firstNameError.innerText = errorMessage
                    return false
                }
            }
        // Last name
            function lastNameTest(){

                const lastName = document.querySelector('#lastName').value
                const lastNameError = document.getElementById('lastNameErrorMsg')

                if(regexTestLetter3_20NothingElse(lastName)){
                    return true
                } else{
                    lastNameError.innerText = errorMessage
                    return false
                }
            }           
        // City
            function cityTest(){

                const city = document.querySelector('#city').value
                const cityError = document.getElementById('cityErrorMsg')

                if(regexTestLetter3_20NothingElse(city)){
                    return true
                } else{
                    cityError.innerText = errorMessage
                    return false
                }
            }
        // Email
            const regexTestEmail = (test) =>{
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(test)
            }

            function emailTest(){

                const email = document.querySelector('#email').value
                const emailError = document.getElementById('emailErrorMsg')

                if(regexTestEmail(email)){
                    return true
                } else{
                    emailError.innerText = "L'email n'est pas valide"
                    return false
                }
            }
        // Address
            const regexTestAdress = (test) => {
                return /^[A-Z a-z 0-9\s]{5,50}$/.test(test)
            }

            function addressTest(){

                const address = document.querySelector('#address').value
                const addressError = document.getElementById('addressErrorMsg')

                if(regexTestAdress (address)){
                    return true
                } else{
                    addressError.innerText = "L'adresse n'est pas valide"
                    return false
                }
            }

        //// collecting value from form & stock the products ID ////

            const userData = {
                firstName: document.querySelector('#firstName').value,
                lastName: document.querySelector('#lastName').value,
                address: document.querySelector('#address').value,
                city: document.querySelector('#city').value,
                email: document.querySelector('#email').value,
            }

            const idProducts = [];
                for (let i = 0; i<dataInLocalStorage.length;i++) {
                idProducts.push(dataInLocalStorage[i].ProductId);
            }

        // After tests Send data in LS //

            if(firstNameTest() && lastNameTest() && cityTest() && emailTest() && addressTest()){
                localStorage.setItem('userData', JSON.stringify(userData))
                console.table(userData)
            }else{
                console.log('ERROR form')
            }

        // object to send to server //
           
            const contact = {
                userData,
                idProducts,
            }


        //// USE OF METHOD POST WITH FETCH TO SEND THE DATA ON SERVER //// post order postman est ton ami

            const promise = fetch("http://localhost:3000/api/products/order",{
                method: "POST",
                body: JSON.stringify(contact),
                headers:{
                    "Content-type" : "application/json",
                }
                
            })
            console.log(promise) // 400
            /*
            promise.then(async(response)=>{
                try{
                    console.log('response')
                    console.log(response)
                    const content = await response.JSON()
                    console.log(content)
                }catch(e){
                    console.log(e)
                }
            })*/
    })
    





/*

  **************
 * HTML DU FORM *
  **************

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