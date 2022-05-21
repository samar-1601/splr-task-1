const leftGrid = document.querySelector(".left-grid");
const rightGrid= document.querySelector(".right-grid");
const listItems = document.querySelector(".list-items");
const rightImageDesc = document.querySelector(".right-image-desc");


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
        ()=>{
            idx = id;
            toggleRightImage()
        }
    )

    listItem.appendChild(listItemImage)
    listItem.appendChild(listItemText)
    listItems.appendChild(listItem);

    if(id==0)
        toggleRightImage(listItem,0);
}

let prevListItem;
const toggleRightImage = ()=>{

    const listItem = document.querySelector("#l"+idx);

    if(prevListItem)
    {
        prevListItem.style.backgroundColor = "";
        prevListItem.style.color = "black";
    }
    listItem.style.backgroundColor = "#015ece";
    listItem.style.color = "white";

    item = itemData[idx];
    const rightImage = document.querySelector(".right-image");
    rightImage.src = item.previewImage;
    
    console.log(idx);
    console.log(item.title)
    rightImageDesc.value = item.title;

    prevListItem = listItem;
}

const toggleUp = ()=>{
    console.log("toggledUp");
    idx = (idx>0)?(idx-1):idx;
    toggleRightImage();
}

const toggleDown = ()=>{
    console.log("toggledDown");
    idx = (idx===(itemData.length-1))?idx:(idx+1);
    toggleRightImage();
}

const updateDescription = (updatedDesc)=>{
    
    console.log(idx);
    console.log(updatedDesc);
    const listItem = document.querySelector("#l"+idx);
    itemData[idx].title = updatedDesc;
    leftImageTitle = listItem.querySelector("span");
    leftImageTitle.innerText = getTruncatedText(updatedDesc);
    console.log(itemData);
}

function mainFunc(){
    
    itemData.forEach((value, index) => {
        addLeftHTMLComponents(value, index)
    });
    document.onkeydown = function(e) {
        console.log("presss")
        switch (e.key) {
            case "ArrowDown":
                toggleDown();
                break;
            case "ArrowUp":
                toggleUp();
                break;
        }
    };

    rightImageDesc.addEventListener("input", (e)=>{
        updateDescription(rightImageDesc.value)
    })
}


let itemData;
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
      itemData = data;
      mainFunc();
    })
  .catch(error => console.log(error));

