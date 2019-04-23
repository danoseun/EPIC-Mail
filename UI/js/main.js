// Variable declaration: Mailbox.
const viewMessage = document.querySelector('#view-message');
const table = document.querySelector('.table');
const rows = document.querySelectorAll('tr[data-href]');

// Add an event listener to the document on complete load
document.addEventListener('DOMContentLoaded', () => {
  viewMessage.style.display = 'none';

  rows.forEach((row) => {
    row.addEventListener('click', () => {
      window.location.href = row.dataset.href;

      viewMessage.style.display = 'block';
      table.style.display = 'none';
    });
  });
});


const nav = document.querySelector('.aside ul');
const hamburgerTwo = document.querySelector('.hamburger-two');

const clickHamburger = () => {
  if (nav.style.display === 'block') {
    nav.style.display = 'none'
    return false;
  } else {
    nav.style.display = 'block';
    nav.style.width = '110px';
    nav.style.marginTop = '-20px';
    nav.style.marginLeft = '5px';
  }
  
}

hamburgerTwo.addEventListener('click', clickHamburger);