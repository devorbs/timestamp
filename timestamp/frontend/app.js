function getNameAndMessage() {
  let Username = document.getElementById('username').value;
  let message = document.getElementById('message').value;

      fetch('http://localhost:5000/posts',
    {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: Username,
        message: message
      })
    }).then(res=> 
      {
      if(res.ok)
      {
        console.log("Success.")
        return res.json()
      }
      else{
        console.log("There's an error on the server")
      }
    }).then(data=> console.log(data)).catch(error => console.log(error))
  }

  const link = document.getElementById('entries-link')

  async function getData(){ 
  let response = await fetch('http://localhost:5000/posts')
  console.log(response)
  let data = await response.json()

  for(let i = 0; i < data.posts.length; i++) {

    console.log(data.posts[i].username + ': ' + data.posts[i].message)
    const elPosts = document.getElementById('main-container')

    const post_div = document.createElement('div')
    post_div.className = 'post-container';
    elPosts.appendChild(post_div)

    const name_divs = document.createElement("span");
    name_divs.className = 'name-content';
    post_div.appendChild(name_divs)

    const picture_divs = document.createElement("div");
    picture_divs.className = 'img-content';
    post_div.appendChild(picture_divs)

    const message_divs = document.createElement("span");
    message_divs.className = 'message-content';
    post_div.appendChild(message_divs)
    
  }

  let names = document.querySelectorAll('.name-content')
  let messages = document.querySelectorAll('.message-content')

  for(let i = 0; i < names.length; i++) {
    names[i].innerHTML = data.posts[i].username
  }

  for(let x = 0; x < messages.length; x++) {
    messages[x].innerHTML = data.posts[x].message
  }
  


  

  }

  getData()
  
  



