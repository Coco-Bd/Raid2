//Thisfunctioni scalledonlyafterthedatahasbeenfetched,andparsed. 
const loadData = heroes =>{
    console.log(heroes)
    }


function afficherInformations() {
    var infoCount = document.getElementById('infoCount').value;
    fetch('https://raw.githack.com/akabab/superhero-api/0.2.0/api/all.json')
        .then(response => response.json())
        .then(data => {
            var infoContainer = document.getElementById('infoContainer');
            infoContainer.innerHTML = '';
            data.forEach(info => {
                if (info.id <= infoCount) {
                    var p = document.createElement('p');
                    p.textContent = info.id;
                    p.textContent = info.name;
                    infoContainer.appendChild(p);
                }
                
            });
            loadData(data);
        }) 
        .catch(error => console.error('Erreur:', error));
}

function select_page() {
    var page = document.getElementById('page').value;
    var page_less = document.getElementById('page_less').value;
    var page_more = document.getElementById('page_more').value;

    if (page_less) {
        if (page > 0) {
            page--;
        }
    } else if (page_more) {
        page++;
    }
}