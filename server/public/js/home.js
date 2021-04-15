document.addEventListener("DOMContentLoaded", function (event) {
    let data = axios.get('/see_posting')
    data.then(async res => {
        await displayPost(res.data.rows, postContainer)
    })


});

const likeButton = (e) => {
    const statusId = e.closest('.post').getAttribute('data-id')
    const spanLike = e.querySelector('.likeSpan')

    let data = axios.put(`/${statusId}/like`)

    data.then(res => {
        const userId =  res.data[1]
        const like = res.data[0].rows[0].likes
        spanLike.innerHTML = like.length == 0 ? '' : like.length


        //* check if user already like than passing class
        if(like.includes(userId)) {
            e.classList.add("active");
        }
        else {
           e.classList.remove("active");
        }
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