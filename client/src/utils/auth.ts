import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    const decoded: JwtPayload = jwtDecode(token);
    return decoded;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    if (token === 'undefined'){
      localStorage.removeItem('token');
    }else if(token) {
      const isExpired = this.isTokenExpired(token);
      return token && !isExpired;
    } else {
      return false;
    }
    
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    if (token) {
      const data = jwtDecode<JwtPayload>(token);
      const curTime = Date.now() / 1000; //current time in seconds
      return data?.exp && data.exp < curTime;  //returns true if data.exp is less than the curTime and false for the vice versa
    } else {
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    const token = localStorage.getItem('token');
    if(token) {
      return token;
    } else {
      return "";
    }
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/') ;
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();