//Thisfunctioni scalledonlyafterthedatahasbeenfetched,andparsed.
document.getElementById("search").addEventListener("input", function () {
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
      var infoContainer = document.getElementById("dataContainer");
      var index = 0;
      infoContainer.innerHTML = "";
      //sortAZ(filteredData, "appearance.race");
      data.forEach((info) => {
        if (index >= page * infoCount && index < (page + 1) * infoCount) {
          var tr = createGameElement("tr", "info");
          var name = createGameElement("td", "name");
          var imgContainer = createGameElement("td", "image");
          var img = createGameElement("img", "img");
          // var id = createGameElement("th", "id");
          var full_name = createGameElement("td", "full_name");
          var Containerpowerstats = createGameElement(
            "td",
            "powerstatsContainer"
          );
          var Divpowerstats = createGameElement("td", "powerstats");
          var race = createGameElement("td", "race");
          var g_h_w_container = createGameElement("td", "g_h_w_container");
          var gender = createGameElement("h3", "gender");
          var height = createGameElement("p", "height");
          var weight = createGameElement("p", "weight");
          var place_of_birth = createGameElement("td", "place_of_birth");
          var alignment = createGameElement("td", "alignment");

          // id.textContent = info.id;
          name.textContent = info.name;
          img.src = info.images.xs;
          full_name.textContent = info.biography.fullName;
          race.textContent = info.appearance.race;
          gender.textContent = info.appearance.gender;
          height.textContent = info.appearance.height;
          weight.textContent = info.appearance.weight;
          place_of_birth.textContent = info.biography.placeOfBirth;
          alignment.textContent = info.biography.alignment;

          //iterate over the powerstats object and create a paragraph for each key value pair
          Object.entries(info.powerstats).forEach(([key, value]) => {
            var Pragraphspowerstats = createGameElement(
              "p",
              "ParagraphPowerstats"
            );
            Pragraphspowerstats.textContent = `${key}: ${value}`;
            Divpowerstats.appendChild(Pragraphspowerstats);
          });
          Containerpowerstats.appendChild(Divpowerstats);
          infoContainer.appendChild(tr);
          tr.appendChild(imgContainer);
          imgContainer.appendChild(img);
          tr.appendChild(name);
          // tr.appendChild(id);
          tr.appendChild(full_name);
          tr.appendChild(Divpowerstats);
          tr.appendChild(g_h_w_container);
          g_h_w_container.appendChild(gender);
          g_h_w_container.appendChild(height);
          g_h_w_container.appendChild(weight);
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
  } else {
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
