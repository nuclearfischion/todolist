
// wait until DOM has loaded
$(document).ready(function(){
    addTodos();

    $('#todoField').keypress(function(event){
        if(event.which == 13){
            // get value from text input area and pass to createTodo
            let newTodoInput = $("#todoField").val();
            console.log("todoField: ", newTodoInput);
            createTodo(newTodoInput);

            $("#todoField").val("");
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
                let id = e._id;
                console.log(id);

                addTodo(id, e);

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
            addTodo(newTodo._id, newTodo);
        })
        .catch(function(err){
            console.log(err);
        });
}

function addTodo(id, e){
    // build html element
    let listItemElement = document.createElement("li");
    $(listItemElement).addClass("collection-item");
    
    let labelElement = document.createElement("label");
    let inputElement = document.createElement("input");
    // check if element is completed
    // console.log(e);
    
    $(inputElement).attr("type", "checkbox").addClass("filled-in").attr("id", id);
    
    let spanElement = document.createElement("span")
    $(spanElement).html(e.name);
    
    if(e.completed){
        $(inputElement).attr("checked", "");
        $(spanElement).addClass("done");
    }
    else{
        $(inputElement).removeAttr("checked");
        $(spanElement).removeClass("done");
    }

    //append an input to label
    $(labelElement).append(inputElement);
    //append a span with todo name to label
    $(labelElement).append(spanElement);

    //append label to li
    $(listItemElement).append(labelElement);
    // console.log(result);
    $(".list").append(listItemElement);
    // $(".list").append(result);
    console.log(labelElement);
}