const baseURL = 'https://seun-epicmail.herokuapp.com/api/v1';
// const baseURL = 'http://localhost:3000/api/v1';

const login = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#pass').value.trim();

  const errors = document.querySelectorAll('.error-message');
  console.log('err', errors);

  try {
    const result = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const jsonRes = await result.json();
    console.log('login', jsonRes);

    if (jsonRes.status === 400) {
      if (jsonRes.error.email) {
        errors[0].textContent = jsonRes.error.email;
      }

      if (jsonRes.error.password) {
        errors[1].textContent = jsonRes.error.password;
      }
    }

    let message = '';

    message = 'Authentication failed';
    if (jsonRes.status === 401 && jsonRes.error === message) {
      errors[0].textContent = 'Please sign up';
    }

    if (jsonRes.status === 401 && jsonRes.error === message) {
      errors[1].textContent = 'Password does not match';
    }


    localStorage.setItem('token', jsonRes.token);
    if (jsonRes.status === 200) {
      const success = document.querySelector('.success');
      success.innerHTML = 'Login was successful';
      window.location.assign('mailbox.html');
    }
  } catch (error) {
    console.error(error);
  }
};
const errors = document.querySelectorAll('.error-message');
// eslint-disable-next-line require-jsdoc
const emailUp = () => {
  errors[0].textContent = '';
};

const passwordUp = () => {
  errors[1].textContent = '';
};


document.querySelector('#form').addEventListener('submit', login);

document.querySelector('#email').addEventListener('keyup', emailUp);
document.querySelector('#pass').addEventListener('keyup', passwordUp);
