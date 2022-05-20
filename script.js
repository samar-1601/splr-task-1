const leftGrid = document.querySelector(".left-grid");
const rightGrid= document.querySelector(".right-grid");
const listItems = document.querySelector(".list-items");

var idx = 0;

const getTruncatedText = (title)=>{
    let truncatedTitle = "";
    if(title.length > 31)
    {
        truncatedTitle = title.slice(0,14) + "..." + title.slice(-14);
        return truncatedTitle;
    }
    return title;
}
const addLeftHTMLComponents = (value, id) =>{

    const listItem = document.createElement("li");
    const listItemText = document.createElement("span");
    const listItemImage = document.createElement("img");

    listItem.classList.add("list-item");
    listItemText.classList.add("list-item-text")
    listItemImage.classList.add("list-item-image")

    listItem.id = "l" + id.toString();
    listItemText.innerText = getTruncatedText(value.title);
    listItemImage.src = value.previewImage;

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



const constructRightPane = ()=>{
    const rightImageDescription = document.createElement("textarea");
    const rightImage = document.createElement("img");
    
    rightImageDescription.classList.add("right-image-desc");
    rightImage.classList.add("right-image");

    rightGrid.appendChild(rightImage);
    rightGrid.appendChild(rightImageDescription);

}

const updateDescription = async(id, updatedDesc, listItem)=>{
    console.log("updateImage Desc called");
    console.log(id);
    itemData[id].title = updatedDesc;
    leftImageTitle = listItem.querySelector("span");
    leftImageTitle.innerText = getTruncatedText(updatedDesc);
    console.log(itemData);
}

let prevListItem;
const toggleRightImage = (listItem, id)=>{

    idx = id;
    console.log("toggle right image called\n");
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

    rightImageDescription.value = item.title;
    rightImage.src = item.previewImage;
    console.log(rightImageDescription.value)

    // updating title functionality
    
    const index = id;
    console.log("The ID before call is : "+ id);
    rightImageDescription.addEventListener("input", 
    ()=>{
            const desc = rightImageDescription.value;
            console.log(desc);
            updateDescription(index, desc, listItem);
        }
    )

    prevListItem = listItem;
}

const KeyFunction = (e)=>{
    if(e.key == "ArrowUp")
    {
        idx = (idx>0)?(idx-1):idx;
        const listItem = document.querySelector("#l"+idx);
        toggleRightImage(listItem, idx);
    }
    else if(e.key == "ArrowDown")
    {
        idx = (idx===(itemData.length-1))?idx:(idx+1);
        const listItem = document.querySelector("#l"+idx);
        toggleRightImage(listItem, idx);
    }
}

function mainFunc(){
    // console.log(itemData)
    constructRightPane()
    itemData.forEach((value, index) => {
        addLeftHTMLComponents(value, index)
    });
    window.addEventListener("keydown", KeyFunction);
}


let itemData;
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
      itemData = data;
      mainFunc();
    })
  .catch(error => console.log(error));


