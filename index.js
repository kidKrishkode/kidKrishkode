const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const ejs = require('ejs');
const jsonfile = require('jsonfile');
let varchar, security, hex, compiler;
try{
    varchar = require('./config/env-variables');
    security = require('./config/security');
    hex = require('./config/hex');
    compiler = require('./config/compiler');
}catch(e){
    varchar = require('./config/env-variables.ts');
    security = require('./config/security.ts');
    hex = require('./config/hex.ts');
    compiler = require('./config/compiler.ts');
}
require('./public/App.test.js');
require('dotenv').config();

class WEB{
    constructor(port){
        this.active = true;
        this.port = port;
        this.filename = path.basename(__filename);
        this.appInfo = jsonfile.readFileSync('./public/manifest.json');   
    }
}

const app = express();
let server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const AppName = "kidKrishkode";
let web = new WEB(PORT);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/config',express.static(path.join(__dirname,'config')));
app.use('/images',express.static(path.join(__dirname,'images')));
app.use('/public',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'assets')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    try{
        const url = req.originalUrl;
        const query = url.split('?')[1];
        const baseURL = req.protocol + '://' + req.get('host');
        const params = new URL(url, baseURL).searchParams;
        const public_key = varchar.duplex;
        if(params.has('encode')){
            if(query!=undefined){
                const decodedUrl = security.decodedURI(query.replace('encode=',''), public_key);
                req.url = `${url.split('?')[0]}?${decodedUrl}`;
                req.query = querystring.parse(decodedUrl);
            }
        }else{
            if(query!=undefined){
                const encodedUrl = security.encodedURI(query, public_key);
                req.url = `${url}?encode=${encodedUrl}`;
                req.query = querystring.parse(encodedUrl);
            }
        }
        const my_browser = security.browser(req.headers);
        if(!security.validBrowser([my_browser[0], my_browser[1].split('.')[0]*1], varchar.browser_data)){
            res.status(422).render('notfound',{error: 422, message: "Your browser is outdated and may not support certain features. Please upgrade to a modern browser."});
        }
        next();
    }catch(e){
        console.log("You hit a new error: ", e);
        res.status(401).render('notfound',{error: 401, message: "Unauthorize entry not allow, check the source or report it"});
    }
//    next();
});

const promises = [
    ejs.renderFile('./views/header.ejs'),
    // ejs.renderFile('./views/footer.ejs'),
    // ejs.renderFile('./views/service.ejs'),
    // ejs.renderFile('./views/feed.ejs'),
    // ejs.renderFile('./views/faq.ejs')
];

app.get('/', (req, res) => {
    Promise.all(promises).then(([header]) => {
        res.status(200).render('index',{header});
    });
});

app.get('/index', (req, res) => {
    res.redirect('/');
});

app.get('/varchar', async (req, res) => {
    const navi = req.headers;
    res.status(200).json({varchar, navi, hex:{
        majorLang: hex.majorLang.toString(),
        projectByid: hex.projectByid.toString(),
        contributterByid: hex.contributterByid.toString(),
        rateChecker: hex.rateChecker.toString(),
        rateToStarMaker: hex.rateToStarMaker.toString(),
        sliderImageMaker: hex.sliderImageMaker.toString(),
        sortLang: hex.sortLang.toString(),
        gitCaller: hex.gitCaller.toString()
    }});
});

app.get('/compiler', async (req, res) => {
    res.status(200).json({compiler: {
        updateLineNumbers: compiler.updateLineNumbers.toString(),
        ideDeploy: compiler.ideDeploy.toString(),
        htmlCompiler: compiler.htmlCompiler.toString(),
        jsCompiler: compiler.jsCompiler.toString(),
        pyInterpreter: compiler.pyInterpreter.toString(),
        gcCompiler: compiler.gcCompiler.toString(),
        revers_gcCompiler: compiler.revers_gcCompiler.toString(),
        compilerAssigner: compiler.compilerAssigner.toString(),
        foo: compiler.foo.toString()
    }});
});

app.get('/projects', async (req, res) => {
    const productList = await web.ProductListMaker();
    Promise.all(promises).then(([header]) => {
        res.status(200).render('projects',{header, productList});
    });
});

