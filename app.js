const imageContainer = document.querySelector('.img-container');
const selector = document.getElementById('select');

const dogBreed = document.querySelector('.dog-breed');
const weight = document.querySelector('.weight');
const height = document.querySelector('.height');
const lifeSpan = document.querySelector('.life-span');
const breedFor = document.querySelector('.breed-for');
let imgID;



selector.addEventListener('change', changeInfo);

function changeInfo() {
    // GET DOG'S INFORMATION
    fetch('https://api.thedogapi.com/v1/breeds?limit=10&page=0')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name == selector.value) {
                    dogBreed.textContent = 'Name: ' + data[i].name;
                    weight.textContent = 'Weight: ' + data[i].weight.metric + 'kg';
                    height.textContent = 'Height: ' + data[i].height.metric + 'cm';
                    lifeSpan.textContent = 'Height: ' + data[i].life_span;
                    breedFor.textContent = 'Bred For: ' + data[i].bred_for;
                }
            }
        });

    selectDogId();

    // GET DOG'S PICTURE
    fetch(`https://dog.ceo/api/breed/${imgID}/images/random`)
        .then(response => response.json())
        .then(data => {
            // daca nu gaseste imagine se strica toat functia, se opreste inainte sa intre in if-uri

            if (data.staus == 'error') {
                imageContainer.innerHTML = `<img src="/img/error.png">`;
            } 
            else {
                imageContainer.innerHTML = `<img src=${data.message}>`
            }           
        });
}


    // GET DOG'S LIST and insert in select
fetch('https://api.thedogapi.com/v1/breeds?limit=10&page=0')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            selector.innerHTML += `
            <option value="${data[i].name}">${data[i].name}</option>
        `;
        }
      
});


function selectDogId() {
    console.log(selector.value);
    if(selector.value == 'Affenpinscher') {
        console.log('merge');
        imgID = 'affenpinscher';
    }
    else if(selector.value == 'Afghan Hound') {
        console.log('merge');
        imgID = 'hound';
    }
    else if(selector.value == 'Airedale Terrier') {
        console.log('merge');
        imgID = 'airedale ';
    }
    else if(selector.value == 'Akbash Dog') {
        console.log('merge');
        imgID = 'akbash ';
    }
    else if(selector.value == 'Akita') {
        console.log('merge');
        imgID = 'akita ';
    }
}