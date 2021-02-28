/*
let reviewExpenseButton = document.getElementById('review-expense-button');
let modal = document.getElementById('modal');
let close = document.getElementById('close');


reviewExpenseButton.addEventListener('click', () => modal.classList.add('show-modal'));
close.addEventListener('click', () => modal.classList.remove('show-modal'));

window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal') : false);
*/

// window.addEventListener('click', (e) => {
//     if (e.target == document.querySelectorAll(".modal-container") ){
//     document.querySelectorAll(".modal-container").style.display = "none";
//     } else {
        
//     }
// })

let a = document.querySelectorAll(".review-expense-button");
let b = document.querySelectorAll(".modal-container")
let c = document.querySelectorAll(".close")
for (let i = 0; i < a.length; i++) {
    a[i].addEventListener('click', () => {
        b[i].style.display = "block";
    })
    c[i].addEventListener('click', () => {
        b[i].style.display = "none";
    })
}

document.querySelector('#sub').addEventListener('click', () => {
    var checkBoxes = document.getElementsByClassName( 'categoryCheckbox' );
    var isChecked = false;
    for (var i = 0; i < checkBoxes.length; i++) {
        if ( checkBoxes[i].checked ) {
            isChecked = true;
        };
    };
    if ( isChecked ) {
        
        } else {
            alert( 'Please, check at least one checkbox!' );
            event.preventDefault();
        }   
})

// document.querySelectorAll(".review-expense-button").forEach(elem => elem.addEventListener("click",
//  () => {
//     document.querySelector(".modal-container").style.display = "block";
// }));

// document.querySelectorAll(".close").forEach(elem => elem.addEventListener("click",
//  () => {
//     document.querySelector(".modal-container").style.display = "none";
// }));

// window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal') : false);


function checkCat() {
    var checkBoxes = document.getElementsByClassName( 'categoryCheckbox' );
    var isChecked = false;
    for (var i = 0; i < checkBoxes.length; i++) {
        if ( checkBoxes[i].checked ) {
            isChecked = true;
        };
    };
    if ( isChecked ) {
        
        } else {
            alert( 'Please, check at least one checkbox!' );
        }   
}


