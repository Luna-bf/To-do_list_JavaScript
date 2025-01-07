'use strict';

//Je récupère mes éléments HTML
const elements = {
    dropdown: document.querySelectorAll('.dropdown'),
    allTasks: document.querySelector('#all-tasks ul'),
    form: document.querySelector('#task-form form'),
    checkbox: document.querySelector('#task-name'),
    filterPriority: document.querySelector('#filter-priority'),
    filterCategory: document.querySelector('#filter-category'),
    cards: document.getElementsByClassName('card'),
    deleteBtn: document.querySelector('#delete-task-btn'),
    deleteAllBtn: document.querySelector('#delete-all-btn'),
    deactivatePrompt: document.querySelector('#deactivate-msg'),
};

//J'indique mes priorités et leur valeur
const priorities = {
    priorityHigh: 1,
    priorityNormal: 2,
    priorityLow: 3
};

//J'indique mes catégories et leur valeur
const categories = {
    noCategory: '(Sans catégorie)',
    work: '(Travail)',
    studies: '(Etudes)',
    food: '(Alimentation)',
    house: '(Maison)',
    sport: '(Sport)',
    hygiene: '(Hygiène)',
    hobbies: '(Hobbies)',
    other: '(Autre)'
};

let myTasks = [
    {
        title: 'Savoir faire une todo list en js natif',
        priority: priorities.priorityHigh,
        category: categories.studies,
        isDone: false
    },
    {
        title: 'Préparer les cadeaux de Noël',
        priority: priorities.priorityNormal,
        category: categories.other,
        isDone: false
    },
    {
        title: 'Finir Hollow Knight à 112%',
        priority: priorities.priorityLow,
        category: categories.hobbies,
        isDone: false
    }
];

console.log(myTasks);

//La fonction qui va me permettre de gérer les tâches
function displayTasks() {
    
    //Je vide les tâches précédentes du ul (si je ne fais pas ça le tableau contenant mes tâches se répètera à chaque fois que jajoute une nouvelle tâche)
    elements.allTasks.innerHTML = '';
    
    //Je créé les tâches de manière dynamique avec une BOUCLE
    //car je veux que ce qui va être déclaré se REPETE POUR CHAQUE tâche
    for(let myTask of myTasks) { //for of soit forEach
        
        //Je créé les éléments qui vont me servir pour cette tâche
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const penIcon = document.createElement('i');
        const checkIcon = document.createElement('i');
        const trashIcon = document.createElement('i');
        input.type = 'checkbox'; //J'assigne un type à mon input
        
    
        input.addEventListener('change', (e) => { //change permet de changer l'état d'un élément
            myTask.isDone = input.checked; //checked est la valeur qui correspond à l'état coché de checkbox
        });
        
        //Je créé un noeud de texte pour l'élément label
        const labelName = document.createTextNode(myTask.title);
        span.textContent += myTask.category; //J'utilise textContent pour span car je veux que mon texte soit dans la balise span (cela va être utile pour la partie CSS)
        penIcon.classList.add('fa-solid', 'fa-pen'); //J'ajoute une icône à mon élément i (à côté de mon élément span)
        checkIcon.classList.add('fa-solid', 'fa-check');
        trashIcon.classList.add('fa-solid', 'fa-trash');
        
        //Puis, toujours dans ma boucle for of, je gère les priorité avec un switch
        switch(myTask.priority) {
            case priorities.priorityHigh:
                label.classList.add('high'); //J'ajoute une classe pour chaque priorité (cela va être utile pour la partie CSS)
                break;
            case priorities.priorityNormal:
                label.classList.add('normal');
                break;
            case priorities.priorityLow:
                label.classList.add('low');
                break;
            default:
                label.classList.add('none');
                break;
        }
        
        //Je gère également les catégories avec un switch
        switch(myTask.category) {
            case categories.work:
                span.classList.add('work'); //Les classes sont ajoutées dans la balise span car les catégories seront affichées dans celle-ci
                break;
            case categories.studies:
                span.classList.add('studies');
                break;
            case categories.food:
                span.classList.add('food');
                break;
            case categories.house:
                span.classList.add('house');
                break;
            case categories.sport:
                span.classList.add('sport');
                break;
            case categories.hygiene:
                span.classList.add('hygiene');
                break;
            case categories.hobbies:
                span.classList.add('hobbies');
                break;
            case categories.other:
                span.classList.add('other');
                break;
            default:
                span.classList.add('noCategory');
                break;
        }
        
        //Puis j'attache tous les éléments ensemble
        label.append(input, labelName); //Je met l'input et le nom des tâches dans le label
        li.append(label, span, penIcon, checkIcon, trashIcon); //Je met label, span et icon dans l'élément li
        elements.allTasks.append(li);
        //Et enfin je met mon élément li dans l'élément qui contient l'id all-tasks
        //en allant le chercher dans l'objet elements et en sélectionnant allTasks
    }
}

