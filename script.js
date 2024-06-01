let keysPressed = {};





const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(){
    toDoButtonOnClick();
});



const markdown_textarea = document.getElementById("markdown-input")
markdown_textarea.addEventListener("keydown", function(event){
    keysPressed[event.key] = true;
    
    if (keysPressed['Shift'] && event.key == 'Enter') {
        console.log("Shift + Enter")
    }

    if (!keysPressed['Shift'] && event.key === 'Enter') {
        event.preventDefault();
        console.log("Enter only. Clear field.")
        toDoButtonOnClick();
    }
});
markdown_textarea.addEventListener("keyup", function(event){
    delete keysPressed[event.key];  
});


function toDoButtonOnClick(){
    let markdown_Text = document.getElementById('markdown-input').value 
    markdown_Text = convertNewlinesToMarkdown(markdown_Text)
    addToDoItem(markdown_Text)
    document.getElementById('markdown-input').value = ""
    document.getElementById('display-image-included').innerHTML = ""
}


function convertNewlinesToMarkdown(text) {
    return text.split('\n\n').map(para => para.split('\n').join('  \n')).join('\n\n');
}   

function addToDoItem(text) {
        
    const list = document.getElementById('to-do-list');


    // Create a new container for this item
    console.log("Create a new container for this item")
    const itemDiv = document.createElement('div');
    itemDiv.style.backgroundColor = "#B22222";
    itemDiv.classList.add('to-do-item');
    list.appendChild(itemDiv);

    // Add descriptive text
    const textMD = document.createElement('md-block');
    textMD.textContent = text;
    itemDiv.appendChild(textMD);
    
    
    const image_div = document.createElement('div');
    const image_transfer = document.getElementById('display-image-included');

    image_div.classList.add("display-image-in-container")
    image_div.style.display = "inline-block";
    image_div.style.verticalAlign = "top"
    
    image_div.innerHTML = image_transfer.innerHTML
    itemDiv.appendChild(image_div);

    // Add button div under itemDiv
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-items');
    itemDiv.appendChild(buttonDiv);
    

    console.log("Created buttondiv")
    // Add Delete button
    const delButton = document.createElement('input');
    delButton.type = "submit";
    delButton.value = "Delete";
    delButton.classList.add('button-to-do');
    delButton.addEventListener("click", function(){
        const parentDiv = this.parentElement.parentElement;
        parentDiv.remove();
    });
    buttonDiv.appendChild(delButton);
    
    // Add Done button
    const doneButton = document.createElement('input');
    doneButton.type = "submit";
    doneButton.value = "Done";
    doneButton.classList.add('button-to-do');
    doneButton.addEventListener("click", function(){
        const parentDiv = this.parentElement.parentElement;
        let currentColor = parentDiv.style.backgroundColor;
        const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;
        
        if (rgb2hex(currentColor) === '#b22222') {
            parentDiv.style.backgroundColor = "#0a5c36";
        } else {
            parentDiv.style.backgroundColor = '#b22222';
        }
    });
    buttonDiv.appendChild(doneButton);

}

document.getElementById('image-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '200px'; // Adjust as needed
            img.style.height = 'auto';
            img.style.marginLeft = "10px";
            img.style.display = "inline-block";
            img.style.verticalAlign = "top"

            const imageContainer = document.getElementById('display-image-included');
            imageContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
});

// addToDoItem('Sample', []);


/*
modify the add_to_do_object:
- input: text, array of images.
- save localstorage array: [text, [image array]]

on load:
- new object entirely. based on text and image_array

this way, no need for div counting
*/