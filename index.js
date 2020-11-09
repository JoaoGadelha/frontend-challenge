
let fetchData = async () => {
    let getData = await fetch('https://br.ongame.net/api/challenge/items/');
    let jsonData = await getData.json();

    for (let i = 0; i < itemsArray.length; i++) {
        // sets images for each item   
        let image = document.createElement('img');
        image.src = jsonData[i].image;
        itemsArray[i].appendChild(image);

        // sets titles for each item
        let subContainer = document.createElement('div');
        subContainer.className = 'sub-container';
        let title = document.createElement('p');
        title.className = 'item-title';
        title.innerHTML = jsonData[i].name;
        subContainer.appendChild(title);
        itemsArray[i].appendChild(subContainer);

        // creates redeem button for each item
        let redeemedTagBox = document.createElement('div');
        let redeemedTag = document.createElement('p');
        let checkMark = document.createElement('i');
        redeemedTagBox.className = 'redeemed-tag-box';
        redeemedTag.className = 'redeemed-tag';
        checkMark.className = 'fas fa-check';
        redeemedTagBox.appendChild(redeemedTag);
        redeemedTagBox.addEventListener('click', () => {
            clickRedeemedTagBox(jsonData[i].name, jsonData[i].image, jsonData[i].id);
        });
        if (jsonData[i].redeemed) {
            redeemedTagBox.appendChild(checkMark);
            redeemedTag.innerHTML = 'ITEM RESGATADO'
            redeemedTag.style.color = 'white';
            redeemedTagBox.style.display = 'flex';
            redeemedTagBox.style.flexDirection = 'row-reverse';
        } else {
            redeemedTagBox.style.border = 'solid #a6aca9 1px';
            redeemedTag.innerHTML = 'RESGATAR';
            redeemedTag.style.color = '#a6aca9';
        }
        subContainer.appendChild(redeemedTagBox);

        // creates percentage bar for each item
        let percentageBar = document.createElement('div');
        percentageBar.className = 'percentage-bar';
        if (!jsonData[i].redeemed) {
            subContainer.appendChild(percentageBar);
        }

        // fills the percentage bar
        let percentageFill = document.createElement('div');
        percentageFill.className = 'percentage-fill';
        percentageBar.appendChild(percentageFill);
        percentageFill.style.width = jsonData[i].percentage + '%';
        if (!jsonData[i].redeemed && jsonData[i].percentage === 100) {
            percentageFill.style.background = '#d91822';
            redeemedTag.style.color = '#c5292f';
            redeemedTagBox.style.border = 'solid #c5292f 1px';
            redeemedTagBox.style.background = '#36070a';
        }
    }
}
fetchData();

const clickRedeemedTagBox = (name, image, id) => {
    console.log(name,id);
    let optionBox = document.getElementsByClassName('option-box');
    let optionContent = document.getElementsByClassName('option-content')
    let imageEl = document.createElement('img');
    let nameEl = document.createElement('h1');
    let darkOverlay = document.getElementsByClassName('dark-overlay');
    darkOverlay[0].style.display = 'block';
    optionBox[0].style.zIndex = '200';
    nameEl.innerHTML = name;
    optionBox[0].style.display = 'block';
    imageEl.src = image;
    optionContent[0].appendChild(imageEl);
    optionContent[0].appendChild(nameEl);
    document.getElementsByClassName('option-no')[0].addEventListener('click', () => {
        optionBox[0].style.display = 'none';
        optionContent[0].removeChild(imageEl);
        optionContent[0].removeChild(nameEl);
        darkOverlay[0].style.display = 'none';
    })
    // when 'yes' button is clicked, sends POST message
    document.getElementsByClassName('option-yes')[0].addEventListener('click', async () => {
        let response = await postData('https://cors-anywhere.herokuapp.com/https://br.ongame.net/api/challenge/item/redeem/', { "item_id": id })
        console.log(response);
    })
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

let itemsArray = document.getElementsByClassName('item');