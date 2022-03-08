//// RECUPERATION OF DATA IN LOCALSTORAGE ////

let dataInLocalStorage = JSON.parse(localStorage.getItem('productDataLocalStorage'))

//// LOOP TO GET DATA FROM API AND INCRENTATION OF ARTICLE INNERHTML ////

    let boxArticleCart = document.getElementById('cart__items');
    let articlesPromise = []; // promises storage
    let prices = []; // price storage

    async function looping(){ //function who stock all data dynamically
        
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
                    <p>Qté : ${dataLocalStorage.ProductQuantity}</p>
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
                
                boxArticleCart.innerHTML = articles.join('') // dynamically put the product in the DOM
            
                //// DELETE PRODUCT OF CART ////
                    deleteProductFromCart(dataInLocalStorage)

                //// MODIFICATION OF QUANTITY ////
                    quantityModification(dataInLocalStorage)  

                //// TOTAL PRICE & QUANTITY ////
                    totalQuantityAndPrice(dataInLocalStorage)

            });
        }); 
    }

    afterPromise()

//// TOTAL PRICE & QUANTITY ////

    function totalQuantityAndPrice(dataInLocalStorage){ //do the total quantity and total prices of products

        // QUANTITY INTEGRATE IN THE DOM //

            let productsTotalQuantity = 0
            let productsQuantityInput = Array.from(document.getElementsByClassName('itemQuantity'))
            
            for (let j = 0; j < productsQuantityInput.length; j++){
                productsTotalQuantity += productsQuantityInput[j].valueAsNumber                      
            }

            let totalQuantity = document.getElementById('totalQuantity')
            totalQuantity.innerHTML = productsTotalQuantity
            
        // TOTAL PRICE INTEGRATE IN THE DOM //
            let productsTotalPrice = 0
            const productsPrice = [];

            for (let price of prices){

                let productPrice = Object.values(price)
                let productPriceString = productPrice.toString()
                productsPrice.push(productPriceString)
            } 

            for (let j = 0; j < productsQuantityInput.length; j++){
            productsTotalPrice += (productsQuantityInput[j].valueAsNumber * productsPrice[j])
            }
            
            let totalPrice = document.getElementById('totalPrice')
            totalPrice.innerHTML = productsTotalPrice

    }

//// DELETE PRODUCT OF CART ////

    const deleteProductFromCart = (dataInLocalStorage) =>{ // function to suppressed product from the DOM and the LocalStorage

        let deleteBtn = Array.from(document.getElementsByClassName('deleteItem')) // create an array of the HTMLcollection

        for(let i = 0; i < deleteBtn.length; i++){

            let buttonDel = deleteBtn[i]
            let productInCart = document.querySelectorAll('.cart__item')
            let productInCartId = productInCart[i].dataset.id
            let productInCartColor = productInCart[i].dataset.color

            buttonDel.addEventListener('click', function(e){

                // Remove item from LocalStorage //
                dataInLocalStorage = dataInLocalStorage.filter( e => (e.ProductId !== productInCartId || e.ProductColor !== productInCartColor))
                localStorage.setItem('productDataLocalStorage', JSON.stringify(dataInLocalStorage)); 

                // Remove article of the DOM //
                let buttonDelClick = e.target
                buttonDelClick.closest('.cart__item').remove()

                // call to update price and quantity //
                totalQuantityAndPrice(dataInLocalStorage) 
            })       
        } 
    }

//// MODIFICATION OF QUANTITY ////

    function quantityModification(dataInLocalStorage){ //function to modify the quantity of the products

        let quantityInput = Array.from(document.querySelectorAll(".itemQuantity"))
        let qtyDivDom = Array.from(document.querySelectorAll('.cart__item__content__settings__quantity'))

        for (let k = 0; k < quantityInput.length; k++){

                
                

            quantityInput[k].addEventListener("change" , () =>{

                let QuantityInLocalStorage = dataInLocalStorage[k].ProductQuantity
                let quantityInputValue = quantityInput[k].value
                
                if (quantityInputValue > 0){

                    //change the quantity of the element and update data in LS //
                    let newQantity = dataInLocalStorage.map((product) => (product.quantityInputValue !== QuantityInLocalStorage))
                    newQantity.ProductQuantity = quantityInputValue
                    
                    dataInLocalStorage[k].ProductQuantity = newQantity.ProductQuantity
                    localStorage.setItem('productDataLocalStorage', JSON.stringify(dataInLocalStorage))
                
                    // change DOM //
                    let qtyDom = qtyDivDom[k]
                    let qtyP = qtyDom.children[0]
                    let newQtyDom = document.createElement('p')
                    newQtyDom.textContent = `Qté : ${quantityInputValue}`;
                    qtyDom.replaceChild(newQtyDom, qtyP)

                    
                    // call to update price and quantity //
                    totalQuantityAndPrice(dataInLocalStorage)

                }else{
                    alert('Votre quantité ne peut être de 0 !\nSupprimer votre produit si vous ne désirez plus le commander.')
                }  
            })   
        }
    } 

////// RECUPERATION OF FORM DATA //////

    const btnOrder = document.querySelector('#order')
    btnOrder.addEventListener('click', (e) =>{
        e.preventDefault()

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
                    firstNameError.innerHTML = ''
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
                    lastNameError.innerHTML = '' 
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
                    cityError.innerHTML = ''
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
                    emailError.innerText =''
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
                    addressError.innerText =''
                    return true
                } else{
                    addressError.innerText = "L'adresse n'est pas valide"
                    return false
                }
            }

        //// collecting value from form & stock the products ID ////

            const contact = {
                firstName: document.querySelector('#firstName').value,
                lastName: document.querySelector('#lastName').value,
                address: document.querySelector('#address').value,
                city: document.querySelector('#city').value,
                email: document.querySelector('#email').value,
            }

            const products = [];
                for (let i = 0; i<dataInLocalStorage.length;i++) {
                products.push(dataInLocalStorage[i].ProductId);
            }

        // After tests Send data in LS //

            if(firstNameTest() && lastNameTest() && cityTest() && emailTest() && addressTest()){

                localStorage.setItem('contact', JSON.stringify(contact))

                // object to send to server //
            
                    const userData= {
                        contact,
                        products,
                    }

                //// USE OF METHOD POST WITH FETCH TO SEND THE DATA ON SERVER ////

                    const userDataPost = {
                        method: "POST",
                        body: JSON.stringify(userData),
                        headers:{
                            "Content-type" : "application/json"
                        },    
                    }
                    fetch("http://localhost:3000/api/products/order", userDataPost)
                    .then(response => response.json())
                    .then(data =>{
                        console.log(data)
                        localStorage.setItem("orderId", data.orderId)
                        window.location = `confirmation.html?orderId=${data.orderId}`
                    })
                    .catch((error) => console.log(error));    

            }else{
                console.log('ERROR form')
            }
    })