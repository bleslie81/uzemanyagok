const container = document.querySelector('.blogs')
const searchFrom = document.querySelector('.search')
const orderascBtn = document.querySelector('.orderasc')
const orderdescBtn = document.querySelector('.orderdesc')


const renderPosts = async (term) => {
    const benzin = "benzin"
    const gas = "gas"
    let url='http://localhost:3000/posts?_sort=title&_order=asc'
    if(term){
        url+=`&q=${term}`
    }
    const res = await fetch(url)
    const posts = await res.json()
    let templated = ``
    posts.forEach(post => {
        templated += `
        <div class="post">
            <span style="font-size: 2rem; font-weight: bold;">${post.title}</span>
            <img style="float: right;" src="${post.img}"/>
            <p><b>Cím:</b> ${post.adress}</p>
            <form>
                <p style="padding: 15px 30px 0 5px;">Gázolaj: </p>
                <span id="${post.id}" class="${post.gas=="van" ? 'truestore' : 'falsestore'}" onclick="renderDetails(${post.id},0)">${post.gas}...</span>
                <span class="date"><i>Beküldve: ${post.gasdate}</i></span>
            </form>
            <form>
                <p style="padding: 15px 30px 0 5px;">Normál <br>benzin: </p>
                <span id="${post.id}" class="${post.benzin=="van" ? 'truestore' : 'falsestore'}" onclick="renderDetails(${post.id},1)">${post.benzin}...</span>
                <span class="date"><i>Beküldve: ${post.benzindate}</i></span>
            </form>
        </div>
        `
        
    })
    container.innerHTML = templated
    const date = new Date().toLocaleString()
    console.log(date);
    
}

const orderAsc = async () => {
    let url='http://localhost:3000/posts?_sort=title&_order=asc'
    const res = await fetch(url)
    const posts = await res.json()
    let templated = ``
    posts.forEach(post => {
        templated += `
        <div class="post">
            <span style="font-size: 2rem; font-weight: bold;">${post.title}</span>
            <img style="float: right;" src="${post.img}"/>
            <p><b>Cím:</b> ${post.adress}</p>
            <form>
                <p style="padding: 15px 30px 0 5px;">Gázolaj: </p>
                <span id="${post.id}" class="${post.gas=="van" ? 'truestore' : 'falsestore'}" onclick="renderDetails(${post.id},0)">${post.gas}...</span>
                <span class="date"><i>Beküldve: ${post.gasdate}</i></span>     
            </form>
            <form>
                <p style="padding: 15px 30px 0 5px;">Normál <br>benzin: </p>
                <span id="${post.id}" class="${post.benzin=="van" ? 'truestore' : 'falsestore'}" onclick="renderDetails(${post.id},1)">${post.benzin}...</span>
                <span class="date"><i>Beküldve: ${post.benzindate}</i></span>        
            </form>
        </div>
        `
    })
    container.innerHTML = templated
    searchFrom.term.value=""
}

const orderDesc = async () => {
    let url='http://localhost:3000/posts?_sort=title&_order=desc'
    const res = await fetch(url)
    const posts = await res.json()
    let templated = ``
    posts.forEach(post => {
        templated += `
        <div class="post">
            <span style="font-size: 2rem; font-weight: bold;">${post.title}</span>
            <img style="float: right;" src="${post.img}"/>
            <p><b>Cím:</b> ${post.adress}</p>
            <form>
                <p style="padding: 15px 30px 0 5px;">Gázolaj: </p>
                <span id="${post.id}" class="${post.gas=="van" ? 'truestore' : 'falsestore'}" onclick="renderDetails(${post.id},0)">${post.gas}...</span>
                <span class="date"><i>Beküldve: ${post.gasdate}</i></span>                 
            </form>
            <form>
                <p style="padding: 15px 30px 0 5px;">Normál <br>benzin: </p>
                <span id="${post.id}" class="${post.benzin=="van" ? 'truestore' : 'falsestore'}" onclick="renderDetails(${post.id},1)">${post.benzin}...</span>
                <span class="date"><i>Beküldve: ${post.benzindate}</i></span>              
            </form>
        </div>
        `
    })
    container.innerHTML = templated
    searchFrom.term.value=""
}

searchFrom.addEventListener('submit',(e)=>{
    e.preventDefault()
    renderPosts(searchFrom.term.value.trim())
})

orderascBtn.addEventListener('click',orderAsc)
orderdescBtn.addEventListener('click',orderDesc)

window.addEventListener('DOMContentLoaded',(e)=>renderPosts())

const renderDetails=async (id,uzanyag)=>{
    const result = await fetch('http://localhost:3000/posts/'+id)
    const post = await result.json()
    const gasstate = post.gas
    const benzinstate = post.benzin
    const title = post.title
    const image = post.img
    const adresses = post.adress
    const gasdate = post.gasdate;
    const benzindate = post.benzindate;
    const benzins = post.benzin

    const date = new Date().toLocaleString()
    
        // function taskDate(dateMilli) {
        //     var d = (new Date(dateMilli) + '').split(' ');
            
        
        //     return [d[3], d[1], d[2], d[4]].join('-');
        // }
    
    
    const res = await fetch('http://localhost:3000/posts/'+id,{
        method: 'DELETE'
    })
    if(gasstate=="van" && uzanyag==0){
        const doc = {
            title: title,
            img: image,
            gas: "nincs",
            adress: adresses,
            benzin: benzins,
            gasdate: date,
            benzindate: benzindate
        }
        fetch('http://localhost:3000/posts/',{
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {'Content-Type': 'application/json'}
    })
    }
    if(gasstate=="nincs" && uzanyag==0){
        const doc = {
            title: title,
            img: image,
            gas: "van",
            adress: adresses,
            benzin: benzins,
            gasdate: date,
            benzindate: benzindate
        }
        fetch('http://localhost:3000/posts/',{
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {'Content-Type': 'application/json'}
    })
    }
    if(benzinstate=="van" && uzanyag==1){
        const doc = {
            title: title,
            img: image,
            gas: gasstate,
            adress: adresses,
            benzin: "nincs",
            gasdate: gasdate,
            benzindate: date
        }
        fetch('http://localhost:3000/posts/',{
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {'Content-Type': 'application/json'}
    })
    }
    if(benzinstate=="nincs" && uzanyag==1){
        const doc = {
            title: title,
            img: image,
            gas: gasstate,
            adress: adresses,
            benzin: "van",
            gasdate: gasdate,
            benzindate: date
        }
        fetch('http://localhost:3000/posts/',{
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {'Content-Type': 'application/json'}
    })
    }
    
    window.location.replace('/index.html')
}