function init() {

    document.getElementById('izbrisi').addEventListener('click', e => {
        e.preventDefault();

        const data = {id: document.getElementById('iddelete').value,
        token:localStorage.getItem('token')};
        document.getElementById('iddelete').value = '';

        if(overiIO(data.id)){
        fetch('https://vue-rest.herokuapp.com/admin/korisnik-porudzbina', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
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
        korisnikId: document.getElementById('ikorisnikId').value,
        porudzbinaId: document.getElementById('iporudzbinaId').value,
        token:localStorage.getItem('token')

        };

        document.getElementById('iid').value='';
        document.getElementById('ikorisnikId').value='';
        document.getElementById('iporudzbinaId').value='';


        if(overiIO(data.id) && overiI(data.korisnikId) && overiI(data.porudzbinaId)){
        fetch('https://vue-rest.herokuapp.com/admin/korisnik-porudzbina', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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
        korisnikId: document.getElementById('korisnikId').value,
        porudzbinaId: document.getElementById('porudzbinaId').value,
        token:localStorage.getItem('token')

        };

        document.getElementById('id').value='';
        document.getElementById('korisnikId').value='';
        document.getElementById('porudzbinaId').value='';


        if(overiIO(data.id) && overiIO(data.korisnikId) && overiIO(data.porudzbinaId)){
        fetch('https://vue-rest.herokuapp.com/admin/korisnik-porudzbina', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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


    fetch('https://vue-rest.herokuapp.com/admin/korisnik-porudzbina/get', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({token:localStorage.getItem('token')})
        }).then( res => res.json())
        .then( data => {
            console.log(data)
            let lsta = document.getElementById('lista');
            if(typeof data[0] !=='undefined')
            data[0].forEach( el => {
                lsta.innerHTML += `<li>ID: ${el.id}, korisnik Id: ${el.korisnikId}, porudzbinaId: ${el.porudzbinaId}</li>`;
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
  