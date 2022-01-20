//hello HELL
fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => console.log(data))

let product = new URLSearchParams(window.location.search)
console.log(product)
/*
const pageProduct = async () => {
    await fetch (`http://localhost:3000/api/products/${product}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    })
    .catch(error => console.log('ERROR'))
}
pageProduct();*/


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