//Firebase Configuration
var config = {
    apiKey: "AIzaSyBZcf4rynAHcXqxDtm4Zrzl6uNckFuJUAE",
    authDomain: "mason-jar-83a37.firebaseapp.com",
    databaseURL: "https://mason-jar-83a37.firebaseio.com",
    projectId: "mason-jar-83a37",
    storageBucket: "mason-jar-83a37.appspot.com",
    messagingSenderId: "152815605527"
};
// Initialize Firebase
firebase.initializeApp(config);
var database = firebase.database();

//Captures use
$('#submitBtn').on('click', function(event) {
    event.preventDefault();

    var name = $('#nameInput').val().trim();
    var email = $('#emailInput').val().trim();
    var comment = $('#commentArea').val().trim();

    // Stores variables in local object
    var newComment = {
        name: name,
        email: email,
        comment: comment,
    };
    // Pushes variables to Firebase
    database.ref().push(newComment);

  
    console.log(newComment.name);
    console.log(newComment.comment);


    $('#commentTable').append( "<tr><td>" + "dshjbfidbfud" + "dkhsjzcxbvsud" + "</td> </tr>");
    
    $('#userName').text(newComment.name);
    
    $('#userComment').text(newComment.comment);




    $('#nameInput').val('');
    $('#emailInput').val('');
    $('#commentArea').val('');

    return false;


});