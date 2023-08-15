const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.reserved)');
const count = document.getElementById('count');
const price = document.getElementById('price');


function updateCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.gree');

    count.innerText = selectedSeats.length;
    price.innerText = selectedSeats.length * 150;

    if (parseInt(count.innerText) > 0) {
        const button = document.querySelector('.pay-btn');
        button.classList.add('clickable');
    
    }
    else {
        const button = document.querySelector('.pay-btn');
        button.classList.remove('clickable');
    }
}

container.addEventListener('click', function(e) {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved'))
    {
        e.target.classList.toggle('gree');
    }

    updateCount();
});



