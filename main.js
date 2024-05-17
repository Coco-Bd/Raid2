//Thisfunctioni scalledonlyafterthedatahasbeenfetched,andparsed.
document.getElementById('search').addEventListener('input', function() {
  page = 0;
  select_page();
});
const loadData = (heroes) => {
console.log(heroes);
};

function afficherInformations(page = 0) {
var infoCount = document.getElementById("infoCount").value;
fetch("https://raw.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((response) => response.json())
  .then((data) => {
    var infoContainer = document.getElementById("infoContainer");
    var index = 0;
    infoContainer.innerHTML = "";




    var filteredData = search(data); 
    //sortAZ(filteredData, "appearance.race");
    filteredData.forEach((info) => {
      if (index >= page * infoCount && index < (page + 1) * infoCount) {
        var div = createGameElement("div", "info");
        var p = createGameElement("p", "name");
        var img = createGameElement("img", "image");
        var id = createGameElement("p", "id");
        var race = createGameElement("p","race");
        id.textContent = info.id;
        p.textContent = info.name;
        img.src = info.images.xs;
       race.textContent = info.appearance.race;
        div.appendChild(id);
        div.appendChild(p);
        div.appendChild(img);
        div.appendChild(race);
        infoContainer.appendChild(div);
      }
      index += 1;
    });
    loadData(data);
  })
  .catch((error) => console.error("Erreur:", error));
}

var page = 0;
afficherInformations(page);
function select_page(direction = "") {
if (direction === "-") {
  if (page > 0) {
    page--;
    afficherInformations(page);
  }
} else if (direction === "+") {
  page++;
  afficherInformations(page);
} else if (direction === "") {
  afficherInformations(page);
}
document.getElementById("page").textContent = page;
}

function createGameElement(element, className) {
const gameElement = document.createElement(element);
gameElement.className = className;
return gameElement;
}


function search(info) {
  console.log("search");
  var search = document.getElementById("search").value;
  search.toLowerCase();
  if (search === "") {
    return info;
  }else{
    return info.filter((info) => info.name.toLowerCase().includes(search));
  }

}



function sort_name(info) {
info.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  } else {
    return 1;
  }
});
return info;
}

/*function sortAZ(data, propertyPath) {
return data.sort((a, b) => {
  if (a+propertyPath&& b+propertyPath) {
    return String(a+propertyPath).localeCompare(String(b+propertyPath));
  } else {
    return 0;
  }
});
}*/