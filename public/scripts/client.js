$(document).ready(() => {
  const createTweetElement = (tweetData) => {
    let $tweet = '';

    const user = tweetData.user.name;
    const avatar = tweetData.user.avatars;
    const handle = tweetData.user.handle;
    const content = escape(tweetData.content.text);
    const createdAt = moment(tweetData.created_at).fromNow();

    $tweet =
    `
    <article class="tweet-example">
      <header id = "tweet-header">
        <div id="posts">
          <img src="${avatar}">
          <p>${user}</p>
        </div>
        <span>${handle}</span>
      </header>
      <p>${content}</p>
      <footer>
        <p>${createdAt}</p>
        <span class="icons">
        <i class="fas fa-flag"></i> 
        <i class="far fa-heart"></i>
        <i class="fas fa-retweet"></i>
        </span>
      </footer>
    </article>
    `;
    return $tweet;
  };

  const renderTweets = (tweets) => {
    $("#tweets-container").empty();
    tweets.forEach((element) => {
      let $tweet = createTweetElement(element);
      $("#tweets-container").prepend($tweet);
    });
  };

  const loadTweets = () => {
    $.ajax('/tweets')
      .then(res => {
        console.log(res);
        renderTweets(res);
      }).fail(err => {
        console.log(err);
      });
  };

    
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const validate = (msg) => {
    $(".container").prepend($(".new-tweet-error").text(msg).slideDown().delay(2000).hide(300));
  };

  $("#new-tweet").on("submit", (event) => {
    event.preventDefault();
    const tweetBox = $(event.currentTarget);
    const isValid = tweetBox.find("#tweet-text").val().length;
    
    if (isValid === 0) {
      validate("⚠️⚠️Field cannot be empty, don't be shy tweet something 😜");
      return false;
    }
    if (isValid > 140) {
      validate("⚠️⚠️Oops! That is longer than 140 characters. Long story short?");
      return false;
    }
    $("new-tweet-error").removeClass("active");
    $.ajax('/tweets', {method: 'POST', data: $("#new-tweet").serialize()})
      .then(() => { //only once the response came back to the server
        $("#tweet-text").val("");
        loadTweets();
        $("#tweetcounter").val("140");
      }).fail(err => {
        console.log(err);
      });
  });

  loadTweets();
});