
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

    // $('.list').on('click', 'li', function(){
    //     console.log("this is");
    //     console.log(this);
    //     updateTodo();
    // });
    $('.list').on('click', 'li', function(e){
        console.log('currentTarget from .list.on');
        console.log(e);
        if (e.target == "label"){
            console.log("bye!");
            return;
        }
        updateTodo(this);
    });

    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
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

function addTodo(todoItem){
    // build html element
    let listItemElement = document.createElement("li");
    $(listItemElement).data('id', todoItem._id);
    $(listItemElement).data('completed', todoItem.completed);
    $(listItemElement).addClass("collection-item");
    
    let labelElement = document.createElement("label");
    let inputElement = document.createElement("input");
    let deleteButton = document.createElement("button");
    $(deleteButton).addClass("button-delete");
    $(deleteButton).html("<i class=\"material-icons small delete\">delete</i>");
    $(deleteButton).click(removeTodo);

    // check if element is completed
    // console.log(e);
    
    $(inputElement).attr("type", "checkbox").addClass("filled-in").attr("id", todoItem._id);
    
    let spanElement = document.createElement("span")
    $(spanElement).html(todoItem.name);
    // $(spanElement).click(updateTodo);
    
    // updateTodo(todoItem, inputElement, spanElement);
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

//toggles completion in HTML view
//called by line 16
function toggleTodoCompletion(listItem){
    // make ajax request to update route
    console.log("##########data completed: ");
    console.log($(listItem).data().completed);
    if($(listItem).data().completed===true)
        $(listItem).find("span").addClass("strikethrough");
    else
        $(listItem).find("span").removeClass("strikethrough");

    /*** 
     * NOTE: addClass() and removeClass() both work, but toggleClass() doesn't. whyyyy
     * ***/
    console.log(`this is: `);
    console.log(listItem);
}

//send ajax update request
function updateTodo(todoLiItem){
    console.log("$$$$updateTodo this is:");
    let todoId = $(todoLiItem).data().id;
    $(todoLiItem).data().completed = !($(todoLiItem).data().completed);
    let completed = $(todoLiItem).data().completed;
    console.log(todoId);
    // toggleTodoCompletion(todoLiItem); //TODO: NOT WORKING
    console.log(`completed: ${completed}`);
    $.ajax({
        url: url+'/'+ todoId, 
        method: "PUT",
        data: {completed: completed}})
    .then(function(updatedTodo){
            console.log(updatedTodo);
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
        //     //delete todo in HTML
        //     deleteTodo(newTodo);
        })
        .catch(function(err){
            console.log(err);
        });
}

function removeTodo(){
    let clickedItemId = $(this).parent().data().id;
    deleteTodo(clickedItemId);
    console.log($(this).parent().remove());
}