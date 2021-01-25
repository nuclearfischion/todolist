
// wait until DOM has loaded
$(document).ready(function(){
    addTodos();

    $('#todoField').keypress(function(event){
        if(event.which == 13){
            // get value from text input area and pass to createTodo
            let newTodoInput = $("#todoField").val();
            console.log("todoField: ", newTodoInput);
            createTodo(newTodoInput);

        }
    });
});

let url = "/api/todos";

function addTodos(){
    // make jQuery request
    console.log("adding your todos...");
    $.ajax(url, {'method': 'GET'})
    .done(function(res){
        console.log("result is: ", res);
        res.forEach((e, i)=>{
            console.log(e);
            
            addTodo(e);
            
        });
    });
}

function createTodo(newTodo){
    // sent request to create new todo
    $.post(url, {"name": newTodo})
    .then(function(newTodo){
        console.log("sent post request");
        console.log('newTodo: ', newTodo);
        
            //append todo to HTML
            addTodo(newTodo);
            $("#todoField").val("");    //clear input box
        })
        .catch(function(err){
            console.log(err);
        });
}

function deleteTodo(todoItem){
    console.log("gonna delete your todo!");

    // sent request to create new todo
    $.ajax({url: url+"/"+todoItem, method: 'DELETE'})
    .then(function(newTodo){
        console.log("sent delete request");
        console.log('newTodo: ', newTodo);
        
        //     //append todo to HTML
        //     deleteTodo(newTodo);
        //     // $("#todoField").val("");    //clear input box
        })
        .catch(function(err){
            console.log(err);
        });
}

function addTodo(todoItem){
    console.log("****addTodo item: ", todoItem._id);
    // build html element
    let listItemElement = document.createElement("li");
    $(listItemElement).data('id', todoItem._id);
    console.log("$$$$listItemElement.data: ", $(listItemElement).data());
    $(listItemElement).addClass("collection-item");
    
    let labelElement = document.createElement("label");
    let inputElement = document.createElement("input");
    let deleteButton = document.createElement("button");
    $(deleteButton).addClass("button-delete");
    $(deleteButton).html("<i class=\"material-icons small delete\">delete</i>");
    $(deleteButton).click(function(){
        let clickedItemId = $(this).parent().data().id;
        deleteTodo(clickedItemId);
    });
    // check if element is completed
    // console.log(e);
    
    $(inputElement).attr("type", "checkbox").addClass("filled-in").attr("id", todoItem._id);
    
    let spanElement = document.createElement("span")
    $(spanElement).html(todoItem.name);
    
    if(todoItem.completed){
        $(inputElement).attr("checked", "");
        $(spanElement).addClass("strikethrough");
    }
    else{
        $(inputElement).removeAttr("checked");
        $(spanElement).removeClass("strikethrough");
    }

    //append an input to label
    $(labelElement).append(inputElement);
    //append a span with todo name to label
    $(labelElement).append(spanElement);
    
    //append label to li
    $(listItemElement).append(labelElement);
    // console.log(result);
    $(listItemElement).append(deleteButton);
    $(".list").append(listItemElement);
    // $(".list").append(result);
    console.log(labelElement);
}

