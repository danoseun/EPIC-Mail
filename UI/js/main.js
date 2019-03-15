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
