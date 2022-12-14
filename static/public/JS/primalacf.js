function init() {

    document.getElementById('izbrisi').addEventListener('click', e => {
        e.preventDefault();

        const data = {id: document.getElementById('iddelete').value,
        token:localStorage.getItem('token')};
        document.getElementById('iddelete').value = '';

        if(overiIO(data.id)){
        fetch('https://vue-rest.herokuapp.com/admin/primalac', {
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
        ime: document.getElementById('iime').value,
        prezime: document.getElementById('iprezime').value,
        telefon: document.getElementById('itelefon').value,
        adresaId: document.getElementById('iadresaId').value,
        token:localStorage.getItem('token')
        };
		
		

        document.getElementById('iid').value='';
        document.getElementById('iime').value='';
        document.getElementById('iprezime').value='';
        document.getElementById('itelefon').value='';
        document.getElementById('iadresaId').value='';

        if(overiIO(data.id) && overiT(data.ime) && overiT(data.prezime)&& overiT(data.telefon)&& overiI(data.adresaId)){
        fetch('https://vue-rest.herokuapp.com/admin/primalac', {
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
        ime: document.getElementById('ime').value,
        prezime: document.getElementById('prezime').value,
        telefon: document.getElementById('telefon').value,
        adresaId: document.getElementById('adresaId').value,
        token:localStorage.getItem('token')
        };
		
		

        document.getElementById('id').value='';
        document.getElementById('ime').value='';
        document.getElementById('prezime').value='';
        document.getElementById('telefon').value='';
        document.getElementById('adresaId').value='';
        if(overiIO(data.id) && overiTO(data.ime) && overiTO(data.prezime)&& overiTO(data.telefon)&& overiIO(data.adresaId)){
        fetch('https://vue-rest.herokuapp.com/admin/primalac', {
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



    fetch('https://vue-rest.herokuapp.com/admin/primalac/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
        credentials: 'include',
        body: JSON.stringify({token:localStorage.getItem('token')})
    }).then( res => res.json())
    .then( data => {
        console.log(data)
        let lsta = document.getElementById('lista');
        if(typeof data[0] !=='undefined')
        data[0].forEach( el => {
            lsta.innerHTML += `<li>ID: ${el.id}, ime: ${el.ime}, prezime: ${el.prezime}, telefon: ${el.telefon}, adresa Id: ${el.adresaId}</li>`;
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
