function activateElement() {
    var first = document.getElementById('first'); // Get a reference to the element with the id 'first'

    if (first) {
        var className = ' ' + first.className + ' ';

        first.className = ~className.indexOf(' active ') ?
                             className.replace(' active ', ' ') :
                             first.className + ' active';

        // Check if 'active' class is added and add 'show-border' class accordingly
        if (first.classList.contains('active')) {
            element.classList.add('show-border');
        } else {
            element.classList.remove('show-border');
        }
    } else {
        console.error("Element with id 'first' not found.");
    }
}

// Execute the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    activateElement();
});

// Assuming you have an element with the class 'one-text'
const element = document.querySelector('.one-text');
