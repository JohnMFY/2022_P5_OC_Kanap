// hello HELL //

////// RECOVERY OF THE ID PRODUCT //////
const productUrlId = window.location.search
const UrlParams = new URLSearchParams(productUrlId)
const idProduct= UrlParams.get("id")
console.log(idProduct)

////// GET THE PRODUCT DATA WITH THE ID  //////

async function callProductById(){
   await fetch(`http://localhost:3000/api/products/${idProduct}`)
   .then(res => res.json())
   .then((data) => (productData = data))
   .catch((error) => console.log(error))
 }
 let productData = [];

////// DATA TO INSERT //////

const imageProduct = document.querySelector('.item__img')
imageProduct.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`

/*
 /////// IMAGE & ALT //////
    <div class="">
        <!--  -->
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