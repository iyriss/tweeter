/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 //Take in a tweet object that will be responsbile for returning a tweet <article>
const createTweetElement = function (data) {
return `
  <article class="tweet-example">
    <header id = "tweet-header">
      <div id="posts">
        <img src="${data.user.avatars}">
        <p>${data.user.name}</p>
      </div>
      <span>${data.user.handle}</span>
    </header>
    <p>${data.content.text}</p>
    <footer>
      <p>${data.created_at}</p>
      <span>
        <i class="fas fa-flag"></i> 
        <i class="far fa-heart"></i>
        <i class="fas fa-retweet"></i>
      </span>
    </footer>
  </article>
`

}

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}
$(document).ready(function (){
  const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});