export class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
  this._nameElement = document.querySelector(nameSelector);
  this._jobElement = document.querySelector(jobSelector);
  this._avatarElement = document.querySelector(avatarSelector);
  } 
  
  getUserInfo = () => {
    return {
    name: this._nameElement.textContent,
    job: this._jobElement.textContent,
    avatar: this._avatarElement.src,
   }
  }
   
  setUserInfo = (item) => {
    this._nameElement.textContent = item.name;
    this._jobElement.textContent = item.about;
    this._avatarElement.src = item.avatar;
    this._avatar = item.avatar;
    this._id = item._id;
 }
  

  getUserAvatar = () => {
    return {
      avatar: this._avatar,
    }
  }
  
  getUserId = () => {
     return {
      _id: this._id,
     }
 }
}

