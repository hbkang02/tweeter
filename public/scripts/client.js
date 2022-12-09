/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

let renderTweets = function (tweets) {
  $(".tweet-container").text('')

  tweets.reverse().forEach((tweet) => {
    // let current = $(".tweet-container").val()
    // $(".tweet-container").text(current + createTweetElement(tweet))
    $(".tweet-container").append(createTweetElement(tweet))
  });


  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

let createTweetElement = function (tweet) {
  let timePosted = timeago.format(tweet.created_at);


  let $tweet = `
  <article class="tweet">
    <header class="tweet-header">
      <div class="header-user">
        <img src="${tweet.user.avatars}" />
        <span>${escape(tweet.user.name)}</span>
      </div>
      <span class="handle"><${escape(tweet.user.handle)}
      </span>
    </header>
    
    <p class="p-comment">${escape(tweet.content.text)}</p>
    <hr/>
    <footer class="tweet-footer">
    <h5 class="time-posted">${timePosted}</h5>
    <div class="footer-icons">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-thumbs-up"></i>

    </footer>  
  </article>`
  /* Your code for creating the tweet element */
  // ...
  return $tweet;
}


const getTweets = () => $.ajax('/tweets',
  { method: 'GET' })
  .then((data) => {
    renderTweets(data);
  })


$(document).ready(function () {
  $(".alert-container").hide()
  getTweets()

  $(".form-container").submit((event) => {
    event.preventDefault()

    console.log($)
    const $textArea = $(this).find('.textInput');
    const inputText = $textArea.val().trim();

    if (!inputText) {
      $(".alert-message").text("No message was typed in. Please type in your message.")
      $(".alert-container").show()
      return
    } else if (inputText.length > 140) {
      $(".alert-message").text('Messages cannot go over 140 characters.')
      $(".alert-container").show()
      return
    }
    $(".alert-container").hide()
    $.ajax('/tweets', {
      data: { text: inputText },
      method: 'POST',
      success: () => {
        getTweets();
        // $textArea.val(''); // clear textarea
        // $('.counter').text('140'); // reset counter to 140
      },
    })
  })
});

