const username = document.getElementById("userName");
let response = fetch('/api/verify').then(response => {
  if (response.ok) {
    response.json().then(data => {
      console.log(data);
      username.innerHTML = data.data.username;
    }).catch(error => console.log(error));
  }
}).catch(error => console.log(error));