export class Api {
  constructor (settings) {
    this._url = settings.url;
    this._headers = settings.headers;
  }   

  getCards() {
    return fetch (`${this._url}/cards`, 
    {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) {
      return res.json();    
      } else {
      return Promise.reject (res.status); 
    }}
     )} 

  getUserProfile() {
    return fetch (`${this._url}/users/me`, 
    {
      method: 'GET',
      headers: this._headers
      })
    .then ((res) => {
      if(res.ok) {
      return res.json();    
      } else {
      return Promise.reject (res.status); 
      }}
   )}   

addNewCard({name: name, link: link}) {
  return fetch (`${this._url}/cards`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify ({
     name: name,
     link: link
     })
  }).then ((res) => {
    if(res.ok) {
    return res.json();    
    } else {
    return Promise.reject (res.status); 
    }
 })
 .catch((err) => {
  console.log(`Ошибка - ${err}`);
   })
}

deleteCard(cardId) {
  return fetch (`${this._url}/cards/${cardId}`, {
    method: "DELETE",
    headers: this._headers,
   }).then ((res) => {
    if(res.ok) {
    return res.json();    
    } else {
    return Promise.reject (res.status); 
    }
 })
 .catch((err) => {
  console.log(`Ошибка - ${err}`);
   })
}

 updateUserProfile({name: name, job: job}) {
    return fetch (`${this._url}/users/me`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify ({
      name: name,
      about: job 
    })
      }).then ((res) => {
        if(res.ok) {
        return res.json();    
        } else {
        return Promise.reject (res.status); 
        }
     })
     .catch((err) => {
      console.log(`Ошибка - ${err}`);
     })
  }

  switchCardLikes(idCard, likeStatus) {
    return fetch (`${this._url}/cards/${idCard}/likes`, {
     method: likeStatus ? "DELETE" : "PUT",
     headers: this._headers,
    })
    .then ((res) => {
      if(res.ok) {
      return res.json();    
      } else {
      return Promise.reject (res.status); 
    }
    }) 
      }
      
   changeAvatar(data) {
    console.log(data);
    return fetch (`${this._url}/users/me/avatar`, 
    {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        avatar: data.avatar,
      })
      })
    .then ((res) => {
      if(res.ok) {
      return res.json();    
      } else {
      return Promise.reject (res.status); 
      }}
   )}      
}

