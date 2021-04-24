document.addEventListener("DOMContentLoaded", function (event) {
    //* render all posting
    let statusId = document.getElementById('postContainer').getAttribute('data-id')

    let data = axios.get(`/see_posting`, {
        params: {
            ID: statusId
        }
    })
    data.then(async res => {
        console.log(res.data)
        await displayPost(res.data, postContainer)
    })

});

const displayPost = async (data, container) => {
    //* solution for data is not a function because is singular
    if (!Array.isArray(data)) {
        data = [data]
    }

        let html = await createPostHtml(data[0])
        container.insertAdjacentHTML('afterbegin', html);

}

let createPostHtml = async (post) => {

    const profile = await axios.get('/session')
        .then(function (response) {
            return response
        })

    //* check if user already retweet
    const isRetweet = post.retweetby.includes(profile.data.id)

    //*check if user reply
    const isReply = post.replyto.length > 0

    //*create timestamp
    let timestamp = timeDifference(new Date(), new Date(post.datetime))
    //* display like button after rendering
    let likeButtonActiveClass = post.likes.includes(profile.data.id) ? "active" : "";
    //* display rt button after rendering
    var retweetButtonActiveClass = post.retweetby.includes(profile.data.id) ? "active" : "";

    var retweetText = '';

    //* add html retweet if user retweet
    if (isRetweet) {
        retweetText = `<span>
                        <i class='fas fa-retweet'></i>
                        Retweeted by <a href='/profile/${profile.data.id}'>you</a>    
                    </span>`
    }

    var replyFlag = "";
    if (isReply) {
        replyFlag = `<div class='replyFlag'>
        Replying to <a href='/profile/${profile.data.id}'>@${post.replyto[1]}<a>
    </div>`;
    }


    let body = `<div class='post' data-id=${post.status_id} >
    <div class='postActionContainer'>
    ${retweetText}
       </div>
       <div class='mainContentContainer'>
      <div class='userImage'>
          <img src='${profile.data.profilepic}'>
      </div>
      <div class='postContentContainer'>
          <div class='header'>
          <a href='/profile/${post.username}' class='displayName'>@${post.username}</a>
          <span class="date">${timestamp}</span>
          </div>
          ${replyFlag}
          <div class='postBody'>
              <span>${post.text}</span>
          </div>
          <div class='postFooter'>
          <div class='postButtonContainer'>
          <button data-toggle='modal' data-target='#replyModal' onclick='showModal(this)'>
          <i class='far fa-comment'></i>
      </button>
          </div>
          <div class='postButtonContainer green'>
              <button class="${retweetButtonActiveClass}"  onclick='retweetButton(this)'>
                  <i class='fas fa-retweet'></i>
                  <span class='retweetSpan'>${post.retweetby.length > 0 ? post.retweetby.length :''}</span>
              </button>
          </div>
          <div class='postButtonContainer red' >
              <button class="${likeButtonActiveClass}" onclick='likeButton(this)'>
                  <i class='far fa-heart'></i>
                  <span class='likeSpan'>${post.likes.length > 0 ? post.likes.length :''}</span>
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