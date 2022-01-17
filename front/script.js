/////// CALL OF API //////
async function fetchProducts(){
  await fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then((data) => (productsData = data))
}
let productsData = [];

////// INSERTION OF DATA IN DOM //////
async function productInsertion(){
  await fetchProducts()
  let productContainer = document.getElementById('items');
  for (let i=0; i < productsData.length; i++){
    productContainer.innerHTML += 
    `
      <a href="./product.html?id=${productsData[i]._id}">
        <article>
          <img src="${productsData[i].imageUrl}" alt="${productsData[i].altTxt}">
          <h3 class="productName">${productsData[i].name}</h3>
          <p class="productDescription">${productsData[i].description}</p>
        </article>
      </a>
    `
  }
}
productInsertion()