// hello HELL //

////// RECOVERY OF THE ID PRODUCT //////
const productUrlId = window.location.search
const UrlParams = new URLSearchParams(productUrlId)
const idProduct= UrlParams.get("id")
console.log(idProduct)

////// GET THE PRODUCT DATA WITH THE ID  //////
const callProductById = async() =>{
  await fetch(`http://localhost:3000/api/products/${idProduct}`)
   .then((res) => res.json())
   .then((data) => {
      productData = data
      console.log(productData)
   })
}
callProductById()
let productData = []
////// DATA TO INSERT //////
const productDisplay = async () => {
   await callProductById()

   document.querySelector('.item__img').innerHTML = `
      <img src="${productData.imageUrl}" alt="${productData.altTxt}">
   `
   document.getElementById('title').innerHTML=`
      <h1 id="title">${productData.name}</h1>
   `
   document.getElementById('price').innerHTML=`
      <span id="price">${productData.price}</span>
   `

   document.getElementById('description').innerHTML=`
      <p id="description">${productData.description}</p>
   `
   document.getElementById('colors').innerHTML=`
      <option value="">--SVP, choisissez une couleur --</option>
         <option value="vert">vert</option>
         <option value="blanc">blanc</option>
   `  /*
         for (let i=0; i < ${productData.colors}.length; i++){
         document.getElementById('colors').innerHTML += `
            <option value="">--SVP, choisissez une couleur --</option>
            <option value="$productData[i].colors">$productData[i].colors</option>
         `
      */
}
productDisplay()
/*

*/