const form = document.getElementById('soft')
let username, message

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  for (const pair of formData.entries()) {
    if(pair[0] == 'username') {
        username = pair[1]
    }else{
        message = pair[1]
    }
  }
})

const add_post = function() {
    fetch("https://localhost:5000/posts", {
  method: "POST",
  body: JSON.stringify({
    username: username,
    message: message
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})}