//J'affiche la liste au chargement de la page en appelant ma fonction
displayTasks();

elements.form.addEventListener('submit', (e) => {
    
    //J'empêche le rechargement de la page
    e.preventDefault();
    
    //Je récupère les données de mon formulaire
    const formData = new FormData(elements.form);
    
    //Puis je créé une nouvelle tâche
    const newTask = {
        title: formData.get('task_name'), //Je récupère la donnée name (task_title) de l'input se trouvant dans le form
        priority: Number(formData.get('choose_priority')), //J'utilise l'attribut Number pour bien récupérer un nombre et non une string
        category: formData.get('choose_category'),
        isDone: false //Par défaut, la tâche n'est pas finie
    };
    
    //J'ajoute cette nouvelle tâche à mon tableau
    myTasks.push(newTask);
    
    //Puis je met tout à jour en appelant ma fonction
    displayTasks();
});

// Object.filter = (obj, predicate) =>
//     Object.keys(obj)
//           .filter( key => predicate(obj[key]) )
//           .reduce( (res, key) => (res[key] = obj[key], res), {} );

// const scores = {
//     John: 2,
//     Sarah: 3,
//     Janet: 0
// };
// const filtered = Object.filter(scores, score => score < 1); 
// console.log(filtered);

elements.filterPriority.addEventListener('submit', (e) => {
    
    //J'empêche le rechargement de la page
    e.preventDefault();
    
    //Je récupère les données de mon formulaire
    const formData = new FormData(elements.filterPriority);
    
    //Puis je créé une nouvelle tâche
    const filterTasks = {
        title: formData.get('task_name'), //Je récupère la donnée name (task_title) de l'input se trouvant dans le form
        priority: Number(formData.get('choose_priority')), //J'utilise l'attribut Number pour bien récupérer un nombre et non une string
        isDone: false //Par défaut, la tâche n'est pas finie
    };
    
    //Puis je met tout à jour en appelant ma fonction
    displayTasks();
});


//La fonction qui va me permettre de supprimer uniquement les tâches terminées
elements.deleteBtn.addEventListener('click', () => {
    
    if(elements.deactivatePrompt.hasAttribute('disabled') === false && (myTasks = myTasks.filter(myTask => !myTask.isDone))) { //On vérifie que l'élément ayant l'id 'activate-msg' ai l'attribut 'disabled' déclaré en false (soit non-existant) pour savoir si on l'affiche ou non et on supprime toutes les tâches qui ont la propriété isDone en true
        window.alert('Félicitation ! Vous avez terminé une ou plusieurs tâche(s) !');
        displayTasks();
    } else {
        myTasks = myTasks.filter(myTask => !myTask.isDone); //Si l'élément ayant l'id 'activate-msg' a l'attribut 'disabled' déclaré en 'true' alors on affiche juste les tâches non cochées
        displayTasks();
    }
    
    //S'il reste des tâches non complétées, on récupère un nouveau tableau uniquement avec les tâches non complétées
    //On met pas prevent default car le bouton "Supprimer les tâches" a l'attribut 'click' et non 'submit' car le btn ne fait pas parti d'un formulaire
    //Je met à jour l'affichage en appelant ma fonction
    displayTasks();
});


//La fonction qui va me permettre de supprimer toutes les tâches
elements.deleteAllBtn.addEventListener('click', () => {
    
    if(window.confirm("Souhaitez vous vraiment supprimer toutes les tâches ?") === true) {
        myTasks.length = 0; //Je retourne mon tableau myTasks avec une longueur (length) égale à zéro
    } else {
        displayTasks(); //Si j'appuie sur 'Annuler' alors j'affiche ma liste de tâche
    }

    //Puis je met tout à jour (je dois quand même appeler ma fonction en dehors du if-else sinon le tableau ne se mettra pas à jour)
    displayTasks();
});

elements.deactivatePrompt.addEventListener('click', () => {
    
    elements.deactivatePrompt.setAttribute('disabled', '');
});