app.get('/projects/open', async (req, res) => {
    if(req.query.encode!=undefined){
        res.redirect('*');
    }
    const id = req.query.id;
    const productLib = jsonfile.readFileSync('./config/project.json');
    const project = hex.projectByid(id, productLib);
    const contributer = jsonfile.readFileSync('./config/user_contribute.json');
    const code = project.code!=''?project.code.startsWith('https://github.com/')==true?project.code:project.code.startsWith('./')==true?fs.readFileSync(path.join(__dirname, project.code)).toString()+'\n\n':'Error: 503!\nInternal Code fetch not possible due to network gateway or securty purpose!\nAccess code from:\n'+project.code+"\n\n":'\nCode not avalible for this project\n\n';
    const exe = project.code.startsWith('./')==true?project.code.split('.')[project.code.split('.').length-1]:'';

    Promise.all(promises).then(([header]) => {
        res.status(200).render('project',{header, project, contributer, code, exe, descriptionSet: hex.descriptionSet});
    });
});

app.get('/contributter', (req, res) => {
    if(req.query.encode!=undefined){
        res.redirect('*');
    }
    let id = req.query.id;
    const contributer = jsonfile.readFileSync('./config/user_contribute.json');
    const user = hex.contributterProfile(id, contributer);

    const promises = [
        ejs.renderFile('./views/profile.ejs',{
            name: user.name, 
            image: user.img=='#'?'./images/shape2.gif':user.img, 
            profession: user.profession, 
            pronoune: user.pronoune,
            description: user.description,
            contact: user.contact
        })
    ];
    Promise.all(promises).then(([profile]) => {
        res.status(200).json({profile});
    });
});

app.get('/services', async (req, res) => {
    Promise.all(promises).then(([header]) => {
        res.status(200).render('services',{header});
    });
});

app.get('/about', (req, res) => {
    Promise.all(promises).then(([header]) => {
        res.status(200).render('about',{header});
    });
});


WEB.prototype.getAge = function(time){
    return (new Date().getFullYear()) - ((time[0]*1000)+(time[1]*100)+(time[2]*10)+(time[3]*1));
}

WEB.prototype.featureLayout = function(head, value, unit){
    return hex.featureLayout(head, value, unit);
}

WEB.prototype.targetLayout = function(head, statment){
    let layout='';
    for(let i=0; i<head.length; i++){
        if(i==0){
            layout += '<p class="wd-lg">';
        }
        layout += `<span>${head[i]}: </span> ${statment[i]}<br>`;
        if(i==head.length-1){
            layout += '</p>';
        }
    }
    return layout;
}

WEB.prototype.getRelatedDiagnosis = function(relationName){
    const data = jsonfile.readFileSync('./public/manifest.json');
    const relatedDiagnoses = [];
    data['Related-diagnosis'].forEach(diagnosis => {
        if(diagnosis.related.includes(relationName)){
            relatedDiagnoses.push(diagnosis);
        }
    });
    let layout='';
    for(let i=0; i<relatedDiagnoses.length; i++){
        layout += `<li onclick="route('${relatedDiagnoses[i].link}');" title="${relatedDiagnoses[i].name}">${relatedDiagnoses[i].name}</li>`;
    }
    return layout;
}

WEB.prototype.ProductListMaker = async function(){
    const data = jsonfile.readFileSync('./config/project.json');
    const productLib = [];
    data.forEach(project => {
        productLib.push(project);
    });
    let productList='';
    let new_productLib = web.productSwapper(productLib);
    for(let i=0; i<new_productLib.length; i++){
        productList += await web.productCardMaker(i, new_productLib);
    }
    return productList;
}

WEB.prototype.productSwapper = function(productLib){
    return hex.productSwapper(productLib);
}

WEB.prototype.productCardMaker = async function(id, productLib){
    let field = jsonfile.readFileSync('./config/project_field.json');
    let card = hex.productCardMaker(id, productLib);
    if(card != null){
        [id, name, synp, img, link, modified, tags, rate, rating, lang, cost, type] = card;
        const layout = await ejs.renderFile('./views/card.ejs',{id, name, synp, img, link, modified, tags, rate, rating, lang, cost, type: field[type].name});
        return (layout.toString());
    }else{
        return null;
    }
}

WEB.prototype.encodedURI = function(url, key){
    return security.encodedURI(url, key);
}
WEB.prototype.decodedURI = function(url, key){
    return security.decodedURI(url, key);
}

app.get('*', (req, res) => {
    res.status(404).render('notfound',{error: 404, message: "Page not found on this url, check the source or report it"});
});

server.listen(PORT, (err) => {
    if(err) console.log("Oops an error occure:  "+err);
    console.log(`Compiled successfully!\n\nYou can now view \x1b[33m./${path.basename(__filename)}\x1b[0m in the browser.`);
    console.info(`\thttp://localhost:${PORT}`);
    console.log("\n\x1b[32mNode web compiled!\x1b[0m \n");
});