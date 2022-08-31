function init() {

    document.getElementById('izbrisi').addEventListener('click', e => {
        e.preventDefault();

        const data = {id: document.getElementById('iddelete').value,
        token:localStorage.getItem('token')};
        document.getElementById('iddelete').value = '';

        if(overiIO(data.id)){
        fetch('https://vue-rest.herokuapp.com/admin/porudzbina', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(res=>{
            if(res.status!=400 && res.status!=500)
                document.location.reload();
            else{
                alert("Greska u unosa podataka ili upita");}
            });
        }
        else{
            alert("Nije dobar unos");
        }
    });

    document.getElementById('izmeni').addEventListener('click', e => {
        e.preventDefault();

        const data = {
        id: document.getElementById('iid').value,
        proizvodId: document.getElementById('iproizvodId').value,
        naznake: document.getElementById('inaznake').value,
        status: document.getElementById('istatus').value,
        vremeNastanka: document.getElementById('ivremeNastanka').value,
        korisnikId: document.getElementById('ikorisnikId').value,
        token:localStorage.getItem('token')
        };

        document.getElementById('iid').value='';
        document.getElementById('iproizvodId').value='';
        document.getElementById('inaznake').value='';
        document.getElementById('istatus').value='';
        document.getElementById('ivremeNastanka').value='';
        document.getElementById('ikorisnikId').value='';

        if(overiIO(data.id) && overiI(data.proizvodId) && overiT(data.naznake)&& overiT(data.status)&& overiT(data.vremeNastanka)&& overiI(data.korisnikId)){
        fetch('https://vue-rest.herokuapp.com/admin/porudzbina', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(res=>{
            if(res.status!=400 && res.status!=500)
                document.location.reload();
            else{
                alert("Greska u unosa podataka ili upita");}
            });
        }
        else{
            alert("Nije dobar unos");
        }
    });


    document.getElementById('posalji').addEventListener('click', e => {
        e.preventDefault();

        const data = {
        id: document.getElementById('id').value,
        proizvodId: document.getElementById('proizvodId').value,
        naznake: document.getElementById('naznake').value,
        status: document.getElementById('status').value,
        vremeNastanka: document.getElementById('vremeNastanka').value,
        korisnikId: document.getElementById('korisnikId').value,
        token:localStorage.getItem('token')
        };

        document.getElementById('id').value='';
        document.getElementById('proizvodId').value='';
        document.getElementById('naznake').value='';
        document.getElementById('status').value='';
        document.getElementById('vremeNastanka').value='';
        document.getElementById('korisnikId').value='';


        if(overiIO(data.id) && overiIO(data.proizvodId) && overiTO(data.naznake)&& overiTO(data.status)&& overiTO(data.vremeNastanka)&& overiIO(data.korisnikId)){
        fetch('https://vue-rest.herokuapp.com/admin/porudzbina', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(res=>{
            if(res.status!=400 && res.status!=500)
                document.location.reload();
            else{
                alert("Greska u unosa podataka ili upita");}
            });
        }
        else{
            alert("Nije dobar unos");
        }
    });



    fetch('https://vue-rest.herokuapp.com/admin/porudzbina/get', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
            credentials: 'include',
            body: JSON.stringify({token:localStorage.getItem('token')})
        }).then( res => res.json())
        .then( data => {
            let lsta = document.getElementById('lista');
            if(typeof data[0] !=='undefined')
            data[0].forEach( el => {
                lsta.innerHTML += `<li>ID: ${el.id}, proizvod Id: ${el.proizvodId}, naznake: ${el.naznake}, status: ${el.status}, Vreme Nastanka: ${el.vremenastanka}, Korisnik Id: ${el.korisnikid}</li>`;
            });
        });


}



function overiI(br){
  //  let br=document.getElementById(id).value 
    return Number(br) ||  br === '';
}
function overiT(br,len=50){
   // let br=document.getElementById(id).value 
    return br.length<len ||  br === '';
}

function overiIO(br){
  //  let br=document.getElementById(id).value;
    return Number(br) && typeof br !== 'undefined';
}
function overiTO(br,len=50){
   // let br=document.getElementById(id).value;
    return br.length<len && typeof br !== 'undefined';
}
