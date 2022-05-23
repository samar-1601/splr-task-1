const leftGrid = document.querySelector(".left-grid");
const rightGrid= document.querySelector(".right-grid");
const listItems = document.querySelector(".list-items");
const rightImageDesc = document.querySelector(".right-image-desc");

var idx = 0;

const getTruncatedText = (title)=>{
    let len = title.length;
    let leftText, rightText;
    leftText = title.slice(0,len/2);
    if(len%2==0)
        rightText = title.slice(-len/2);
    else 
        rightText = title.slice(-len/2-1);
    return [leftText, rightText];
}
const addLeftHTMLComponents = (value, id) =>{

    const listItem = document.createElement("li");
    const listTitle = document.createElement("span");
    const listItemTextLeft = document.createElement("span");
    const listItemTextRight = document.createElement("span");
    const listItemImage = document.createElement("img");

    listItem.classList.add("list-item");
    listTitle.classList.add("list-item-text")
    listItemTextLeft.classList.add("left-text")
    listItemTextRight.classList.add("right-text")
    listItemImage.classList.add("list-item-image")
    listItemImage.setAttribute("alt", value.title)

    listItem.id = "l" + id.toString();
    let [leftText, rightText] = getTruncatedText(value.title);
    listItemTextLeft.innerText = leftText;
    listItemTextRight.innerText = rightText;

    listItemImage.src = value.previewImage;

    listItem.addEventListener("click",
        ()=>{
            idx = id;
            toggleRightImage()
        }
    )

    listItem.appendChild(listItemImage);
    listItem.appendChild(listTitle);
    listTitle.appendChild(listItemTextLeft);
    listTitle.appendChild(listItemTextRight);
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
    const listItemTextLeft = listItem.querySelector(".left-text");
    const listItemTextRight = listItem.querySelector(".right-text");
    let [leftText, rightText] = getTruncatedText(updatedDesc);
    listItemTextLeft.innerText = leftText;
    listItemTextRight.innerText = rightText;
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

