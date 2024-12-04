function LoadUsers() {
    fetch(window.location.href + "users/list", { 
        method: "GET"
      })
        .then((response) => response.json())
        .then((json) => InterpretList(json))
}

function InterpretList(json) {
    console.log(json)
    Object.values(json).forEach( function(item, value, arr) {
        console.log(item)
        let user = document.createElement("p")
        user.textContent = item.name
        document.getElementById("body").appendChild(user)
    })
    LoadCurrentUser()    
}

function LoadCurrentUser() {
    fetch(window.location.href + "users", { 
        method: "PUT",
        body: JSON
        .stringify
        ({
          token: localStorage.getItem("token")
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => InterpretUser(json))
}

function InterpretUser(json) {
    console.log(json)
    if (!json.error) {
        document.getElementById("logout").removeAttribute("hidden")
        let header = document.createElement("h2")
        header.textContent = "Logged in as"
        document.getElementById("body").appendChild(header)
        let user = document.createElement("p")
        user.textContent = json.name
        document.getElementById("body").appendChild(user)
    }
}

function LogOut() {
    localStorage.removeItem("token")
    location.reload()
}


//document.addEventListener("DOMContentLoaded", LoadCurrentUser)
document.addEventListener("DOMContentLoaded", LoadUsers)
document.getElementById("logout").addEventListener("click", LogOut)
//document.getElementById("account").addEventListener("click", AccessAcount)
