document.addEventListener("DOMContentLoaded", function (event) {
    //* render all posting
    let data = axios.get('/see_posting')
    data.then(async res => {
        await displayPost(res.data.rows, postContainer)
    })

    //* jquery to clear modal when user click outside modal
    $("#replyModal").on("hide.bs.modal", function () {
        clearModal(this)
    });



});



const displayPost = (data, container) => {
    //* solution for data is not a function because is singular
    if (!Array.isArray(data)) {
        data = [data]
    }

    data.forEach(async element => {
        let html = await createPostHtml(element)
        container.insertAdjacentHTML('afterbegin', html);

    });

    if (data.length == 0) {
        container.insertAdjacentHTML('afterbegin', '<span>Nothing to show</span>');
    }
}