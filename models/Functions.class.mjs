import database from "./DataBase.class.mjs";
import CommentCardView from "../components/CommentCard.js";

class Functions {
  static createRandomId = function () {
    return `${this.randomLetter()}${this.randomLetter()}${this.randomLetter()}${this.randomNumber()}${this.randomNumber()}${this.randomNumber()}${this.randomLetter()}${this.randomLetter()}${this.randomNumber()}${this.randomNumber()}${this.randomNumber()}${this.randomLetter()}${this.randomNumber()}${this.randomNumber()}${this.randomNumber()}`;
  };

  static randomLetter() {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
  }

  static randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  static setLocalStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  static getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static logOff() {
    this.setLocalStorage('currentUserInSession', {})
  }

  constructor() {
    this.inputs = document.querySelectorAll(".required");
    this.inputErrorMsgs = document.querySelectorAll(".invalid-msg");
    this.emailRegexValidate = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  }

  resetInputs() {
    for (let index = 0; index < this.inputs.length; index++) {
      this.inputs[index].style.border = "1px solid #8D8D99";
      this.inputs[index].value = "";
    }
  }

  errorInvalidInput(index) {
    this.inputs[index].style.border = "1px solid #F75A68";
    this.inputErrorMsgs[index].style.display = "block";
  }

  acceptedInput(index) {
    this.inputs[index].style.border = "1px solid #00875F";
    this.inputErrorMsgs[index].style.display = "none";
  }

  isNameValidate(index) {
    if (this.inputs[index].value.length < 3) {
      this.errorInvalidInput(index);
      return false;
    } else {
      this.acceptedInput(index);
      return true;
    }
  }

  isOldPassValidate(index) {
    const btnSaveEdit = document.getElementById("save-edit-profile");
    btnSaveEdit.setAttribute("disabled", "");
    btnSaveEdit.style.backgroundColor = "#323238";
    if (this.inputs[index].value === database.currentUserInSession.password) {
      console.log(index + 1);
      this.acceptedInput(index);
      this.inputs[index + 1].removeAttribute("disabled", "");
      this.inputs[index + 1].classList.remove("disable");
      return true;
    } else {
      this.errorInvalidInput(index);
      return false;
    }
  }

  isNewPassValidate(index) {
    const btnSaveEdit = document.getElementById("save-edit-profile");
    btnSaveEdit.setAttribute("disabled", "");
    btnSaveEdit.style.backgroundColor = "#323238";
    if (
      this.inputs[index].value.length > 6 &&
      this.inputs[index].value != this.inputs[index - 1].value &&
      this.inputs[index - 1].value != ""
    ) {
      this.acceptedInput(index);
      this.inputs[index + 1].removeAttribute("disabled", "");
      this.inputs[index + 1].classList.remove("disable");
      return true;
    } else {
      this.errorInvalidInput(index);
      return false;
    }
  }

  repeteNewPassValidate(index) {
    const btnSaveEdit = document.getElementById("save-edit-profile");
    btnSaveEdit.setAttribute("disabled", "");
    btnSaveEdit.style.backgroundColor = "#323238";
    if (
      this.inputs[index].value === this.inputs[index - 1].value &&
      this.inputs[index - 2].value === database.currentUserInSession.password
    ) {
      this.acceptedInput(index);
      btnSaveEdit.removeAttribute("disabled", "");
      btnSaveEdit.style.backgroundColor = "#478ebd";
      return true;
    } else {
      this.errorInvalidInput(index);
      return false;
    }
  }

  isEmailValidate(index) {
    if (this.emailRegexValidate.test(this.inputs[index].value)) {
      this.acceptedInput(index);
      return true;
    } else {
      this.errorInvalidInput(index);
      return false;
    }
  }

  isPasswordValidate(index) {
    if (this.inputs[index].value.length < 6) {
      this.errorInvalidInput(index);
      return false;
    } else {
      this.acceptedInput(index);
      return true;
    }
  }

  static renderAllCommentsByIdPost(idPost) {
    database.comments.forEach(comment => {
      if (comment.idPost === idPost) {
        const author = database.users.find(user => user.id === comment.idAuthor);
        new CommentCardView(comment, author.name, author.image);
  
        if (document.getElementById(`btn-trash-${comment.idComment}`)) {
          const btnDelComment = document.getElementById(
            `btn-trash-${comment.idComment}`
          );
  
          btnDelComment.addEventListener(
            'click',
            function delCommentByIdComment(event) {
              const numberId = event.currentTarget.id.split('-')[2];
              console.log(numberId);
              database.removeComment(numberId);
              const allComments = document.getElementById(
                `all-comments-${comment.idPost}`
              );
              allComments.innerText = '';
              renderAllCommentsByIdPost(comment.idPost);
            }
          );
        }
      }
    });
  }

}

export default Functions;
