const likes = document.getElementsByClassName('likeButton')

document.addEventListener("DOMContentLoaded", function (event) {
    let data = axios.get('/see_posting')
    data.then(async res => {
        await displayPost(res.data.rows, postContainer)
    })
    
   
});

const likeButton = (e) => {
    const statusId = e.closest('.post').getAttribute('data-id')

    let data = axios.put(`/${statusId}/like`)
    data.then(async res => {
        console.log(res)
    })

}

const displayPost = (data, container) => {
    data.forEach(async element => {
        let html = await createPostHtml(element)
        container.insertAdjacentHTML('afterbegin', html);

    });

    if (data.length == 0) {
        container.insertAdjacentHTML('afterbegin', '<span>Nothing to show</span>');
    }
}