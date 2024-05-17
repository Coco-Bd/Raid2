document.getElementById("search").addEventListener("input", function () {
  page = 0;
  select_page();
});

const loadData = (heroes) => {
  console.log(heroes);
};

//displays information based on page and search
function showInformation(page = 0) {
  var infoCount = document.getElementById("infoCount").value;
  fetch("https://raw.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then((response) => response.json())
    .then((data) => {
      var infoContainer = document.getElementById("dataContainer");
      var index = 0;
      infoContainer.innerHTML = "";

      var filteredData = search(data);
      console.log(filteredData);

      filteredData.forEach((info) => {
        if (index >= page * infoCount && index < (page + 1) * infoCount) {
          var tr = createGameElement("tr", "info");
          var name = createGameElement("td", "name");
          var imgContainer = createGameElement("td", "image");
          var img = createGameElement("img", "img");
          var full_name = createGameElement("td", "full_name");
          var Containerpowerstats = createGameElement(
            "td",
            "powerstatsContainer"
          );
          var Divpowerstats = createGameElement("td", "powerstats");
          var race = createGameElement("h4", "race");
          var g_h_w_container = createGameElement("td", "g_h_w_container");
          var gender = createGameElement("h6", "gender");
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

          // powerstats is an object, so we need to loop through it
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
          tr.appendChild(full_name);
          tr.appendChild(Divpowerstats);
          tr.appendChild(g_h_w_container);
          g_h_w_container.appendChild(gender);
          g_h_w_container.appendChild(race);
          g_h_w_container.appendChild(height);
          g_h_w_container.appendChild(weight);
          tr.appendChild(place_of_birth);
          tr.appendChild(alignment);
        }
        index += 1;
      });
      loadData(data);
    })
    .catch((error) => console.error("Error:", error));
}

var page = 0;
showInformation(page);

// function to select the page
function select_page(direction = "") {
  if (direction === "-") {
    if (page > 0) {
      page--;
      showInformation(page);
    }
  } else if (direction === "+") {
    page++;
    showInformation(page);
  } else if (direction === "") {
    showInformation(page);
  }
  document.getElementById("page").textContent = page;
}

// function to create a game element
function createGameElement(element, className) {
  const gameElement = document.createElement(element);
  gameElement.className = className;
  return gameElement;
}

// function to search one of the heroes by name
function search(info) {
  // var footer = document.getElementById("carrousel");
  // var page = document.getElementById("footerContainer");
  // var infos;
  console.log("search");
  var search = document.getElementById("search").value;
  search.toLowerCase();
  if (search === "") {
    return info;
  } else {
    return info.filter((info) => info.name.toLowerCase().includes(search));

    // hidde carrousel if no data found
    if (filteredData.length === 0) {
      console.log("No data found");
      footer.style.display = "none";
      page.style.display = "sticky";
      page.style.bottom = "0";
    } else {
      footer.style.display = "flex";
      page.style.display = "flex";
    }
  }
}
// function to sort the data in ascending order
//not used
function sortData(data, propertyPath, ascending) {
  const properties = propertyPath.split(".");
  data.sort((a, b) => {
    let aValue = a,
      bValue = b;
    for (let property of properties) {
      aValue = aValue[property];
      bValue = bValue[property];
    }
    if (aValue && bValue) {
      return String(aValue).localeCompare(String(bValue));
    } else {
      return 0;
    }
  });
}

//function which retrieves the title line to sort to see if it is clicked
//not funcional
function titleSort(data) {
  var titleRow = document.getElementById("title");
  titleRow.addEventListener("click", function (event) {
    if (event.target.tagName === "TH") {
      var className = event.target.className;
    }

    console.log(className);
    switch (className) {
      case "name":
        sortAZ(data, "name");
        break;
      case "id":
        sortAZ(data, "id");
      case "full_name":
        sortAZ(data, "biography.fullName");
        break;
      case "race":
        sortAZ(data, "appearance.race");
        break;
      case "gender":
        sortAZ(data, "appearance.gender");
        break;
      case "height":
        sortAZ(data, "appearance.height");
        break;
      case "weight":
        sortAZ(data, "appearance.weight");
        break;
      case "place_of_birth":
        sortAZ(data, "biography.placeOfBirth");
        break;
      case "alignment":
        sortAZ(data, "biography.alignment");
        break;
      default:
        sortAZ(data, "name");
        break;
    }
    console.log("data sorted");
    console.log(data);
    console.log("data finished");
    return data;
  });
}
