$(document).ready(function() {
  const createTweetElement = function(tweetData) {
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
          <i class="flag"></i> 
          <i class="heart"></i>
          <i class="retweet"></i>
        </span>
      </footer>
    </article>
    `;
    return $tweet;
  };

  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    tweets.forEach(function(element) {
      let $tweet = createTweetElement(element);
      $("#tweets-container").prepend($tweet);
    });
  };

  const loadTweets = function() {
    $.ajax('/tweets')
      .then(res => {
        console.log(res);
        renderTweets(res);
      }).fail(err => {
        console.log(err);
      });
  };

    
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const validate = (msg) => {
    $(".container").prepend($(".new-tweet-error").text(msg).slideDown().delay(2000).hide(300));
  };

  $("#new-tweet").on("submit", function(event) {
    event.preventDefault();
    const tweetBox = $(this);
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
      .then(function() { //only once the response came back to the server
        $("#tweet-text").val("");
        loadTweets();
      }).fail(err => {
        console.log(err);
      });
  });

  loadTweets();
});