const baseURL = 'https://seun-epicmail.herokuapp.com/api/v1';
// const baseURL = 'http://localhost:3000/api/v1';

const signUp = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#pass').value.trim();
  const firstname = document.querySelector('#fname').value.trim();
  const lastname = document.querySelector('#lname').value.trim();

  // selecting labels

  // const emailLabel = document.querySelector('[for="email"]');
  // const passwordLabel = document.querySelector('[for="psw"]');
  // const firstNameLabel = document.querySelector('[for="name"]');
  // const lastNameLabel = document.querySelector('[for="lname"]');

  const errors = document.querySelectorAll('.error-message');
  // console.log('err', errors);

  try {
    const result = await fetch(`${baseURL}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },

      // must match the input field naming
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname
      })
    });
    const jsonRes = await result.json();
    console.log('signup', jsonRes);


    if (jsonRes.status === 400) {
      if (jsonRes.error.email) {
        // emailLabel.style.color = '#ff0000';
        errors[0].textContent = jsonRes.error.email;
      }

      if (jsonRes.error.password) {
        // passwordLabel.style.color = '#ff0000';
        errors[1].textContent = jsonRes.error.password;
      }


      if (jsonRes.error.firstname) {
        // firstNameLabel.style.color = '#ff0000';
        errors[2].textContent = jsonRes.error.firstname;
      }

      if (jsonRes.error.lastname) {
        // lastNameLabel.style.color = '#ff0000';
        errors[3].textContent = jsonRes.error.lastname;
      }
    }

    if (jsonRes.status === 409) {
      console.log('409', jsonRes);
      // emailLabel.style.color = '#ff0000';
      errors[0].textContent = jsonRes.error;
    }

    /**
     * Options I thought of while doing this:
     * 1. Clear the errors on user keyup
     * 2. Errors should disappear after sometime
     */

    localStorage.setItem('token', jsonRes.token);
    if (jsonRes.status === 201) {
      const success = document.querySelector('.success');
      success.innerHTML = 'Signup was successful';
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

const firstnameUp = () => {
  errors[2].textContent = '';
};

const lastnameUp = () => {
  errors[3].textContent = '';
};

document.querySelector('#form').addEventListener('submit', signUp);

document.querySelector('#email').addEventListener('keyup', emailUp);
document.querySelector('#pass').addEventListener('keyup', passwordUp);
document.querySelector('#fname').addEventListener('keyup', firstnameUp);
document.querySelector('#lname').addEventListener('keyup', lastnameUp);
