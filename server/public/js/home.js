
document.addEventListener("DOMContentLoaded", function (event) {
    let data = axios.get('/see_posting')
    data.then(async res => {
        await displayPost(res.data.rows, postContainer)
    })
    
   
});

const likeButton = (e) => {
    const statusId = e.closest('.post').getAttribute('data-id')
    // const spanLike = document.getElementById('likeSpan')

    let data = axios.put(`/${statusId}/like`)
    data.then(res => {
        // res.data.rows[0].likes.length
        // spanLike.innerHTML = res.data.rows[0].likes.length > 0 ? res.data.rows[0].likes.length : ''
    })

}

const displayPost = (data, container) => {
    const spanLike = document.getElementById('likeSpan')
    console.log(spanLike)

    data.forEach(async element => {
        let html = await createPostHtml(element)

        console.log(spanLike)
        container.insertAdjacentHTML('afterbegin', html);
        // spanLike.innerHTML = element.likes.length

    });

    if (data.length == 0) {
        container.insertAdjacentHTML('afterbegin', '<span>Nothing to show</span>');
    }
}