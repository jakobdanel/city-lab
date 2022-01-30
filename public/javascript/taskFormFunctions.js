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
function fillTaskSubject(value){
    let subjectSelect=document.getElementById("taskElement");
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