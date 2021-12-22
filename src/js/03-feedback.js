import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));
// функція записує інпути юзера в локальне сховище
function onFormInput() {
  const {
    elements: { email, message },
  } = refs.form;
  const options = {
    email: email.value,
    message: message.value.trim(),
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(options));
}
// функція заповнює інпути даними з локального сховища
function loadDataLocaleStorage() {
  const saved = localStorage.getItem(LOCALSTORAGE_KEY);
  if (saved !== null) {
    try {
      refs.form.email.value = JSON.parse(saved).email;
      refs.form.message.value = JSON.parse(saved).message;
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  }
}
loadDataLocaleStorage();

// функція перевіряє поля на заповненість
// та очищає інпути та локальне сховище після садміту
function onSubmit(event) {
  const options = {
    email: event.currentTarget.elements.email.value,
    message: event.currentTarget.elements.message.value.trim(),
  };
  event.preventDefault();
  if (!options.email || !options.message) return alert('всі поля повинні бути заповнені');
  console.log(options);
  event.currentTarget.reset();
  localStorage.clear();
}
