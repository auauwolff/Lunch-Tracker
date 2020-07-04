const total = document.getElementById('total');
const list = document.getElementById('list');
const form = document.getElementById('form');
const lunch = document.getElementById('lunch');
const value = document.getElementById('value');
const pay = document.getElementById('pay');

// const dummyItems= [
//     {id: 1, lunch: 'Breaki Salad', value: 20},
//     {id: 2, lunch: 'Breaki tortilla', value: 10},
//     {id: 3, lunch: 'Sanga', value: 40},
//     {id: 4, lunch: 'Baguel', value: 5},
//     {id: 5, lunch: 'Juice', value: 8},
//     {id: 6, lunch: 'Salad', value: 10}
    
// ];

const localStorageItens = JSON.parse(localStorage.getItem('lunchList'));

let lunchList = localStorage.getItem('lunchList') !== null ? localStorageItens : [];


//Add Items to DOM list
function addItemDOM(item){

    const itens = document.createElement('li');

    itens.classList.add('lunch-list')
    itens.innerHTML = `
    ${item.lunch} 
    <span>$${Math.abs(item.value)}</span>
     <button class="delete-btn" onclick="removeItem(${item.id})">x</button>`;

    list.appendChild(itens);

  }

  //Update total
  function updateTotal(){
      const values = lunchList.map(item => item.value);

      const totalItens = values.reduce((acc, item) => (acc += item), 0).toFixed(2);

      total.innerText = `$${totalItens}`;
  }

  //Add item
function addItem(e){
    e.preventDefault();

    if(lunch.value.trim() === '' || value.value.trim() === '' )
    {
        alert('Please add a lunch item and value');
    } else {
        const addItens = {
            id: generateID(),
            lunch: lunch.value,
            value: +value.value
        };

        lunchList.push(addItens);

        addItemDOM(addItens);

        updateTotal();

        updateLocalStorage();

        lunch.value ='';
        value.value ='';
    }
}

//Remove item by ID
function removeItem(id){
    lunchList = lunchList.filter(item => item.id !== id);

    updateLocalStorage();

    init();
}

// Pay lunch
function payLunch(){
    localStorage.clear();
    location.reload();

}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
  }


  //Update Local Storage Itens

  function updateLocalStorage(){
      localStorage.setItem('lunchList', JSON.stringify(lunchList));
  }

  //Init app
  function init() {
      list.innerHTML = '';

      lunchList.forEach(addItemDOM);
      updateTotal();
  }

  init();

  form.addEventListener('submit', addItem);
  pay.addEventListener('click', payLunch);

