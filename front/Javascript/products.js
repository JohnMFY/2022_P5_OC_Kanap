//hello HELL
let urlData = new URL ('http://localhost:3000/api/products')
let params = new URLSearchParams(window.location.search)


    fetch('http://localhost:3000/api/products')
    .then (res => res.text())
    .then(console.log)


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