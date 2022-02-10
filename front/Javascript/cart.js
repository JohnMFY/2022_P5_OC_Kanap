let dataInLocalStorage = JSON.parse(localStorage.getItem('productDataLocalStorage'))
console.log(dataInLocalStorage)

for(let productDataLocalStorage of dataInLocalStorage){

    let ProductId = productDataLocalStorage.ProductId
    fetch(`http://localhost:3000/api/products/${ProductId}`)
    .then(res => res.json())
    .then((data) => {
        productData = data 
        const article = render(productData, productDataLocalStorage);
        
        let boxArticleCart = document.getElementById('cart__items')
        boxArticleCart.innerHTML += article
            
    })
    .catch((error) => console.log(error));
}

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

        
/*
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
*/