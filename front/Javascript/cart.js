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

                    console.log('click is working')

                    // Remove article of the DOM //
                    let buttonDelClick = e.target
                    buttonDelClick.closest('.cart__item').remove()

                    // Remove item from LocalStorage //
                   
                    let deletedId = dataInLocalStorage[i].ProductId;
                    let deletedColor = dataInLocalStorage[i].ProductColor; // recuperation of data id & color associate to the article of the buttonDel clicked
                    
                    dataInLocalStorage = dataInLocalStorage.filter( e => e.ProductId !== deletedId || e.ProductColor !== deletedColor ); // exclusion of data from upper variable and creation of new array         
                    localStorage.setItem('productDataLocalStorage', JSON.stringify(dataInLocalStorage)); // replacement of array in LocalStorage

                    location.reload(); // we can use location.reload() to avoid "bug" (Cannot read properties of undefined (reading 'ProductId')) who can appear time to time with big cart
                    
                })       
            } 

            //// TOTAL PRICE & QUANTITY ////
            
                // QUANTITY IN THE DOM //

                    let productsTotalQuantity = 0
                    let productsQuantityInput = Array.from(document.getElementsByClassName('itemQuantity'))
                    
                    for (let j = 0; j < productsQuantityInput.length; j++){
                        productsTotalQuantity += productsQuantityInput[j].valueAsNumber //valueAsNumber if only value = JS dark magic string + string 1+2 = 12
                    }

                    let totalQuantity = document.getElementById('totalQuantity')
                    totalQuantity.innerHTML = productsTotalQuantity
                    
                //

        });
    });        
}

afterPromise();
  



    
/*
    // PRICE //
       let productTotalPrice = 0
        productData.forEach(product => {
            productTotalPrice += product.price * product.ProductQuantity
        })
        console.log(productTotalPrice)
        const totalPrice = document.getElementsById('totalPrice')
        totalPrice.innerHTML = `
        ${productTotalPrice}
        `
   
//// MODIFICATION OF QUANTITY ////

        let quantitySelected = document.getElementsByClassName("itemQuantity");
      

        for (let i = 0; i < quantitySelected.length; i++){  
            

            quantitySelected[i].addEventListener("change" , (event) => {
                
                let quantityModif = dataInLocalStorage[i].ProductQuantity;
                let quantitySelectedValue = quantitySelected[i].value;
                
                const resultFind = dataInLocalStorage.find((element) => element.quantitySelectedValue !== quantityModif);

                resultFind.ProductQuantity= quantitySelectedValue;
                dataInLocalStorage[i].ProductQuantity = resultFind.ProductQuantity;

                localStorage.setItem('productDataLocalStorage', JSON.stringify(dataInLocalStorage));

                location.reload();
            })
        }
*/