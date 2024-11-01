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
            let name = card.name, desc = card.description, link = card.link, img = card.img=='#'?'../images/shape2.gif':'../assets/thumbnails/'+card.img;
            let modified = card.modified;
            let tags = module.exports.tagTohtml(card.tags);
            let rate = module.exports.rateBased(card.rating);
            let rating = module.exports.ratingTohtml(rate);
            let lang = module.exports.majorLang(card.language);
            let cost = card.cost==0?'Self':'Group';
            return ([uid, name, desc, img, link, modified, tags, rate, rating, lang, cost]);
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
    foo:() => {
        return 0;
    }
};