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

const createTweetElement = function (tweetData) {
  let $tweet = '';

  let user = tweetData.user.name;
  let avatar = tweetData.user.avatars;
  let handle = tweetData.user.handle;
  let content = tweetData.content.text;
  let createdAt = tweetData.createdAt;

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

$(document).ready(function (){
    $("#new-tweet").on("submit", function (event) {
    event.preventDefault();
    // console.log( $(this).serialize() );
    // console.log("test")
    // console.log(event)
    $.ajax('/tweets', {method: 'POST', data: $("#new-tweet").serialize()})
      .then(function () { //only once the response came back to the server
        loadTweets();
    // console.log(this)
    }).fail(err => {
      console.log(err);
    });;
  })
  
  loadTweets();
});