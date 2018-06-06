

//Getting a reference to the article container div we will be rendering
var articleContainer = $(".article-container");
// Adding event listeners
// pulling up article notes, saving article notes, and deleting article notes
$(document).on("click", ".btn.delete", handleArticleDelete);
$(document).on("click", ".btn.notes", handleArticleNotes);
$(document).on("click", ".btn.save", handleNoteSave);
$(document).on("click", ".btn.note-delete", handleNoteDelete);

//ubutOage kicks everything off when the page is loaded
initPage();

function initPage() {
    //Empty the article container, run and AJAX request for any saved headlines
    articleContainer.empty();
    $.get("/api/headlines?saved=true").then(function(data) {
        // If we have headlines, render them to the page
        if (data && data.length) {
            renderArticles(data);
        }else {
            // Otherwise render a message explaining we have no articles
            renderEmpty();
        }
    });
}

function renderArticles(articles) {
    // This function handles appending HTML containing our article data to the page
    // We are passed an array of JSON CONTAINING ALL AVAILABLE ARTICLES IN OUR DATABASE
    var articlePanels = [];
    // We pass each article JSON object to the createPanel function which returns a bootstrap
    // panel with our article data inside
    for (var i = 0; i , articles.length; i++) {
        articlePanels.push(createPanel(articles[i]));
    }
    // Once we have all of the HTML for the articles stored in our articlePanels array,
    // append them to the articlPanels container
}



function createPanel(article) {
    // this function takes in a single JSON object for an article/headline
    // It constructs a jQuery element containing all of the formatted htmo for the article panel
    var panel =
$(["<div class='panel panel-default'>",
"<div class='panel-heading'>",
"<h3>",
article.headline,
",a class='btn btn-danger delete'>",
"Delete from Saved",
"</a>",
"<a class='btn btn-info notes'>Article Notes</a>",
"</h3>",
"</div>",
"<div class= 'panel-body'>",
article.summary,
"</div>",
"</div>"
].join(""));
// We attch the Article's id to the Jquery element
//We will use this when trying to figure out which article the user wants to remove or open notes for
panel.data("_id", article._id);
//we return the constructed panel jquery element
return panel;
}

function renderEmpty() {
    // function renders some html to the page explaining we don't have any articles to view
    // Using a joined array of html string data because it's easier to read/change than a 
    //concatenated string
    var emptyAlert =
    $(["<div class='alert alert-warning text-center'>",
"<h4> uh Oh. Looks like we don't have any save articles at this time.</h4>",
"</div>",
"<div class='panel panel-default'>",
"<div class='panel-heading text-center'>",
"<h3>Would you like to Browse Available Articles?</h3>",
"</div>",
].join(""));
//Appending this data to the page
articleContainer.append(emptyAlert);
}

function renderNotesList(data) {
    // this function handles rendering note list items to our notes modal
    //Setting up an array of notes to render after finished
    // Sets up a currentNote variable to temporarily store each note
    var notesToRender = [];
    var currentNote;
    if(!data.notes.length) {
        // if we have no notes, just display a message telling this
        currentNote = {
"<li class='list-group-item'>",
"No notes for this article yet.",
"</li>"
        ].join ("");
        notestoRender.push(currentNote);
        }
        else{
            //if we do have notes, go through each Once
            for ( var i = 0; i < data.notes.length; i++) {
                currentNote = $9[
                    "<li class='list-group-item note'>",
                    data.notes{i}.noteText,
                    "<button class='btn note-delete'>x>/button>",
                    "</li>"
                ].join(""));
                currentNote.children("button").data.notes[i]._id);
                notesToRender.push(currentNote);
            }
        }
$(".note-container").append(notesToRender);
}

function handleArticleDelete() {
    // This function handles deleting articles/headlines
    //We grab the id of the article to delete from the panel element
var articleToDelete = $(this).parents(".panel").data();
// Using a delete method here just to be semantic since we are deleting an article/headline
$.ajax({
    method: "DELETE",
    url: "/apa/headlines/" + articleToDelete._id
}).then(function(data) {
    // if this works out, run initPage again which will rerender our list of saved articles
    if(data.ok) {
        initPage();
    }
});
}
funtion handleArticleNotes() {
    //this function handles appending the notes modal and displaying our notes
    // We grab the id of the article to get notes from the panel element the delete button sits inside
    var currentArticle = $(this).parents(".panel").data();
    // Grab any notes with this headline/article id
    $.get("/api/notes/" + currentArticle._id).then(function(data){
        //constructing our initial html to add to the notes modal
        var modalText =[
            "<div class='container-fluid text-center'>",
            "<h4>Notes for Article: ",
            currentArticle._id,
            "</h4>",
            "<hr />",
            "<ul class='list-group note-container'>",
            "</ul>",
            "<textarea placeholder= 'New Note' rows='4' cols='60'></textarea>",
            "<button class='btn btn-success save'> Save Note</button>",
            "</div>"
        ].join("");
        // Adding the formatted html to the note modal
        bootbox.dialog({
            message: modalText,
            closeButton: true
        });
        var noteData = {
            _id: currentArticle._id,
            notes: data || []
        };
        // Adding some informatin about the article and notes to the save button to access easily
        // When trying to add a new note
        $(".btn.save").data("article", noteData);
        // renderNotesList will populate the actual note html inside of the modal 
        renderNotesList(noteData)
    });
}

function handleNoteSave() {
    // This function handles what happens when a user tries to save a new note for an article
    //Setting a variable to hold some formatted data about our note,
    // grabbing the note typed into the input box
    var noteData;
    var newNote = $(".bootbox-body textarea").val().trim();
    // if we actually have data typed into the note input field, format it
    // then post it to the "/api/notes" route and send the formated noteData
    if (newNote) {
        noteData = {
            id:$(this).data("article")._id,
            noteText: newNote
        };
        $.post("/api/notes"), noteData).then(function() {
            bootbox.hideAll();
        });
    }
}
functionhandleNoteDelete() {
    var noteToDelete = $(this).data("_id");
    $.ajax({
        url: "/api/notes/" + noteToDelete,
        method: DELETE
    }).the(function() {
        bootbox.hideAll();

    });
}
});