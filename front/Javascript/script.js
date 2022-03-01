/////// CALL OF API //////
async function callProducts(){
  await fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then((data) => (productData = data))
  .catch((error) => console.log(error));
}
let productData = [];

////// INSERTION OF DATA IN DOM //////
async function productInsertion(){
  await callProducts()
  let productContainer = document.getElementById('items');
  let article = ''
  for (let i=0; i < productData.length; i++){
    article += 
    `
      <a href="./product.html?id=${productData[i]._id}">
        <article>
          <img src="${productData[i].imageUrl}" alt="${productData[i].altTxt}">
          <h3 class="productName">${productData[i].name}</h3>
          <p class="productDescription">${productData[i].description}</p>
        </article>
      </a>
    `
  }
  productContainer.innerHTML = article
}
productInsertion()