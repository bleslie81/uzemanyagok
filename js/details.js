const id = new URLSearchParams(window.location.search).get('id');
const postDeatils = document.querySelector('.details')
const delBtn = document.querySelector('.delete')

const renderDetails=async()=>{
    const res = await fetch('http://localhost:3000/posts/'+id)
    const post = await res.json()
    let templated = `
        <div class="post">
            <h2>${post.title}</h2>
            <p>${post.adress} likes</p>
            <p>${post.body}...</p>
        </div>
        `
    postDeatils.innerHTML = templated 
}

delBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const res = await fetch('http://localhost:3000/posts/'+id,{
        method: 'DELETE'
    })
    window.location.replace('/index.html')
})

window.addEventListener('DOMContentLoaded',(e)=>renderDetails())