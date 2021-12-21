import throttle from 'lodash.throttle';
// refs = {
//   form: document.querySelector('form'),
// };
// refs.form.addEventListener('input', event => {
//   console.log(event);
// });
let formData = {};
const LOCALSTORAGE_KEY = 'feedback-form-state';
try {
  JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
const userInput = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

function fillingFormFields() {
  if (userInput) {
    refs.input.value = userInput.email || '';
    refs.textarea.value = userInput.message || '';
    formData.email = refs.input.value;
    formData.message = refs.textarea.value;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  refs.form.reset();
  localStorage.clear();
  console.log(formData);
  formData = {};
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}
fillingFormFields();
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));
