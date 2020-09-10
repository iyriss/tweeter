/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 //Take in a tweet object that will be responsbile for returning a tweet <article>
// const data =  [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];
$(document).ready(function (){
const createTweetElement = function (tweetData) {
  let $tweet = '';

  const user = tweetData.user.name;
  const avatar = tweetData.user.avatars;
  const handle = tweetData.user.handle;
  const content =escape(tweetData.content.text);
  const createdAt = tweetData.createdAt;

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
        <span>
          <i class="fas fa-flag"></i> 
          <i class="far fa-heart"></i>
          <i class="fas fa-retweet"></i>
        </span>
      </footer>
    </article>
    `;
  return $tweet;
}

const renderTweets = function(tweets) {
  $("#tweets-container").empty();
  // loops through tweets // calls createTweetElement for each tweet
  tweets.forEach(function(element) {
    let $tweet = createTweetElement(element);
    // takes return value and appends it to the tweets container
    $("#tweets-container").prepend($tweet);
  })
}

const loadTweets = function () {
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
  }
  const validate = (msg) => {
    $(".container").prepend($(".new-tweet-error").text(msg).slideDown().delay(2000).hide(300));
  }
    $("#new-tweet").on("submit", function (event) {
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
      .then(function () { //only once the response came back to the server
        loadTweets();
    
    }).fail(err => {
      console.log(err);
    });;
  })
  
  loadTweets();
});