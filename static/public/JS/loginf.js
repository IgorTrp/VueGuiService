function init() {
    document.getElementById('dugme').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            korisnickoIme: document.getElementById("korisnickoIme").value,
            lozinka: document.getElementById("lozinka").value
        };


        if(overiTO(data.korisnickoIme)){
        fetch('https://vue-verification.herokuapp.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(res=>{
            if(res.status!=400 && res.status!=500){
                alert("Ulogovali ste se");
                open("/admin/index","_self");
                return res.json();
            }
              
            else{
                alert("Greska u unosa podataka ili upita");
                throw new Error('Pogreska');
            }
            }).then(resp=>{
                localStorage.setItem('id', resp.id);
                localStorage.setItem('token', resp.token);
                open("/admin/index","_self");
            });
        }
        else{
            alert("Nije dobar unos");
        }
    });

    document.getElementById('testAuth').addEventListener('click', e => {
        e.preventDefault();




        fetch('https://vue-verification.herokuapp.com/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'true' },
            credentials: 'include'
        }).then(res=>{
            if(res.status!=400 && res.status!=500)
              //  open("/admin/index","_self");
              var a;
            else{
                alert("Greska u unosa podataka ili upita");}
            });

    });

    document.getElementById('testAuthkm').addEventListener('click', e => {
        e.preventDefault();




        fetch('https://vue-verification.herokuapp.com/authm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'true' },
            credentials: 'include'
        }).then(res=>{
            if(res.status!=400 && res.status!=500)
              //  open("/admin/index","_self");
              var a;
            else{
                alert("Greska u unosa podataka ili upita");}
            });

    });
}


function overiI(br){
      return Number(br) ||  br === '';
  }
  function overiT(br,len=50){
      return br.length<len ||  br === '';
  }
  
  function overiIO(br){
      return Number(br) && typeof br !== 'undefined';
  }
  function overiTO(br,len=50){
      return br.length<len && typeof br !== 'undefined';
  }
  