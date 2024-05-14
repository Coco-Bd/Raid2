//Thisfunctioni scalledonlyafterthedatahasbeenfetched,andparsed.
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
      data.forEach((info) => {
        
        if (index >= page * infoCount && index < (page + 1) * infoCount) {
          var div = createGameElement("div", "info");
          var p = createGameElement("p", "name");
          var img = createGameElement("img", "image");
          var id = createGameElement("p", "id");
          id.textContent = info.id;
          p.textContent = info.name;
          img.src = info.images.xs;
          div.appendChild(id);
          div.appendChild(p);
          div.appendChild(img);
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
function select_page(direction) {
  if (direction === "-") {
    if (page > 0) {
      page--;
      afficherInformations(page);
    }
  } else if (direction === "+") {
    page++;
    afficherInformations(page);
  }
  document.getElementById("page").textContent = page;
}

function createGameElement(element, className) {
  const gameElement = document.createElement(element);
  gameElement.className = className;
  return gameElement;
}
