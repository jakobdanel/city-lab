/**
 * Fills the dropdown select for the assignees on the task creation page
 */
function fillUsers(){
    $.ajax({
        url:"/users",
        method: "GET",
      }).done(function(res){
        let users=res.data;
        let select=document.getElementById("assignedTo")
        for(i=0; i<users.length;i++){
          var option = document.createElement("option");
          option.text = users[i].username;
          option.value=users[i].username;
          select.add(option);
        }
        })
}

/**
 * Fills the dropdown select for the items on the task creation page
 * @param {*} value Which type of item from the task
 */
function fillTaskSubject(value){
    let subjectSelect=document.getElementById("taskElement");
    // If type is a plant, get all plants from database
    if(value=="Plant"){
        $("#taskElement").empty();
        $.ajax({
            url:"/plantManager",
            method: "GET",
          }).done(function(res){
            let plants=res.data;
            for(i=0; i<plants.length;i++){
              var option = document.createElement("option");
              option.text = plants[i].plantName;
              option.value=plants[i].plantName;
              subjectSelect.add(option);
            }
        })
        //If type is an object, get all objects from database
    }else if(value=="Object"){
        $("#taskElement").empty();
        $.ajax({
            url:"/objectManager",
            method: "GET",
        }).done(function(res){
            let objects=res.data;
            for(i=0; i<objects.length;i++){
            var option = document.createElement("option");
            option.text = objects[i].objectName;
            option.value=objects[i].objectName;
            subjectSelect.add(option);
            }
        })
        // if type is a process, get all processes from database
    }else if(value=="Process"){
        $("#taskElement").empty();
        $.ajax({
            url:"/processManager",
            method: "GET",
        }).done(function(res){
            let process=res.data;
            for(i=0; i<process.length;i++){
            var option = document.createElement("option");
            option.text = process[i].name;
            option.value=process[i].name;
            subjectSelect.add(option);
            }
        })
    }
}
/**
 * Automatically fills the creator based on the logged in user
 */
function fillCreator(){
    let creator = document.getElementById("creator");
    let response = fetch('/api/verify').then(response => {
    if (response.ok) {
        response.json().then(data => {
            creator.value = data.data.username;
        }).catch(error => console.log(error));
    }
    }).catch(error => console.log(error));
}
fillUsers();
fillCreator();
fillTaskSubject("Plant");