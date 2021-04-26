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



