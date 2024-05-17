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
      //sortAZ(filteredData, "appearance.race");
      data.forEach((info) => {
        if (index >= page * infoCount && index < (page + 1) * infoCount) {
          var tr = createGameElement("tr", "info");
          var name = createGameElement("th", "name");
          var imgContainer = createGameElement("th", "image");
          var img = createGameElement("img", "img");
          var id = createGameElement("th", "id");
          var full_name = createGameElement("th", "full_name");
          var powerstats = createGameElement("th", "powerstats");
          var race = createGameElement("th", "race");
          var gender = createGameElement("th", "gender");
          var height = createGameElement("th", "height");
          var weight = createGameElement("th", "weight");
          var place_of_birth = createGameElement("th", "place_of_birth");
          var alignment = createGameElement("th", "alignment");

          id.textContent = info.id;
          name.textContent = info.name;
          img.src = info.images.xs;
          full_name.textContent = info.biography.fullName;
          race.textContent = info.appearance.race;
          gender.textContent = info.appearance.gender;
          height.textContent = info.appearance.height;
          weight.textContent = info.appearance.weight;
          place_of_birth.textContent = info.biography.placeOfBirth;
          alignment.textContent = info.biography.alignment;

          infoContainer.appendChild(tr);
          tr.appendChild(imgContainer);
          imgContainer.appendChild(img);
          tr.appendChild(name);
          tr.appendChild(id);
          tr.appendChild(full_name);
          tr.appendChild(powerstats);
          //powerstats need to be fixed to display all powerstats
          info.powerstats.forEach((powerstat) => {
            var powerstatElement = createGameElement("p", "powerstat");
            powerstatElement.textContent = powerstat;
            powerstats.appendChild(powerstatElement);
          });
          tr.appendChild(gender);
          tr.appendChild(height);
          tr.appendChild(weight);
          tr.appendChild(place_of_birth);
          tr.appendChild(alignment);
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