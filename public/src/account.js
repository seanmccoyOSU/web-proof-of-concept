

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
        let login_message = document.createElement("p")
        login_message.textContent = `hello ${json.name}!`
        document.getElementById("top").appendChild(login_message)

        document.getElementById("createSurvey").removeAttribute("hidden")
        document.getElementById("mySurveys").removeAttribute("hidden")

        let usersid = json.id
        LoadSurveys(usersid)
    }
    else {
        let error_message = document.createElement("p")
        error_message.textContent = "You are not logged in"
        document.getElementById("body").appendChild(error_message)
    }
}

function LoadSurveys(usersid) {
    fetch(window.location.origin + "/users/" + usersid + "/surveys", { 
        method: "GET",
        headers: {
            "Content-type": "application/json",
          },
      })
        .then((response) => response.json())
        .then((json) => InterpretList(json))
}

function InterpretList(json) {
    console.log(json)
    Object.values(json).forEach( function(item, value, arr) {
        console.log(item)
        let survey = document.createElement("p")
        survey.textContent = item.title
        document.getElementById("body").appendChild(survey)
    })
}

document.addEventListener("DOMContentLoaded", LoadCurrentUser)