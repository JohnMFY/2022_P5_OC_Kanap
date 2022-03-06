/**//** DATA INSERT DYNAMICALLY IN THE DOM **//**/

   ////// RECOVERY OF THE ID PRODUCT IN THE URL WITH PARAMS //////
      const productUrlId = window.location.search
      const UrlParams = new URLSearchParams(productUrlId)
      const idProduct= UrlParams.get("id")

   ////// WITH THE ID GET THE PRODUCT DATA IN A ARRAY //////
      async function callProductById(){
         await fetch(`http://localhost:3000/api/products/${idProduct}`)
         .then(res => res.json())
         .then((data) => (productData = data))  
      }

   ////// DATA TO INSERT DYNAMICALLY IN THE DOM FOR THE PRODUCT CARD //////
      async function productDataDisplay(){
         await callProductById()
         // TITLE //
         let productTitle = document.querySelector('title')
         productTitle.innerHTML=`${productData.name}`
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
         //COLORS SELECTION DONE WITH A FOR TO HAVE DYNAMICALLY THE COLORS SELECTION (VALUE COULD BE = TO i)//
         let colors = productData.colors
         for (let i=0; i < colors.length; i++){
            document.getElementById('colors').innerHTML += `
               <option value="${colors[i]}">${colors[i]}</option>
            `
         }    
      }
      productDataDisplay()
      
/**//**  DATA STORE LOCALY TO BE USED ON THE CART PAGE **//**/

   ////// RECOVERY OF SELECTED OPTION DATA //////

      const colorsOption = document.getElementById('colors')
      const quantityInput = document.getElementById('quantity')

   ////// EVENT LISTENER ON ADD BUTTON TO PUT IN LOCALSTORAGE : PRODUCT ID, QUANTITY, COLOR //////
      const addBtn = document.getElementById('addToCart')
      addBtn.addEventListener('click', (event)=>{
         event.preventDefault()
         const colorSelected = colorsOption.value
         const quantitySelected = quantityInput.value

         //STOCK DATA IN A VARIABLE//
            let productOptionSelected = {
               ProductId : idProduct,
               ProductQuantity : quantitySelected,
               ProductColor : colorSelected,
            }

            const colorValue = document.getElementById('colors').value
            const quantityValue = document.getElementById('quantity').value

         // GET THE DATA WHO ARE IN THE LOCAL STORAGE //
            let dataInLocalStorage = JSON.parse(localStorage.getItem('productDataLocalStorage'))
            //console.log(dataInLocalStorage)

         // FUNCTION WHO SEND THE PRODUCT OPTIONS IN LOCAL STORAGE //
            const AddProductLocalStorage = () =>{
               dataInLocalStorage.push(productOptionSelected)
               localStorage.setItem('productDataLocalStorage', JSON.stringify(dataInLocalStorage))
            }   

         // SEND PRODUCT OPTION DATA TO LOCAL STORAGE IF THE DATA ARE NOT ALREADY ON IT AND ADJUST QUANTITY IF SAME [PRODUCT & COLOR] ADD //  
            
            if(quantityValue == 0 || colorValue == ""){
               alert("Sélectionner une couleur et une quantité");
            } 
            if ((dataInLocalStorage) && !(quantityValue == 0 || colorValue == "")){

               const optionInArray = dataInLocalStorage.find
               ((element) => element.ProductId === idProduct && element.ProductColor === colorSelected);
               alert('Votre produit a bien été ajouté au panier')
               if (optionInArray) {
                     let newQuantity =
                     parseInt(productOptionSelected.ProductQuantity) + parseInt(optionInArray.ProductQuantity);
                     optionInArray.ProductQuantity = newQuantity ;
                     localStorage.setItem('productDataLocalStorage', JSON.stringify(dataInLocalStorage));
               } else {
                  AddProductLocalStorage()
               }
               
            }else if (!(quantityValue == 0 || colorValue == "")){
                  dataInLocalStorage =[];
                  AddProductLocalStorage()
            }   
      })
      
/////////* AH AH AH, YOU DIDN'T SAY THE MAGIC WORD */////////
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