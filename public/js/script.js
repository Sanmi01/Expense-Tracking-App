/*
let reviewExpenseButton = document.getElementById('review-expense-button');
let modal = document.getElementById('modal');
let close = document.getElementById('close');


reviewExpenseButton.addEventListener('click', () => modal.classList.add('show-modal'));
close.addEventListener('click', () => modal.classList.remove('show-modal'));

window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal') : false);
*/

window.addEventListener('click', (e) => {
    if (e.target == document.querySelector(".modal-container") ){
    document.querySelector(".modal-container").style.display = "none";
    } else {
        
    }
})

document.querySelectorAll(".review-expense-button").forEach(elem => elem.addEventListener("click",
 () => {
    document.querySelector(".modal-container").style.display = "block";
}));

document.querySelectorAll(".close").forEach(elem => elem.addEventListener("click",
 () => {
    document.querySelector(".modal-container").style.display = "none";
}));

// window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal') : false);




