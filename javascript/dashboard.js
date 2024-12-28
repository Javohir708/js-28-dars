const logoutbtnEl = document.querySelector(".logout-btn")

logoutbtnEl.addEventListener('click', e => {
    localStorage.removeItem("accessToken")
    window.location.replace("/pages/login.html", "_self")
})

window.onload = () => {
    checkToken()
}

function checkToken () {
    // const token = localStorage.getItem("accessToken")
    // if (!token) {
    //     window.location.replace("/pages/login.html")
    // }

    fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Pass JWT via Authorization header
        }, 
      })
      .then(res => {
        if(!res.ok) {
            throw new Error("You are not authorized to view this page")
        }
        return res.json()
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        // localStorage.removeItem("accessToken")
        window.location.replace("/pages/login.html")
      })
}