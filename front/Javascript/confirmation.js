const orderUrlId = window.location.search
const UrlParams = new URLSearchParams(orderUrlId)
const orderId= UrlParams.get("orderId")
console.log(orderId)

let orderIdDOM = document.getElementById('orderId')
orderIdDOM.innerHTML = orderId

localStorage.clear()
