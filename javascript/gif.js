$(document).ready(function(){

//
var topics = ["baseball", "basketball", "soccer", "football", "hockey", "cricket", "golf", "tennis", "volleyball"]

function displaySports()
{
    $("#sportGifs").empty();
    var sports = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    sports + "&api_key=8a5dzNnAcF9dKXFaFzSeWDb9mcrb3oHx&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) 
    {
       // $("#sportGifs").text(JSON.stringify(response));
       // renderButtons();
       //storing data from ajax
       var results = response.data;
       console.log(response);
       //loop through the 10 gifs
       for (var i=0; i < results.length; i++)
       {
        
            //create new div
            var sportDiv = $("<div>");
            //create text for rating
            
            var p = $("<p>").text("Rating: " + results[i].rating);
            //create image for the gifs
            var sportsImg = $("<img>");
            //add class to sportsImg
            sportsImg.addClass("imgSports");
            
            //adding the gif still and animated to the img's attributes
            sportsImg.attr("src", results[i].images.fixed_height_still.url);
            sportsImg.attr("data-still", results[i].images.fixed_height_still.url);
            sportsImg.attr("data-animate", results[i].images.fixed_height.url);
            sportsImg.attr("data-state", "still");

            sportDiv.append(p);
            sportDiv.append(sportsImg);
            sportDiv.css("float", "left");
            sportDiv.css("width", "30%");            

            $("#sportGifs").prepend(sportDiv);
       
       } 
    });
}
//fucntion to create the buttons
function renderButtons()
{
    $("#sportBtn").empty();
    //for loop to create the button
    for (var i=0; i<topics.length; i++) {

        var a = $("<button>");
        a.addClass("btn btn-primary");
        a.css("margin", "5px");
        a.addClass("spt");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#sportBtn").append(a);
        
    }

}
//onclick to add more buttons
$("#addInput").on("click", function(event){
    //prevents the page from loading.
    event.preventDefault()
    //grabs the input from the box
    var sport = $("#search").val().trim();
    //add movie to the array
    topics.push(sport);
    console.log(topics);

    //call render buttons
    renderButtons();

});
//onlcick function to pause or start gif
$("body").on("click", ".imgSports",  function()
{
    
    var state = $(this).attr("data-state");

    if (state === "still") 
    {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else 
    {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//onclick function to call the ajax function
$(document).on("click", ".spt", displaySports);

//functions calls the initial buttons
renderButtons();

});



