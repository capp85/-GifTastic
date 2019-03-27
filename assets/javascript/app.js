//anime character array
var topics =["Luffy", "Goku", "Portgas D. Ace","Ichigo", "Kakashi", "Jiraiya", "Franky", "Vegeta", "Spike"];

  createButtons(); //puts each character in the array in a button 
//console.log(topics)

//creates every new character button
function createButton(animeName) {
    var a = $('<button>');
    a.addClass('anime');
    a.attr('data-name', animeName);
    a.text(animeName);
    $("#button").append(a)
  //  console.log(animeName);
}

//calls for each character in array  
function createButtons() {
  topics.forEach(function(topic) {
    createButton(topic);
  console.log(topic);
  });
};

//add button and function
$('#add-anime-submit').on("click", function(e) {
    e.preventDefault();
    var animeInput = $("#anime-input").val().trim();
    topics.push(animeInput);
    createButton(animeInput);
});
//function to display all gifs in page
function displayGifs() {
    var anime = $(this).attr('data-name');
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    anime + "&api_key=AWnM9LpZYJIgy1ylKImGz9tr4fTd0HKM&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
         // console.log(response);
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
              var gifDiv = $('<div>');
              var showGif = $('<img>');
    
              showGif.attr('src', results[i].images.fixed_height_still.url);
    
              showGif.attr('title', 'Rating: ' + results[i].rating);
    
              showGif.attr('data-still', results[i].images.fixed_height_still.url);
    
              showGif.attr('data-state', 'still');
    
              showGif.addClass('gif');
              showGif.attr('data-animate', results[i].images.fixed_height.url);
    
              gifDiv.prepend(showGif);
    
              $('#gifs').prepend(gifDiv);
    
            //displays rating
            var rated = results[i].rating;
          //  console.log(rated);
            var ratedDisplay= $('<p>').text("Rating: " + rated);
            $('#gifs').prepend(ratedDisplay);
    
        }
    });
}
    
    
//on click function for each giphy to animate and make still
$(document).on('click', '.gif', function() {
      var state = $(this).attr('data-state');

      if (state == 'still'){
          $(this).attr('src', $(this).data('animate'));
          $(this).attr('data-state', 'animate');
    }
      else {
          $(this).attr('src', $(this).data('still'));

          $(this).attr('data-state', 'still');
    };
});

//displays gifs for clicked character
$(document).on('click', '.anime', displayGifs);