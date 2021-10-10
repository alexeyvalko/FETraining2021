const date = new Intl.DateTimeFormat('ru-RU').format(new Date()); // get and format date
const footer = document.getElementById('date'); // get div with id date

footer.innerHTML = date; // append date
