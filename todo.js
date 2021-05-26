const titleInput = document.querySelector("input#title")
const descInput = document.querySelector("input#desc")
const addBtn = document.querySelector("button#addbtn")
const tabledata = document.querySelector("#tabledata");



//check if todo exists or add one
if (!localStorage.getItem("todo")) {
    let mkArray = new Array();
    localStorage.setItem("todo", JSON.stringify(mkArray));
}

//loop through localstorage
const loopTodos = () => {
    //empty tabledata first
    tabledata.innerHTML = "";
    let currentItems = JSON.parse(localStorage.getItem("todo"));

    //loop through localstorage
    let serial = 1
    currentItems.forEach((value, index) => {
        tabledata.innerHTML += `<tr id="singleTodo" data-itemid="${index}">
   <td>${serial}</td>
   <td>${value.title}</td>
   <td>${value.desc}</td>
   <td>
       <button id="editBtn" class="btn btn-edit">Edit</button>
 
       <button id="dltBtn" class="btn btn-delete">Delete</button>
   </td>
   </tr>`;
        /*edit and delete button index number declare    data-itemid="${index}"*/
        serial++;
    });

    cancelTodo(); //edit function call in tabledata 
    deleteTodo(); //delete function call in tabledata 



    if (currentItems.length === 0) {
        document.querySelector("table thead").setAttribute("style", "display:none")

        document.querySelector("#emptyMsg").innerHTML = "There is no todo😌";
    } else {
        document.querySelector("table thead").setAttribute("style", "display:contents")
        document.querySelector("#emptyMsg").innerHTML = "";
    }

}

const addTodo = () => {
    addBtn.addEventListener("click", function () {
        let todoTitle = titleInput.value.trim();
        let todoDesc = descInput.value.trim();

        let newTodo = {
            title: todoTitle,
            desc: todoDesc,
        }

        //get current items
        let currentTodos = JSON.parse(localStorage.getItem("todo"));
        currentTodos.push(newTodo);
        //again localStroage clear
        localStorage.clear();

        //Setitem again
        localStorage.setItem("todo", JSON.stringify(currentTodos));

        //empty input boxes 
        titleInput.value = "";
        descInput.value = "";

        //loop table again
        loopTodos();
    })
}
loopTodos();



function deleteTodo() {
    // //delete and edit button
    const allTodos = document.querySelectorAll("#singleTodo");

    allTodos.forEach((todo) => {
        todo.querySelector("#dltBtn").addEventListener("click", function () {
            let currentItems = JSON.parse(localStorage.getItem("todo"));
            let clickIndex = Number(todo.getAttribute("data-itemid"));
            let remainingItems = currentItems.filter((item, index) => {
                return index !== clickIndex;

            })
            //clear localstroage again
            localStorage.clear();
            //add remainingItems
            localStorage.setItem("todo", JSON.stringify(remainingItems));
            loopTodos();

        });
    })
}
deleteTodo();



function cancelTodo() {
    // //edit todo button
    const allTodos = document.querySelectorAll("#singleTodo");

    allTodos.forEach((todo) => {
        todo.querySelector("#editBtn").addEventListener("click", function () {
            let currentItems = JSON.parse(localStorage.getItem("todo"));
            let clickIndex = Number(todo.getAttribute("data-itemid"));


            document.querySelector("#editTitle").value = currentItems[clickIndex].title;
            document.querySelector("#editDesc").value = currentItems[clickIndex].desc;
            document.querySelector("#editForm").style.display = "block";

//cancel button 
            document.querySelector("#cancelBtn").addEventListener("click", function () {
                document.querySelector("#editForm input").value = "";
                document.querySelector("#editForm textarea").value = "";
                document.querySelector("#editForm").style.display = "none";
            })

            ///////////
            document.querySelector("#arrayIndex").value = clickIndex;

            loopTodos();

        });
    })
}

cancelTodo();

function updateTodo() {

    document.querySelector("#updateBtn").addEventListener("click", function () {

        let currentItems = JSON.parse(localStorage.getItem("todo"));
        let editTitle = document.querySelector("#editTitle").value;
        let editDesc = document.querySelector("#editDesc").value;
        let updateIndex = Number(document.querySelector("#arrayIndex").value); 
    
        currentItems[updateIndex].title = editTitle;
        currentItems[updateIndex].desc = editDesc;

        localStorage.clear();
         localStorage.setItem("todo" , JSON.stringify(currentItems));

         /////////////
         document.querySelector("#editTitle").value ="";
         document.querySelector("#editDesc").value ="";
         document.querySelector("#editForm").style.display = "none";


         loopTodos();
    })
  
}

 updateTodo();
addTodo();