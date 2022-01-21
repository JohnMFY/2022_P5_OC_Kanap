//hello HELL

const productUrlId = window.location.search
console.log(productUrlId)

const UrlParams = new URLSearchParams(productUrlId)
console.log(UrlParams)

const id = UrlParams.get("id")
console.log(id)
//function not correct /!\
/*
let productData = []
const fetchProduct = async () => {
    await fetch(`http://127.0.0.1:5501/front/html/product.html?${product}`)
    .then((res) => res.json())   
    .then((promise) => {
        console.log(promise)
    }) 
}*/

/*  **** DATA TO INSERT **** :

 /////// IMAGE & ALT //////

    <div class="item__img">
        <!-- <img src="../images/logo.png" alt="Photographie d'un canapé"> -->
    </div>

 ////// TITLE //////

    <h1 id="title"><!-- Nom du produit --></h1>

 ////// PRICE //////
    <p>Prix : <span id="price"><!-- 42 --></span>€</p>

 ////// DESCRIPTION //////

    <p id="description"><!--description --></p>

 ////// COLOR //////

    <select name="color-select" id="colors">
        <option value="">--SVP, choisissez une couleur --</option>
        <!--
            <option value="vert">vert</option>
            <option value="blanc">blanc</option>
        -->
    </select>

*/