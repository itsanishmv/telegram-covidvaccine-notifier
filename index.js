
const fetch = require("node-fetch")
const req = require("request")

var date = "11-08-2021"
var district_id = "297"

var cowinApi = async () => {
    
    let response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`)
    
    let data = await response.json()
    
    data.sessions.map(items => {
        getData(items)
    })
    
    
}
function getData(item) {
    console.log(item)
    if (item.available_capacity_dose1 === 0) {
        passMessage("testing netlify server 3.0.4")
      
    } else {
        if (item.fee_type === "free") {
            passMessage(`Sir, your covid vax slot is Available at  ${item.block_name} ${item.name} vaccine : ${item.vaccine} fee : ${item.fee}Rs`)
            
        } else {
            console.log(' Only paid vaccine slots')
        }
  
    }
}

    setInterval(() => {
        cowinApi()
    }, 70000)


    function passMessage(message) {
        var chatId = "democovid"
        var tel_api = `https://api.telegram.org/bot1875198205:AAHwFMtztN8qx2Gi1okDIoKS2PCJuySEVt4/sendMessage?chat_id=@${chatId}&text=${message}`
        req(tel_api)
    
    }

