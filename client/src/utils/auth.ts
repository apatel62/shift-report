import { JwtPayload, jwtDecode } from "jwt-decode";

interface IdPayload {
  id: string;
}

class AuthService {
  getProfile() {
    // return the decoded token
    const token = this.getToken();
    const decoded: JwtPayload = jwtDecode(token);
    return decoded;
  }

  loggedIn() {
    // return a value that indicates if the user is logged in
    const token = this.getToken();
    if (token === "undefined") {
      localStorage.removeItem("token");
    } else if (token) {
      const isExpired = this.isTokenExpired(token);
      return token && !isExpired;
    } else {
      return false;
    }
  }

  isTokenExpired(token: string) {
    // return a value that indicates if the token is expired
    if (token) {
      const data = jwtDecode<JwtPayload>(token);
      const curTime = Date.now() / 1000; // current time in seconds
      return data?.exp && data.exp < curTime; // returns true if data.exp is less than the curTime and false for the vice versa
    } else {
      return true;
    }
  }

  getToken(): string {
    // return the token
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    } else {
      return "";
    }
  }

  login(idToken: string) {
    // set the token to localStorage
    localStorage.setItem("token", idToken);
    const decodedToken = jwtDecode<IdPayload>(idToken);
    // console.log(decodedToken);
    const userId = decodedToken.id;
    localStorage.setItem("userId", userId);
    // redirect to the home page
    window.location.assign("/");
  }

  logout() {
    // remove the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // redirect to the login page
    window.location.assign("/");
  }
}

export default new AuthService();
