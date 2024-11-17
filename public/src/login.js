function LoginUser() {
    fetch(window.location.href, { 
        method: "POST",
        body: JSON
        .stringify
        ({
          name: document.getElementById("username").value,
          password: document.getElementById("password").value
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => InterpretResponse(json))
}

function InterpretResponse(json) {
    console.log(json)
    if (json.error) {
      console.log("printing error")
      let errorText = document.createElement("p")
      errorText.textContent = json.error
      document.getElementById("body").appendChild(errorText)
    } else {
      window.location.assign(json.navTo)
    }
}


document.getElementById("login-button").addEventListener("click", LoginUser)