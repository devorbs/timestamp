fetch('http://localhost:5000/posts',
{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    username: "John Black",
    message: "Hello World"
  }
})
.then(res=> 
  {
  if(res.ok)
  {
    console.log("Success.")
    return res.json()
  }
  else{
    console.log("There's an error on the server")
  }
})
.then(data=> console.log(data))
.catch(error => console.log(error))