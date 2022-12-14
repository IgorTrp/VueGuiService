const express =require("express");
const app=express();
const path=require("path");
const cors = require('cors');
const history = require('connect-history-api-fallback');


app.use(cors({ origin: true, credentials: true }));
app.use('/admin/',express.static(path.join(__dirname,"static")));
const index=require(path.join(__dirname,'index.js'));
const login=require(path.join(__dirname,'login.js'));

const adresa=require(path.join(__dirname,'adresa.js'));
const proizvod=require(path.join(__dirname,'proizvod.js'));
const primalac=require(path.join(__dirname,'primalac.js'));
const porudzbina=require(path.join(__dirname,'porudzbina.js'));
const korisnik=require(path.join(__dirname,'korisnik.js'));
const KorisnikPorudzbina=require(path.join(__dirname,'korisnik-porudzbina.js'));
 

app.use('/admin/index',index);
app.use('/admin/login',login);

app.use('/admin/adresa',adresa);
app.use('/admin/proizvod',proizvod);
app.use('/admin/primalac',primalac);
app.use('/admin/porudzbina',porudzbina);
app.use('/admin/korisnik',korisnik);
app.use('/admin/korisnik-porudzbina',KorisnikPorudzbina);

const staticMdl =express.static(path.join(__dirname,'dist'));

app.use(staticMdl);
app.use(history({index:'/index.html'}));
app.use(staticMdl);

app.listen(process.env.PORT || 9000);
