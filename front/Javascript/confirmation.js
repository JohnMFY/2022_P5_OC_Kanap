const orderUrlId = window.location.search
const UrlParams = new URLSearchParams(orderUrlId)
const orderId= UrlParams.get("orderId") //recuperation of orderId trough UrlParams

let orderIdDOM = document.getElementById('orderId') 
orderIdDOM.innerHTML = orderId //insert OrderId in the DOM

localStorage.clear() //clear the local storage of the user