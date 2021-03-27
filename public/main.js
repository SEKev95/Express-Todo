 let input = document.querySelector('#add');
 let btn =  document.querySelector('#btn');
 let list = document.querySelector('#list');
 let el = document.getElementsByTagName('li');

 btn.addEventListener('click',() => { 
    fetch('todomessages')
   .then(res => {if (res.ok){return res.json()}})
//    .then(window.location.reload(true))
     let txt = input.value;
     if(txt === ""){
         alert('you need to write something :/');
     }else{
         let li = document.createElement('li');
         li.innerHTML = txt;
         list.insertBefore(li, list.childNodes[0]);
         input.value = '';
    }
})

list.addEventListener('click', e =>{
    fetch('todomessages')
    .then(res => {if (res.ok){return res.json()}})
    if(e.target.tagName == 'LI'){
        e.target.classList.toggle('checked');
    }
})

function removeAll(){
    fetch('todomessages')
    .then(res => {if (res.ok){return res.json()}})
    document.getElementById("list").innerHTML = "";
}

function removeComp(){
    fetch('todomessages')
    .then(res => {if (res.ok){return res.json()}})
   let close = document.querySelectorAll(".checked")
   for(let i = 0; i < close.length; i++ ){
    close[i].style.display="none"
   }
}
