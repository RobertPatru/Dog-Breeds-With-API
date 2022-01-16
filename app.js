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
    selectDogId();

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
        })
        .catch( () => {
            dogBreed.textContent = 'Name: ' + 'Nothing Data Found';
            weight.textContent = 'Weight: ' + 'Nothing Data Found';
            height.textContent = 'Height: ' + 'Nothing Data Found';
            lifeSpan.textContent = 'Height: ' + 'Nothing Data Found';
            breedFor.textContent = 'Bred For: ' + 'Nothing Data Found';
    } );

    
    // GET DOG'S PICTURE
    fetch(`https://dog.ceo/api/breed/${imgID}/images/random`)
        .then(response => response.json())
        .then(data => imageContainer.innerHTML = `<img src=${data.message}>`)
        .catch( (error) =>  {
            console.log(error.statusCode);
            console.log('Intra in catch!');
    });
}   // End f Chang Info Function


// GET DOG'S LIST and insert in select
fetch('https://api.thedogapi.com/v1/breeds?limit=10&page=0')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            selector.innerHTML += `
            <option value="${data[i].name}">${data[i].name}</option>
        `;
        }
    })
    .catch( () => {
        imageContainer.innerHTML = `<h1 class='error'>Dog list could not be loaded.</h1>`;
        console.log('intra in catch');
    });


function selectDogId() {
    if(selector.value == 'Affenpinscher') {
        imgID = 'affenpinscher';
    }
    else if(selector.value == 'Afghan Hound') {
        imgID = 'hound';
    }
    else if(selector.value == 'Airedale Terrier') {
        imgID = 'airedale ';
    }
    else if(selector.value == 'Akbash Dog') {
        imgID = 'akbash ';
    }
    else if(selector.value == 'Akita') {
        imgID = 'akita ';
    }
    else {
        imgID = '';
    }
}