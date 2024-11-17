

function LoadCurrentUser() {
    fetch(window.location.origin + "/users", { 
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
        let usersid = json.id
        AddSurvey(usersid)
    }
}

function AddSurvey(usersid) {
    fetch(window.location.href, { 
        method: "POST",
        body: JSON
        .stringify
        ({
          userId: usersid,
          title: document.getElementById("title").value
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => InterpretSubmit(json))
}

function InterpretSubmit(json) {
    console.log(json)
    if (!json.error) {
      window.location.assign(window.location.origin + "/users/account")
    } else {
      let errorText = document.createElement("p")
      errorText.textContent = json.error
      document.getElementById("body").appendChild(errorText)
    }
}

document.getElementById("submit").addEventListener("click", LoadCurrentUser)