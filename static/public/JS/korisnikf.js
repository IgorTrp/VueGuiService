function init() {

    document.getElementById('izbrisi').addEventListener('click', e => {
        e.preventDefault();

        const data = {id: document.getElementById('iddelete').value,
        token:localStorage.getItem('token')};
        document.getElementById('iddelete').value = '';

        if(overiIO(data.id)){
        fetch('https://vue-rest.herokuapp.com/admin/korisnik', {
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
        primalacId: document.getElementById('iprimalacId').value,
        povlastice: document.getElementById('ipovlastice').value,
        korisnickoIme: document.getElementById('ikorisnickoIme').value,
        lozinka: document.getElementById('ilozinka').value,
        datumRegistracije: document.getElementById('idatumRegistracije').value,
        token:localStorage.getItem('token')
        };

        document.getElementById('iid').value='';
        document.getElementById('iprimalacId').value='';
        document.getElementById('ipovlastice').value='';
        document.getElementById('ikorisnickoIme').value='';
        document.getElementById('ilozinka').value='';
        document.getElementById('idatumRegistracije').value='';
        if(overiIO(data.id) && overiI(data.primalacId) && overiT(data.povlastice)&& overiT(data.korisnickoIme)&& overiT(data.lozinka)&& overiT(data.datumRegistracije)){
        fetch('https://vue-rest.herokuapp.com/admin/korisnik', {
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
        primalacId: document.getElementById('primalacId').value,
        povlastice: document.getElementById('povlastice').value,
        korisnickoIme: document.getElementById('korisnickoIme').value,
        lozinka: document.getElementById('lozinka').value,
        datumRegistracije: document.getElementById('datumRegistracije').value,
        token:localStorage.getItem('token')
        };

        document.getElementById('id').value='';
        document.getElementById('primalacId').value='';
        document.getElementById('povlastice').value='';
        document.getElementById('korisnickoIme').value='';
        document.getElementById('lozinka').value='';
        document.getElementById('datumRegistracije').value='';
		console.log(overiIO(data.id) +" "+ overiIO(data.primalacId) +" "+ overiTO(data.povlastice)+" "+ overiTO(data.korisnickoIme)+" "+ overiTO(data.lozinka)+" "+ overiTO(data.datumRegistracije));
        if(overiIO(data.id) && overiIO(data.primalacId) && overiTO(data.povlastice)&& overiTO(data.korisnickoIme)&& overiTO(data.lozinka)&& overiTO(data.datumRegistracije)){
        fetch('https://vue-rest.herokuapp.com/admin/korisnik', {
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

    fetch('https://vue-rest.herokuapp.com/admin/korisnik/get', {
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
                lsta.innerHTML += `<li>ID: ${el.id}, primalacId: ${el.primalacId}, povlastice: ${el.povlastice}, korisnickoIme: ${el.korisnickoime}, lozinka: ${el.lozinka}, datumRegistracije: ${el.datumregistacije}</li>`;
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
  