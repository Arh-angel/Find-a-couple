/*create a level screen*/
function createMode(el) {
    if (!document.querySelector('.page__main-list')) {
        const mainContainer = document.querySelector('.page__main-container');
        const winWindow = document.querySelector('.page__main-win-window');
    
        winWindow.remove();

        const list = document.createElement('ul');
        list.classList.add('page__main-list');
        mainContainer.appendChild(list);
    }

    const actualList = document.querySelector('.page__main-list');
    let elements = document.querySelectorAll('.page__btn');
    const mobileEl = document.querySelectorAll('.is-active');

    mobileEl.forEach(element => {
        element.classList.remove('is-active');
    });

    elements.forEach(element => {
        element.classList.remove('active');
    });

    el.classList.add('active');


    if (el.textContent.toLowerCase() === 'сложный режим') {
        createHardMode();
        localStorage.setItem('mode', 'сложный режим');
        actualList.style.gridTemplateColumns = 'repeat(5, 1fr)';
        actualList.style.gridTemplateRows = 'repeat(5, 1fr)';
    } else if (el.textContent.toLowerCase() === 'средний режим') {
        createMediumMode();
        localStorage.setItem('mode', 'средний режим');
        actualList.style.gridTemplateColumns = 'repeat(4, 1fr)';
        actualList.style.gridTemplateRows = 'repeat(4, 1fr)';
    } else {
        console.log(el.textContent.toLowerCase())
        createLightMode();
        localStorage.setItem('mode', 'легкий режим');
        actualList.style.gridTemplateColumns = 'repeat(3, 1fr)';
        actualList.style.gridTemplateRows = 'repeat(3, 1fr)';
    }
}

/*choose and create img, add new card in list, process open img*/
function getNumRandomImg(min = 1, max = 36) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createImg() {
    const imgList = document.querySelectorAll('img');
    const numImg = getNumRandomImg();
    let currentImgSrc = `./images/icons/icon_${numImg}.svg`;
    const result = `<img src="./images/icons/icon_${numImg}.svg" alt="" class="page__main-img">`;


    if (imgList.length === 0) {
        return result;
    } else {
        imgList.forEach(el => {
            if (el.attributes.src.nodeValue === currentImgSrc) {
                createImg();
            }
        }
        )
        return result;
    }
}
function addNewCard(num) {
    const actualList = document.querySelector('.page__main-list');
    const createImages = createImg();

    for (let i = 0; i < num; i++) {
        const newCard = document.createElement('li');
        newCard.addEventListener('click', openImg);
        newCard.classList.add('page__main-item');
        actualList.appendChild(newCard);
        newCard.innerHTML = createImages;
    }
}
function openImg(el) {
    const openImg = document.querySelectorAll('.is-open');
    const numItem = document.querySelectorAll('.page__main-item');

    let num = 2;

    if (numItem.length === 25) {
        num = 4;
    } else if (numItem.length === 16) {
        num = 3;
    } else {
        num = 2;
    }

    if (openImg.length >= num) {
        openImg.forEach(element => {
            element.classList.remove('is-open');
        });
        el.target.classList.add('is-open');
    } else {
        el.target.classList.add('is-open');

        removeClassOpenImg(num);
    }

    foundImg(num);
    fixationFoundItem();
}

function removeClassOpenImg(num) {
    const newOpenImg = document.querySelectorAll('.is-open');
    const foundImg = document.querySelectorAll('.found');

    if (newOpenImg.length === num && foundImg !== num) {
        setTimeout(() => newOpenImg.forEach(element => {
            element.classList.remove('is-open');
        }), 1000)
    }
}
/*remove list level screen, mix item in list, add item in list screen*/
function removeList() {
    const actualList = document.querySelector('.page__main-list');

    return actualList.innerHTML = '';
}
function mixList() {
    let actualItemsList = document.querySelectorAll('.page__main-item');

    let newItemList = {};
    let keys = Object.keys(actualItemsList);

    keys.sort(() => Math.random() - 0.5);

    keys.forEach((i, ind) => {
        newItemList[i] = actualItemsList[ind];
        ind++;
    });

    return newItemList;
}
function addItem() {
    const actualList = document.querySelector('.page__main-list');
    let newActualList = mixList();
    removeList();

    console.log(typeof (newActualList));

    for (key in newActualList) {
        actualList.appendChild(newActualList[key]);
    }
}

