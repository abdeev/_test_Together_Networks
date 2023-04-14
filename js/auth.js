const loginBntEl = document.querySelector(".button--Login");
const inputsEl = document.querySelector(".authInputs");
// const loginBntEl = document.querySelector(".button--Login");

const onLoginClick = (e) => {
  e.preventDefault();
  loginBntEl.classList.toggle("active");
  inputsEl.classList.toggle("active");
  //   loginBntEl.removeEventListener("click", onLoginClick);
};

loginBntEl.addEventListener("click", onLoginClick);
