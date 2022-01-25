/////////* AH AH AH, YOU DIDN'T SAY THE MAGIC WORD */////////

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
   console.log(productData)  
}

////// DATA TO INSERT //////
   async function productDataDisplay(){
   await callProductById()

   //IMG & ALT//
   document.querySelector('.item__img').innerHTML = `
      <img src="${productData.imageUrl}" alt="${productData.altTxt}">
   `
   //TITLE//
   document.getElementById('title').innerHTML=`
      <h1 id="title">${productData.name}</h1>
   `
   //PRICE//
   document.getElementById('price').innerHTML=`
      <span id="price">${productData.price}</span>
   `
   //DESCRIPTION//
   document.getElementById('description').innerHTML=`
      <p id="description">${productData.description}</p>
   `
   //COLORS SELECTION//
   let colors = productData.colors
   console.log(colors)
   for (let i=0; i < colors.length; i++){
      document.getElementById('colors').innerHTML += `
         <option value="${colors[i]}">${colors[i]}</option>
      `
   }    
}
productDataDisplay()

/*                                                  ____
       ___                                      .-~. /_"-._
      `-._~-.                                  / /_ "~o\  :Y
          \  \                                / : \~x.  ` ')
           ]  Y                              /  |  Y< ~-.__j
          /   !                        _.--~T : l  l<  /.-~
         /   /                 ____.--~ .   ` l /~\ \<|Y
        /   /             .-~~"        /| .    ',-~\ \L|
       /   /             /     .^   \ Y~Y \.^>/l_   "--'
      /   Y           .-"(  .  l__  j_j l_/ /~_.-~    .
     Y    l          /    \  )    ~~~." / `/"~ / \.__/l_
     |     \     _.-"      ~-{__     l  :  l._Z~-.___.--~
     |      ~---~           /   ~~"---\_  ' __[>
     l  .                _.^   ___     _>-y~
      \  \     .      .-~   .-~   ~>--"  /
       \  ~---"            /     ./  _.-'
        "-.,_____.,_  _.--~\     _.-~
                    ~~     (   _}       -Row
                           `. ~(
                             )  \
                            /,`--'~\--'~\
   https://www.youtube.com/watch?v=RfiQYRn7fBg*/