/*create level mode*/
function createHardMode() {
    console.log('Сложный')

    removeList();

    let actualItems = document.querySelectorAll('.page__main-item');
    let actualItemsLength = actualItems.length;

    for (let i = actualItemsLength; i < 25; i += 4) {
        actualItemsLength = i;

        if (actualItemsLength < 25 - 1) {
            addNewCard(4);
        } else {
            addNewCard(1);
        }
    }
    mixList();
    addItem();
}
function createMediumMode() {
    console.log('Средний')

    removeList();

    let actualItems = document.querySelectorAll('.page__main-item');
    let actualItemsLength = actualItems.length;


    for (let i = actualItemsLength; i < 16; i += 3) {
        actualItemsLength = i;

        if (actualItemsLength < 16 - 1) {
            addNewCard(3);
        } else {
            addNewCard(1);
        }
    }
    mixList();
    addItem();
}
function createLightMode() {
    console.log('Легкий');

    removeList();

    let actualItems = document.querySelectorAll('.page__main-item');
    let actualItemsLength = actualItems.length;

    for (let i = actualItemsLength; i < 9; i += 2) {
        actualItemsLength = i;

        if (actualItemsLength < 9 - 1) {
            addNewCard(2);
        } else {
            addNewCard(1);
        }
    }

    mixList();
    addItem();
}

/*found img, fixation found img*/
function foundImg(num) {
    const newListOpenImg = document.querySelectorAll('.is-open');

    let counter = 0;

    newListOpenImg.forEach((el) => {
        newListOpenImg.forEach((item) => {
            if (el.firstChild.attributes.src.nodeValue === item.firstChild.attributes.src.nodeValue && newListOpenImg.length > 1) {
                counter++;
            }
        })
    })

    if (counter / num === num) {
        newListOpenImg.forEach((el) => {
            el.classList.add('found');
        })
    }
}
function fixationFoundItem() {
    const foundItem = document.querySelectorAll('.found');
    const actualItemsList = document.querySelectorAll('.page__main-item');

    foundItem.forEach((el) => {
        el.removeEventListener('click', openImg);
    })

    if (foundItem.length === actualItemsList.length - 1) {
        actualItemsList.forEach((el) => {
            if (!el.classList.contains('.found')) {
                el.removeEventListener('click', openImg);
                el.classList.add('found')
            }
        })
    }
    showWinWindow();
}

/*show win window and create new list*/
function showWinWindow() {
    const foundItem = document.querySelectorAll('.found');
    const actualItemsList = document.querySelectorAll('.page__main-item');
    const pageMainContainer = document.querySelector('.page__main-container');
    const listItems = document.querySelector('.page__main-list');
    const modeLevel = localStorage.getItem('mode');

    if (foundItem.length === actualItemsList.length) {
        listItems.remove();

        const winWindow = document.createElement('div');
        winWindow.classList.add('page__main-win-window');

        const winElement = document.createElement('h2');
        winElement.classList.add('page__main-win-window-title');
        winElement.textContent = 'Супер!!! Еще разок?!';

        const btnWinWindow = document.createElement('button');
        btnWinWindow.classList.add('page__btn');
        btnWinWindow.textContent = modeLevel;
        btnWinWindow.addEventListener('click', createList);

        pageMainContainer.appendChild(winWindow);

        winWindow.appendChild(winElement);

        winWindow.appendChild(btnWinWindow);
    }
}
function createList() {
    const mainContainer = document.querySelector('.page__main-container');
    const winWindow = document.querySelector('.page__main-win-window');
    let activeBtn = document.querySelector('.active');

    console.log(activeBtn);
    winWindow.remove();

    const list = document.createElement('ul');
    list.classList.add('page__main-list');
    mainContainer.appendChild(list);

    createMode(activeBtn);
}

/*============add class for burger================*/

function toggelClass() {
    let nameClass = document.querySelectorAll(".header__burger, .page__header-list");
    let pageScroll = document.querySelectorAll(".page");

    pageScroll.forEach(element => { element.classList.toggle('lock') })

    nameClass.forEach(element => {
        return element.classList.toggle('is-active');
    });
}











