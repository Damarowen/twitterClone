const textArea = document.getElementById('domTextArea')
const button = document.getElementById('submitPostButton')
const postContainer = document.getElementById('postContainer')
const div = document.createElement('div')

//* event listener for button disabled
textArea.addEventListener('keyup', (e) => {
    const val = e.target.value
    if (val.length > 0) {
        button.disabled = false;
        return
    }
    button.disabled = true;

})

//* event listener for button click

button.addEventListener('click', async (e) => {

    e.preventDefault()

    let data = textArea.value

    const query = await axios.post('/posting', {
        textArea: data
    })

    const date = query.data.rows[0].datetime
    console.log(date)
    let html = await createPostHtml(data, date);
    postContainer.insertAdjacentHTML('afterbegin', html);

    textArea.value = ''
    button.disabled = true;

})


//* function to passing html when user click post button
const createPostHtml = async (post, date) => {
    const profile = await axios.get('/session')
        .then(function (response) {
            return response
        })

    // var timestamp = moment(date).endOf('day').fromNow();
    var timestamp = timeDifference(new Date(), new Date(date))


    let body = `<div class='post'>

  <div class='mainContentContainer'>
      <div class='userImage'>
          <img src='${profile.data.profilepic}'>
      </div>
      <div class='postContentContainer'>
          <div class='header'>
          <a href='/profile/${profile.data.username}' class='displayName'>@${profile.data.username}</a>
          <span class="date">${timestamp}</span>
          </div>
          <div class='postBody'>
              <span>${post}</span>
          </div>
          <div class='postFooter'>
          <div class='postButtonContainer'>
              <button>
                  <i class='far fa-comment'></i>
              </button>
          </div>
          <div class='postButtonContainer'>
              <button>
                  <i class='fas fa-retweet'></i>
              </button>
          </div>
          <div class='postButtonContainer'>
              <button>
                  <i class='far fa-heart'></i>
              </button>
          </div>
          </div>
      </div>
  </div>
</div>`

    return body;


}

//* function to retrive date like twitter 

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if (elapsed / 1000 < 30) return "Just now";

        return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
}