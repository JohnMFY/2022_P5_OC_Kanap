// hello HELL //

////// RECOVERY OF THE ID PRODUCT //////
const productUrlId = window.location.search
console.log(productUrlId)

const UrlParams = new URLSearchParams(productUrlId)
console.log(UrlParams)

const idProduct= UrlParams.get("id")
console.log(idProduct)

////// GET THE DATA BY THE ID //////

fetch(`http://localhost:3000/api/products/${idProduct}`)
.then(res => res.json())
.then((data) => console.log(data))   

/*
let response = await fetch(`http://localhost:3000/api/products/${idProduct}`)
    console.log(response)
  let productData = [];
  console.log(productData)
  response()
  console.log(response)
*/


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