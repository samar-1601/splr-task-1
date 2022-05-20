const leftGrid = document.querySelector(".left-grid");
const rightGrid= document.querySelector(".right-grid");
const listItems = document.querySelector(".list-items");

const addHTMLComponents = (value, id) =>{

    console.log(id);
    const listItem = document.createElement("li");
    const listItemText = document.createElement("span");
    const listItemImage = document.createElement("img");

    listItem.classList.add("list-item");
    listItemText.classList.add("list-item-text")
    listItemImage.classList.add("list-item-image")

    listItem.id = id;
    listItemText.innerText = value.title;
    listItemImage.src = value.previewImage;

    listItem.appendChild(listItemImage)
    listItem.appendChild(listItemText)
    listItems.appendChild(listItem);
    console.log(listItem)
    
}

const constructRightPane = ()=>{
    const rightImageDescription = document.createElement("textarea");
    const rightImage = document.createElement("img");
    
    rightImageDescription.classList.add("right-image-desc");
    rightImage.classList.add("right-image");
    
    rightGrid.appendChild(rightImage);
    rightGrid.appendChild(rightImageDescription);
}

const toggleRightImage = (item)=>{

    const rightImageDescription = document.querySelector(".right-image-desc");
    const rightImage = document.querySelector(".right-image");

    rightImageDescription.innerHTML = item.title;
    rightImage.src = item.previewImage;
}

function mainFunc(){
    console.log(itemData)
    itemData.forEach((value, index) => {
        addHTMLComponents(value, index)
    });
    constructRightPane()
    toggleRightImage(itemData[0]);
    // hovering functionality
    
    
}


let itemData;
fetch('./Data.json')
  .then(response => response.json())
  .then(data => {
      itemData = data;
      mainFunc();
    })
  .catch(error => console.log(error));


