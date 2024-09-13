export default function authHeader() {
    const userStr = localStorage.getItem("user");
    //console.log("user str")
    
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
    //console.log(user);
    if (user && user.accessToken) {
      return 'Bearer ' + user.accessToken; // for Spring Boot back-end
    } else {
      return ''; // for Spring Boot back-end
    }
  }