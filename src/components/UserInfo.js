export class UserInfo {
  constructor(profileConfig) {
  this._nameSelector = profileConfig.nameSelector;
  this._jobSelector = profileConfig.jobSelector;
  this._nameElement = document.querySelector(`.${this._nameSelector}`);
  this._jobElement = document.querySelector(`.${this._jobSelector}`);
  } 
  
  getUserInfo() {
   return {
    name: this._nameElement.textContent,
    job: this._jobElement.textContent
   
   }
   
}
  setUserInfo(item) {
    this._nameElement.textContent = item.name;
    this._jobElement.textContent = item.job
 }
}

