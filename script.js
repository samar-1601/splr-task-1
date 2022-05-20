const leftGrid = document.querySelector(".left-grid");
const rightGrid= document.querySelector(".right-grid");
const listItems = document.querySelector(".list-items");

const getTruncatedText = (title)=>{
    // console.log(title);
    let truncatedTitle = "";
    if(title.length > 31)
    {
        truncatedTitle = title.slice(0,14) + "..." + title.slice(-14);
        return truncatedTitle;
    }
    return title;
}
const addHTMLComponents = (value, id) =>{

    const listItem = document.createElement("li");
    const listItemText = document.createElement("span");
    const listItemImage = document.createElement("img");

    listItem.classList.add("list-item");
    listItemText.classList.add("list-item-text")
    listItemImage.classList.add("list-item-image")

    listItem.id = "l" + id.toString();
    listItemText.innerText = getTruncatedText(value.title);
    listItemImage.src = value.previewImage;
    listItem.style.borderRadius = "5px";

    listItem.addEventListener("click",
        ()=>toggleRightImage(listItem, id)
    )

    listItem.appendChild(listItemImage)
    listItem.appendChild(listItemText)
    listItems.appendChild(listItem);
    // console.log(listItem)
    if(id==0)
        toggleRightImage(listItem,0);
}

const updateImageDescription = (id, newDesc)=>{
    const listItem = document.querySelector("#"+"l"+id).querySelector("span");
    listItem.innerText = newDesc;
}

const constructRightPane = ()=>{
    const rightImageDescription = document.createElement("textarea");
    const rightImage = document.createElement("img");
    
    rightImageDescription.classList.add("right-image-desc");
    rightImage.classList.add("right-image");

    rightGrid.appendChild(rightImage);
    rightGrid.appendChild(rightImageDescription);

}
let prevListItem;
const toggleRightImage = (listItem, id)=>{

    if(prevListItem)
    {
        prevListItem.style.backgroundColor = "";
        prevListItem.style.color = "black";
    }
    listItem.style.backgroundColor = "#015ece";
    listItem.style.color = "white";

    item = itemData[id];
    const rightImageDescription = document.querySelector(".right-image-desc");
    const rightImage = document.querySelector(".right-image");

    rightImageDescription.innerHTML = item.title;
    rightImage.src = item.previewImage;

    //updating title functionality

    // rightImageDescription.addEventListener("input", 
    //     ()=> updateImageDescription(id, rightImageDescription.value)
    // )

    prevListItem = listItem;
}

function mainFunc(){
    // console.log(itemData)
    constructRightPane()
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


