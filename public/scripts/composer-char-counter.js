//responsible only for character counter
$(document).ready(function() {
  // --- our code goes here ---
  const $tweet = $('#tweet-text')

  $tweet.on('keydown', function event() { //this points to the textarea #tweet-text
    console.log('this', this)
    const limit = 140
    const length = $(this).val().length;
    // console.log(length)
    const remainingChars = limit - length;
    // console.log("left:", remainingChars)
    // const counter = $(this).parent(["form"]).children(".counter-parent").children(".counter");
    const counter = $(this).siblings(".counter");
    console.log(counter)
    $('#tweetcounter').text(remainingChars);
    if (length > 140) {
      $('#tweetcounter').css('color','red');
    } else {
      $('#tweetcounter').css('color','black');
    }
  
  })
});