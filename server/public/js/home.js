
document.addEventListener("DOMContentLoaded", function (event) {
    let data = axios.get('/see_posting')
    data.then(async res => {
    await outputPost(res.data.rows, postContainer)
    })
});

const outputPost = (data, container) => {
   data.forEach(async element => {
        let html = await createPostHtml(element.text, element.datetime)
        container.insertAdjacentHTML('afterbegin', html);

    });

    if(data.length == 0) {
        container.insertAdjacentHTML('afterbegin', '<span>Nothing to show</span>');
    }
}

