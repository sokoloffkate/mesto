export class UserInfo {
  constructor({nameSelector, jobSelector}) {
  this._nameElement = document.querySelector(nameSelector);
  this._jobElement = document.querySelector(jobSelector);
  } 
  
  getUserInfo = () => {
    return {
    name: this._nameElement.textContent,
    job: this._jobElement.textContent,
   }
  }
   
  setUserInfo(item) {
    this._nameElement.textContent = item.name;
    this._jobElement.textContent = item.job
 }
}

