const leftGrid = document.querySelector("left-grid");
const rightGrid= document.querySelector("right-grid");
const listItems = document.querySelector(".list-items");

const addHTMLComponents = (value, id) =>{

    console.log(id);
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");
    listItem.id = id;
    listItem.innerText = value.title;

    listItems.appendChild(listItem);
    console.log(listItem)
    
}


function mainFunc(){
    console.log(itemData)
    itemData.forEach((value, index) => {
        addHTMLComponents(value, index)
    });
}


let itemData;
fetch('./Data.json')
  .then(response => response.json())
  .then(data => {
      itemData = data;
      mainFunc();
    })
  .catch(error => console.log(error));
