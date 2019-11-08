// document -> Document Object Model = DOM
var popupIndex = 0;
var datas = {
    Home :{
        background :'img/rommb.jpg',
        contenu:'Halloween ou l\'Halloween est une fête folklorique et païenne traditionnelle originaire des îles Anglos-Celtes célébrée dans la soirée du 31 octobre, veille de la fête chrétienne de la Toussaint.',
        titre:'HALLOWEEN s COMING',
        sousTitre:'Hello bande de dégénérés incontinents.',
    },
    films :{
        background :'http://inagblog.com/wp-content/uploads/2019/08/Philomena-Famulok.jpg',
        contenu:[
            {
                titre:'Men & Chicken',
                duree:'1h 44min', 
                date:'25 mai 2016',
                affiche: 'https://m.media-amazon.com/images/M/MV5BMTcwMjI0OTgxM15BMl5BanBnXkFtZTgwNDg3MzczODE@._V1_UX182_CR0,0,182,268_AL_.jpg',
                description: " À la mort de leur père, Elias et Gabriel découvrent qu’ils ont été adoptés et que leur père biologique, Evelio Thanatos, est un généticien qui travaille dans le plus grand secret sur une île mystérieuse ",                
            },
            {
                affiche: 'https://m.media-amazon.com/images/M/MV5BNGUyMDY0NjgtMmQ4Yi00NjgxLTljOTQtMDE5NDNkNjAxOGI1XkEyXkFqcGdeQXVyNzgzODI1OTE@._V1_UY268_CR6,0,182,268_AL_.jpg',
                description:'Frank vend de l\'héroïne à Copenhague. Il nourrit de plus vastes ambitions, d\'autant qu\'il a contracté une lourde dette auprès d\'un trafiquant serbe, Milo. Il est en train de revendre de la drogue qu\'il n\'a pas encore payée lorsque des policiers font irruption pendant la transaction',
                date:'26 juillet 2006',
                duree:'1h45',
                titre:'Pusher'
            },
    ],
        titre:'Les films',
        sousTitre:'Tu vas emballer ce soir, c\'est sûr',
    },
    deguisements: {
        background :'http://inagblog.com/wp-content/uploads/2018/01/Juliette-Clovis-5.jpg',
        contenu:'Avec les moyens du bord',
        titre:'Déguisements',
        sousTitre:'Dragon - gobelets à café',
    },
    histoires: {
        background :'http://inagblog.com/wp-content/uploads/2017/12/Sara-Shakeel-8.jpg',
        contenu:'Contes du troisième tiroir',
        titre:'Histoires',
        sousTitre:'Oh oh, tu m\'écoutes ?',
    }
}

//OUVERTURE MENU
var fleche = document.getElementById('fleche');
if (fleche){
    fleche.addEventListener(
        'click',
        function(canard){
            // preventdef annule la fonction du lien
            canard.preventDefault();
            // query selector retourne le premier élément html correspondant
            var nav = document.querySelector('#app > nav');
            if (nav){
                nav.classList.toggle('open');
            }
        }
    );
}

//on récupère une collection d'element html
var links = document.querySelectorAll('nav a');
if(links){
    for (var i=0; i < links.length; i++){
        var link = links[i];
        link.addEventListener(
            'click',
            function (event){
                event.preventDefault(); 
                //event.target : cible réelle de l'évenement
                //Target : l'élément html qui a subit l'action
                //this : objet qui écoute l'évènement
                var data = this.getAttribute('data-page');
                writePage(data);
            }
        );
    }
}


function writePage(data){
    var h1 = document.querySelector('h1');
    var sousTitre = document.querySelector('#subtitle');
    var divContenu = document.querySelector('.content');
                    //innerHTML -> inject le contenu
                //innerText -> permet seulement lecture / ecriture de chainede caractères
                h1.innerText = datas[data].titre; 
                sousTitre.innerText = datas[data].sousTitre;         
                 if (data === 'films'){
                    divContenu.innerText = '';
                    createThumbnail(datas['films'].contenu, divContenu);
                 }else{
                    divContenu.innerText = datas[data].contenu;
                 }
            document.body.style.backgroundImage = 'url('+datas[data].background+')';
}

function createThumbnail(content,element){
    var i = 0;
    for (var films of content){
        //creation de l'élément html
        var img = document.createElement('img');
        img.src = films.affiche;
        //on peut directement la soumettre à un évènement : ex: img.addEventListener
        //on lui ajoute une classe
        img.className = 'afficheFilm thumb';
        //ajoute un attribut, on transforme l'objet en texte
        img.setAttribute('data-detail', JSON.stringify(films));
        img.setAttribute('data-index', i);
        //on ajoute un enfant à la fin du html
        element.appendChild(img);
        img.addEventListener('click', createPopup);
        i++;
    }
}

function createPopup (event){
    event.preventDefault();
    var index = this.getAttribute('data-index');
    popupIndex = Number(index);
    var data = this.getAttribute('data-detail');
    data = JSON.parse(data);
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    var popup = document.createElement('div');
    popup.className = 'popup';
    popupContent(data,popup);

    var nextLink = document.createElement('span');
    nextLink.className = 'next';
    nextLink.innerText = 'suivant';
    nextLink.addEventListener('click', goToNext);

    var prevLink = document.createElement('span');
    prevLink.className = 'prev';
    prevLink.innerText = 'precedent';
    prevLink.addEventListener('click', goToNext);

    overlay.appendChild(prevLink);
    overlay.appendChild(popup);
    overlay.appendChild(nextLink);
    
    overlay.addEventListener('click',
    function(e){
        if (this == e.target) {
            this.remove();
        }
    });
    document.body.appendChild(overlay);
}

function popupContent (data, box){
    var column = document.createElement('div');
    for (var info in data){
        if (info == 'affiche'){
        var img = document.createElement('img');
        img.src = data.affiche;
        img.alt = data.titre;
        box.appendChild(img);
        }else{
            // === RESUME UNE CONDITION ? si vrai : si faux ;
        var tag = (info == 'titre') ? 'h2'  : 'p';   
        var el = document.createElement(tag);
        el.classname = info;
        el.innerText = data[info];
        column.appendChild(el);     
        }
    }
    box.appendChild(column); 
}

function goToNext(e){
    e.preventDefault();
    //popupiNDEX
    // situer = datas.film.contenu
    var nextIndex = popupIndex + 1;
    //boucle infinie sur le tableau
    if (datas.films.contenu.length <= nextIndex){
        nextIndex = 0;
    }
    goTo(nextIndex);
}

function goToPrev(e){
    e.preventDefault();
    //popupiNDEX
    // situer = datas.film.contenu
    var nextIndex = popupIndex - 1;
    //boucle infinie sur le tableau
    if (0 > nextIndex) { 
    nextIdex = datas.films.contenu.length -1;
    }
    goTo(nextIndex);
}

function goTo (index){
    var overlay = document.querySelector('.overlay');
    if (overlay) { overlay.remove();  }
    var img = document.querySelector('[data-index="'+index+'"]');
    if (img){ img.click();   
    popupIndex = index;}
}

writePage('Home');

