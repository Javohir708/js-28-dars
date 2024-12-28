const formEl = document.querySelector('.form')
const userinputEl = document.querySelector('.username')
const passinputEl = document.querySelector('.password')
const btnEl = document.querySelector('.btn')

const BASE_URL = "https://dummyjson.com"

formEl.addEventListener('submit', e => {
    e.preventDefault()
    btnEl.setAttribute("disabled", true)
    btnEl.textContent = "Loading..."

    let user = {
        username: userinputEl.value,
        password: passinputEl.value,
        expiresInMins: 1
    }

    fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        if(!res.ok) {
            throw new Error("incorrect username or password")
        }

        return res.json() 
    })
    .then (res => {
        localStorage.setItem("accessToken", res.accessToken)
        open("/pages/dashboard.html", "_self")
    })
    .catch(err => {
        alert(err)
    })
    .finally(() => {
        btnEl.removeAttribute("disabled")
        btnEl.textContent = "Login"
    })
})

