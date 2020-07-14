import { getRequest } from "../utils/requests";

export class GithubApi {
  static getUserProfile = (userName) => 
    getRequest(`https://api.github.com/users/${userName}`)
    
  static getUserEvents = (userName) => 
    getRequest(`https://api.github.com/users/${userName}/events/public`)
}
