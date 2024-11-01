let nav = 0;
let theme = 0;
let desc = 0;
let system;
let loader;
let config;
let compiler;
let temp;
let local_memory=[];
let db, memory;
const pageSet = [];
const currentPage = [];
let themeSet = [];

function System(){
    try{
        this.listen = window.location;
        this.navigation = window.navigation;
        this.notes = false;
    }catch(e){
        alert("System not deployed!\n\n",e);
    }
}
function Loader(load){
    this.loaded = load;
}
function MEMORY(){
    this.dbName = 'CHSDB';
    this.dbVersion = 1;
}
function TAB(){
    this.opened = false;
}
document.addEventListener("DOMContentLoaded",() =>{
    loader = new Loader(true);
    loader.creat();
    loader.remove(2000);
    system = new System();
    memory = new MEMORY();
    system.appendBot();
    system.setUp();
});
function user(){
    try{
        system = new System();
    }catch(e){
        console.log("menu not found");
    }
}
function navbar_toggle(){
    if(nav==0){
        document.getElementById('side-menu').style.display = "block";
        nav++;
    }else{
        document.getElementById('side-menu').style.display = "none";
        nav--;
    }
}
Loader.prototype.creat = function(){
    if(loader.loaded!=false){
        const loaderEle = document.createElement('div');
        loaderEle.classList.add("loader");
        loaderEle.innerHTML = `<div class="centerDia"><div class="loading"></div></div>`;
        document.body.appendChild(loaderEle);
    }
}
Loader.prototype.remove = function(time){
    if(time<100){
        return false;
    }
    setTimeout(()=>{
        document.body.removeChild(document.querySelector('.loader'));
        loader.loaded = false;
        system.VisiblePage();
    },time);
}
TAB.prototype.open = function(){
    const tabEle = document.createElement('div');
    tabEle.classList.add("tabPage");
    document.body.appendChild(tabEle);
    TAB.opened = true;
    document.querySelectorAll('.tabPage')[document.querySelectorAll('.tabPage').length-1].classList.add('blbg');
}
TAB.prototype.close = function(){
    document.body.removeChild(document.querySelector('.tabPage'));
    TAB.opened = false;
}
System.prototype.setUp = function(){
    try{
        fetch('/varchar').then(response => response.json()).then(data => {
            config = data.valueOf();
            themeSet = config.varchar.themeSet;
        }).catch(error =>{
            console.error('Error: ',error);
        });
        memory.pullDataBase();
        if(local_memory!=[]){
            setTimeout(()=>{
                system.setTheme();
            },1000);
        }
        document.getElementById('side-menu').innerHTML = '<div class="hambarger-menu"><ul class="nav justify-content-end">'+document.getElementById('nav-menu').innerHTML+'</ul></div>';
        system.compilerSetUp();
    }catch(e){
        console.log("Error to set up initials!\n",e);
    }
}
System.prototype.VisiblePage = function(){
    try{
        for(let i=0; i<pageSet.length; i++){
            document.querySelector("#"+pageSet[i]).style.display = "block";
        }
        system.setActiveMenu(currentPage[currentPage.length-1]);
    }catch(e){
        console.warn("New Problem: ",e);
    }
}
System.prototype.setActiveMenu = function(menuName){
    const navMenu = document.querySelector('#nav-menu');
    const navItems = navMenu.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.querySelector('.nav-link').classList.remove('active');
    });
    const activeItem = navMenu.querySelector(`.nav-link[href="/${menuName.toLowerCase().replace(' ', '')}"]`);
    if(activeItem){
        activeItem.classList.add('active');
    }else{
        return false;
    }
    if(menuName==''){
        system.homeAvaterchange();
    }
}
System.prototype.homeAvaterchange = function(){
    setTimeout(() => {
        document.querySelector('.image').style.opacity = "1";
        document.querySelector('.temp').style.opacity = "0";
        setTimeout(() => {
            document.querySelector('.image').style.opacity = "0";
            document.querySelector('.temp').style.opacity = "1";
        },1800);
    },3000);
}
function route(link){
    window.location = link;
}
function invaild(){
    alert("Sorry, this feature not avalible in this version,\nTry another one!...");
}
System.prototype.themeToggle = function(id){
    if(theme == 0){
        for(let i=0; i<themeSet[1].length; i++){
            document.documentElement.style.setProperty(themeSet[1][i][0], themeSet[1][i][1]);
        }
        theme = 1;
        document.getElementById(id).classList.replace('fa-moon-o', 'fa-sun-o');
    }else{
        for(let i=0; i<themeSet[0].length; i++){
            document.documentElement.style.setProperty(themeSet[0][i][0], themeSet[0][i][1]);
        }
        theme = 0;
        document.getElementById(id).classList.replace('fa-sun-o', 'fa-moon-o');
    }
    local_memory[0] = {
        id: 0,
        name: "Theme",
        value: theme
    };
    system.pushDataBase();
}
System.prototype.setTheme = function(){
    theme = local_memory[0].value;
    for(let i=0; i<themeSet[theme].length; i++){
        document.documentElement.style.setProperty(themeSet[theme][i][0], themeSet[theme][i][1]);
    }
    // document.getElementById('theme'+(theme+1)).classList.replace('fa-moon-o', 'fa-home');
}
System.prototype.encodedURI = function(head, url, key){
    let hash = [["0","*z"],["1","*y"],["2","*x"],["3","*w"],["4","*v"],["5","*u"],["6","*t"],["7","*s"],["8","*r"],["9","*q"],["&",0],["+",1],["=",2],["-",3],["a",4],["e",5],["i",6],["n",7],["u",8],["g",9],["r","!h"],["l","!i"],["t","!j"]];
    let str = url.toString().toLowerCase();
    for(let i=0; i<hash.length; i++){
        str = str.replaceAll(hash[i][0], hash[i][1]);
    }
    return head+'?encode='+str.toString();
}
function search_product(data,list){
    let find=miss=0;
    let input = document.getElementById(`${data}`).value;
    input=input.toLowerCase();
    let x = document.getElementsByClassName(`${list}`);
    for(i = 0; i<x.length; i++){ 
        if(!x[i].innerHTML.toLowerCase().includes(input)){
            x[i].style.display="none";
            miss++;
        }else{
            x[i].style.display="list-item";
            find++;
        }
    }
    if(data=='searchSelectList'){
        data='searchData';
    }
    if(miss>find&&find==0&&miss!=0){
        document.getElementById(data+'DOD').style.display="block";
    }else{
        document.getElementById(data+'DOD').style.display="none";
    }
}
System.prototype.downloadCode = function(id,name){
    const textToDownload = document.getElementById(id).textContent;
    // const fileName = "downloaded_file.txt";
    const fileName = `${name}`;
    const blob = new Blob([textToDownload], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}
System.prototype.compilerSetUp = function(){
    try{
        fetch('/compiler').then(response => response.json()).then(data => {
            compiler = data.compiler.valueOf();
        }).catch(error =>{
            console.error('Error: ',error);
        });
    }catch(e){
        console.log('Error to set up compiler!');
    }
}
System.prototype.appendBot = function(){
    try{
        let layout = `<div id="botDiv" ondblclick="system.openNotes();"><i class="fa fa-sticky-note-o"></i></div>`;
        document.body.innerHTML += layout;
        system.moveBot();
    }catch(e){
        console.warn('Note button provide not possible');
    }
}
System.prototype.removeBot = function(){
    try{
        document.getElementById('botDiv').style.display = "none";
    }catch(e){
        console.warn('Note button provide not possible');
    }
}
System.prototype.appendBotCls = function(){
    try{
        const layout = document.createElement('div');
        layout.classList.add("botCln");
        layout.innerHTML = '&times;';
        document.body.appendChild(layout);
    }catch(e){
        console.warn('Note cls button provide not possible');
    }
}
System.prototype.removeBotCls = function(){
    try{
        document.body.removeChild(document.querySelector('.botCln'));
    }catch(e){
        console.warn('Note cls button remove not possible');
    }
}
System.prototype.moveBot = function(){
    constbotDiv = document.getElementById('draggableDiv');
    function startDrag(e){
        e.preventDefault();
        botDiv.style.cursor = 'grabbing';
        if(!system.notes){
            system.appendBotCls();
        }
        const isTouch = e.type === 'touchstart';
        const initialX = isTouch ? e.touches[0].clientX : e.clientX;
        const initialY = isTouch ? e.touches[0].clientY : e.clientY;
        const offsetX = initialX -botDiv.getBoundingClientRect().left;
        const offsetY = initialY -botDiv.getBoundingClientRect().top;
        function moveAt(pageX, pageY){
            const newX = pageX - offsetX;
            const newY = pageY - offsetY;
            // Boundary checks
            const minLeft = 0;
            const maxLeft = window.innerWidth -botDiv.offsetWidth;
            const minTop = 0;
            const maxTop = window.innerHeight -botDiv.offsetHeight;
            const leftPos = Math.min(Math.max(newX, minLeft), maxLeft);
            const topPos = Math.min(Math.max(newY, minTop), maxTop);
            botDiv.style.left = leftPos + 'px';
            botDiv.style.top = topPos + 'px';
            if(topPos>=(maxTop-40) && topPos<=maxTop  && leftPos>=(maxLeft/2)-40 && leftPos<=(maxLeft/2)+40){
                system.removeBot();
            }
        }
        function onMouseMove(event){
            const moveX = isTouch ? event.touches[0].clientX : event.clientX;
            const moveY = isTouch ? event.touches[0].clientY : event.clientY;
            moveAt(moveX, moveY);
        }
        function stopDrag(){
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener('touchend', stopDrag);
            botDiv.style.cursor = 'grab';
            system.removeBotCls();
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchmove', onMouseMove);
        document.addEventListener('touchend', stopDrag);
    }
    botDiv.addEventListener('mousedown', startDrag);
    botDiv.addEventListener('touchstart', startDrag);
    botDiv.ondragstart = function(){
        return false;
    };
}
System.prototype.openNotes = function(){
    try{
        document.getElementById('botDiv').style.height = "80%";
        document.getElementById('botDiv').style.width = "30%";
        document.getElementById('botDiv').innerHTML = `<div class="noteTab"><div class="option"><span class="btn" onclick="system.minimizeNote();">&minus;</span>
        <span class="btn" onclick="system.removeBot();">&times;</span></div><iframe src="https://kidkrishkode.github.io/NoteBook.github.io/"></iframe></div>`;
        system.notes = true;
    }catch(e){
        console.warn("Note open not possible!");
    }
}
System.prototype.minimizeNote = function(){
    try{
        document.getElementById('botDiv').style.height = "50px";
        document.getElementById('botDiv').style.width = "50px";
        document.getElementById('botDiv').innerHTML = `<i class="fa fa-sticky-note-o"></i>`;
        system.notes = false;
    }catch(e){
        console.warn("Minimize note tab not possible!");
    }
}
System.prototype.toggleDescSize = function(id){
    if(desc==0){
        document.querySelector(id).style.maxHeight="max-content";
        document.querySelector('#reader').innerHTML="Read Less <i class='fa fa-long-arrow-up'></i>";
        desc++;
    }else{
        document.querySelector(id).style.maxHeight="90px";
        document.querySelector('#reader').innerHTML="Read More <i class='fa fa-long-arrow-down'></i>";
        desc--;
    }
}
System.prototype.notify = function(message){
    if(Notification.permission === 'granted'){
        new Notification(message);
    }else if(Notification.permission != 'denied'){
        Notification.requestPermission().then(permission => {
            if(permission === 'granted'){
                new Notification(message);
            }
        });
    }
}
System.prototype.tagTohtml = function(tags){
    let temp = '';
    if(tags.length<=1){
        return '';
    }
    for(let i=0; i<tags.length; i++){
        temp += `<li>${tags[i]}</li>`;
    }
    return temp;
}
System.prototype.viewUser = function(id){
    let link = `${system.encodedURI('/contributter','id='+id)}`;
    fetch(link, {
        method: 'GET',
        header: {
            "Content": "application/json"
        },
    }).then(response => response.json()).then(profile => {
        system.openUser(profile.profile);
    }).catch(e => console.log(e));
}
System.prototype.openUser = function(layout){
    let tab = new TAB();
    tab.open();
    document.querySelector('.tabPage').innerHTML = layout;
}
System.prototype.closeUser = function(){
    let tab = new TAB();
    tab.close();
}
System.prototype.toggleTab = function(target){
    let header = document.getElementById('nav-tab');
    for(let i=0; i<header.children.length; i++){
        header.children[i].classList.remove('active');
        header.children[i].ariaSelected = "false";
        document.getElementById(header.children[i].id.replace('-tab','')).classList.remove('active');
        document.getElementById(header.children[i].id.replace('-tab','')).classList.remove('show');
    }
    document.getElementById(target).classList.add('active');
    document.getElementById(target.replace('-tab','')).classList.add('active');
    document.getElementById(target.replace('-tab','')).classList.add('show');
}
System.prototype.pushDataBase = function(){
    memory.saveArray(local_memory);
}
MEMORY.prototype.openDB = function(){
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(memory.dbName, memory.dbVersion);
        request.onerror = (event) => {
            reject('Error to opening database');
        };
        request.onsuccess = (event) => {
            db = event.target.result;
            resolve('Database opened successfully');
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const store = db.createObjectStore('data', { keyPath: 'id' });
        };
    });
}
MEMORY.prototype.saveArray = async function(array){
    memory.clearDB();
    await memory.openDB();
    const transaction = db.transaction(['data'], 'readwrite');
    const store = transaction.objectStore('data');
    array.forEach(item => {
        store.put(item);
    });
}
MEMORY.prototype.fetchArray = async function(){
    await memory.openDB();
    const transaction = db.transaction(['data'], 'readonly');
    const store = transaction.objectStore('data');
    const request = store.getAll();
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onerror = (event) => {
            reject('Error to fetching data');
        };
    });
}
MEMORY.prototype.clearDB = async function(){
    await memory.openDB();
    const transaction = db.transaction(['data'], 'readwrite');
    const store = transaction.objectStore('data');
    store.clear();
}
MEMORY.prototype.pullDataBase = async function(){
    local_memory = await memory.fetchArray();
}
