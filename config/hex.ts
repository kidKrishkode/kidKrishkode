module.exports = {
    pyerrorscanner: function pyerrorscanner(data){
        if((data*1) - (data*1) == 0){
            return true;
        }else{
            return false;
        }
    },
    pyerrorinfo: function pyerrorinfo(error_log, code){
        let message = '';
        for(let i=0; i<error_log.length; i++){
            if(error_log[i].code == code){
                message = error_log[i].desc;
            }
        }
        return {code, message};
    },
    productCardMaker: (id, productLib) => {
        if(id<=productLib.length && id>=0){
            let card = productLib[id].valueOf();
            let uid = card.id;
            let name = card.name, synp = card.synopsis, link = card.link, img = card.img=='#'?'../images/shape2.gif':'../assets/thumbnails/'+card.img;
            let modified = card.modified;
            let tags = module.exports.tagTohtml(card.tags);
            let rate = module.exports.rateBased(card.rating);
            let rating = module.exports.ratingTohtml(rate);
            let lang = module.exports.majorLang(card.language);
            let cost = card.cost==0?'Self':'Group';
            let type = card.type;
            return ([uid, name, synp, img, link, modified, tags, rate, rating, lang, cost, type]);
        }else{
            return null;
        }
    },
    productSwapper: (productLib) => {
        for(let i=0; i<productLib.length; i++){
            let id = Math.floor(Math.random()*productLib.length);
            let a = productLib[i];
            productLib[i] = productLib[id];
            productLib[id] = a;
        }
        return productLib;
    },
    tagTohtml: (tags) => {
        let temp='';
        if(tags.length==0){
            return '<br>';
        }
        for(let i=0; i<tags.length; i++){
            temp += `<span>${tags[i]}</span>`;
        }
        return temp;
    },
    rateBased: (rating) => {
        let rate = module.exports.rateChecker(rating);
        return rate;
    },
    ratingTohtml: (rate) => {
        let temp = module.exports.rateToStarMaker(rate[0]);
        return temp;
    },
    rateChecker: (arr) => {
        let T=0,M=0;
        for(let i=2; i<7; i++){
            T+=arr[i];
        }
        for(let i=2; i<7; i++){
            M+=(arr[i]*(i-1));
        }
        arr[1]=T;
        arr[0]=(M/T).toFixed(1);
        return arr;
    },
    rateToStarMaker: (rate) => {
        let num = rate * 10, counter, newnum, j, p=0.1;
        if(num % 10 != 0){
            num = Number((num / 10).toFixed(1))*1;
            for(j=1; j<10; j++){
                newnum = num + p;
                if((newnum*10) % 10 == 0){
                    counter = p;
                    num = Math.floor(num);
                    break;
                }
                p+=0.1;
            }
        }else{
            counter = 1;
            num = Number(((num/10).toFixed(1)))*1;
        }
        num = num*1;
        counter = (Number((1-counter*1).toFixed(1))*1);
        let temp='';
        for(j=0; j<num; j++){
            temp+=`<i class="fa fa-star checked"></i>`;
        }
        if(counter<=0.3 && counter>0){
            temp+=`<i class="fa fa-star-o checked"></i>`;
            newnum=1;
        }else if(counter<=0.9 && counter>0.3){
            temp+=`<i class="fa fa-star-half-o checked"></i>`;
            newnum=1;
        }else{
            temp+='';
            newnum=0;
        }
        for(j=0; j<(5-(num+newnum)); j++){
            temp+=`<i class="fa fa-star"></i>`;
        }
        return temp;
    },
    majorLang: (languages) => {
        let temp = {"name": "Empty", "parcentage": 0};
        for(let i=0; i<languages.length; i++){
            if(languages[i].parcentage > temp.parcentage && languages[i].parcentage <= 100){
                temp = languages[i];
            }
        }
        if(temp.name != "Empty"){
            return {name: temp.name, col: temp.name.toLowerCase()};
        }
        return null;
    },
    sortLang: (languages) => {
        let temp = {"name": "Empty", "parcentage": 0};
        if(languages.length < 2){
            return languages;
        }
        for(let j=0; j<languages.length-1; j++){
            for(let i=0; i<languages.length-j-1; i++){
                if(languages[i+1].parcentage > languages[i].parcentage){
                    temp = languages[i]; 
                    languages[i] = languages[i+1]; 
                    languages[i+1] = temp;
                }
            }
        }
        return languages;
    },
    projectByid: (id, productLib) => {
        for(let i=0; i<productLib.length; i++){
            if(productLib[i].id == id*1){
                return productLib[i];
            }
        }
        return null;
    },
    contributterByid: (ids, contributters) => {
        let temp='<li><img src="../public/logo1500.png" alt="Krishfolio" onclick="route(`../index`);"/></li>';
        for(let i=0; i<ids.length; i++){
            for(let j=0; j<contributters.length; j++){
                if(ids[i]*1 == contributters[j].id){
                    temp += `<li onclick="system.viewUser(${contributters[j].id});"><img src=".${contributters[i].img=='#'?'./images/shape2.gif':contributters[i].img}" alt="Krishfolio" title="${contributters[i].name}"/></li>`;
                    break;
                }
            }
        }
        return temp;
    },
    contributterProfile: (id, contributter) => {
        for(let i=0; i<contributter.length; i++){
            if(id*1 == contributter[i].id){
                return contributter[i];
            }
        }
        return null;
    },
    sliderImageMaker: (list) => {
        let temp='';
        // console.log(list);
        if(list!=''){
            for(let i=0; i<list.length; i++){
                temp += `<div class="mySlides1"><img src="${list[i]}" alt="Krishfolio"></div>`;
            }
            temp += '<a class="prev" onclick="plusSlides(-1, 0)">&#10094;</a><a class="next" onclick="plusSlides(1, 0)">&#10095;</a>'
            return temp;
        }else{
            return null;
        }
    },
    gitCaller: (link) => {
        if(link.indexOf('https://github.com/')>=0){
            link = link.replace('https://github.com/','https://api.github.com/repos/');
            let file = link.lastIndexOf('/');
            link = link.substring(0, file)+'/contents/'+link.substring(file+1);
            if(link.startsWith('https://api.github.com/repos/')!=true) return null;
            fetch(link).then(response => response.json()).then(data => {
                const fileContent = atob(data.content);
                return (fileContent);
            }).catch((error)=>{
                // console.error('>>> Error fetching file content:', error);
                return null;
            });
        }else{
            console.log("Provided url is not associate with github, check it.\n"+link);
        }
        return null;
    },
    descriptionSet: (desc) => {
        if(desc.indexOf('https://github.com/')>=0){
            let fileContent = module.exports.gitCaller(desc);
            if(fileContent==null){
                return 'Error: 503!\nDescription context fetching faild due to some network problem or security purpose.\n\n';
            }
            return fileContent;
        }
    },
    foo:() => {
        return 0;
    },
};