
const foodButtons = document.querySelectorAll('.food-btn');
const selectedCountElement = document.getElementById('selected-count');
const predictButton = document.getElementById('predict-btn');

let selectedFoods = [];


foodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const food = button.dataset.food;
        
        
        const index = selectedFoods.indexOf(food);
        
        if (index === -1) {
            
            if (selectedFoods.length < 5) {
                selectedFoods.push(food);
                button.classList.add('selected');
            }
        } else {
            
            selectedFoods.splice(index, 1);
            button.classList.remove('selected');
        }
        
        
        selectedCountElement.textContent = selectedFoods.length;
    });
});


function predictLife() {
    let name = document.getElementById("name").value;
    let age = parseInt(document.getElementById("age").value);
    let gender = document.getElementById("gender").value;
    let lifestyle = document.getElementById("lifestyle").value;
    
    
    if (selectedFoods.length !== 5) {
        alert("Please select exactly 5 food items!");
        return;
    }

    let lifeExpectancy = 80;

    
    if (lifestyle === "active") lifeExpectancy += 5;
    if (lifestyle === "moderate") lifeExpectancy -= 3;

    
    let totalEnergy = 0, totalToxic = 0;
    
    selectedFoods.forEach(foodType => {
        const button = document.querySelector(`.food-btn[data-food="${foodType}"]`);
        totalEnergy += parseInt(button.dataset.energy);
        totalToxic += parseInt(button.dataset.toxic);
    });

    lifeExpectancy += (totalEnergy / 5) - (totalToxic / 5);

    
    if (lifeExpectancy > 100) lifeExpectancy = 100;
    if (lifeExpectancy < 40) lifeExpectancy = 40;

    let yearsLeft = Math.floor(lifeExpectancy - age);

    
    document.getElementById("result").innerHTML = 
        `<h2>${name}, you may live for around ${lifeExpectancy} years.<br>
        That means you have ${yearsLeft} years left.</h2>`;

    
    let percentage = (lifeExpectancy / 100) * 100;
    document.getElementById("progress-bar").style.width = percentage + "%";
    document.getElementById("avatar").style.left = percentage + "%";
    document.getElementById("avatar").innerText = gender === "male" ? "👨" : "👩";

    
    let gifContainer = document.getElementById("gif-container");
    gifContainer.innerHTML = "";
    let img = document.createElement("img");
    if (yearsLeft > 30) {
        img.src = "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif"; 
    } else {
        img.src = "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"; 
    }
    gifContainer.appendChild(img);
}


predictButton.addEventListener('click', predictLife);


function createBubbles() {
    const body = document.querySelector('body');
    const bubblesCount = 15;
    
    for (let i = 0; i < bubblesCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.top = `${Math.random() * 100}vh`;
        
        bubble.style.animation = `
            float ${Math.random() * 6 + 4}s ease-in-out infinite,
            pulse ${Math.random() * 3 + 2}s ease-in-out infinite
        `;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        
        body.appendChild(bubble);
    }
}


window.onload = function() {
    createBubbles();
};