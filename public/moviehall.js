const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('click', function() {
        document.getElementById("bt").classList.add("clickable");
        // Remove the "click" class from all elements
        boxes.forEach(box => box.classList.remove('click'));
        
        // Add the "click" class to the currently clicked element
        box.classList.add('click');

    });
});
