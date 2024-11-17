

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
        LoadSurveys(usersid)
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