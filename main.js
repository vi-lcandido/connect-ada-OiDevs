import Functions from "./models/Functions.class.mjs";
import Alert from "./components/Alert.js";
import database from "./models/DataBase.class.mjs";
import maneger1 from "./models/Manager.class.mjs";

console.log(maneger1);

//Alert

const userNotFoundAlert = new Alert(
  "Email e/ou senha incorreta",
  "../../assets/warning.svg",
  "#F75A68"
);

//fim do alert

database.initialization();

const loginBtn = document.getElementById("loginBtn");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");

function startSession(e) {
  e.preventDefault();
  if (database.authenticate(userEmail.value, userPassword.value)) {
    console.log("usuário logado");
    window.location.href = "./pages/Feed/feed.html";
  } else {
    userNotFoundAlert.showAlert();
  }
}

loginBtn.addEventListener("click", startSession);

export default loginBtn;
