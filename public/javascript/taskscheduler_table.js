function fillTaskTable(){
  $.ajax({
    url:"/taskManager",
    method: "GET",
  }).done(function(res){
    let tasks=res.data;
    let table=document.getElementById("taskTable")
    for(i=0; i<tasks.length;i++){
      let row = table.insertRow();
        row.id = "row";
      if(i%2==0){
        row.setAttribute("class","teven");
      }else{
        row.setAttribute("class","todd");
      }
      let name = row.insertCell();
        name.textContent = tasks[i].taskName;
      let type = row.insertCell();
        type.textContent = tasks[i].taskType;
      if(tasks[i].taskType=="Plant"){
        let type = row.insertCell();
        type.textContent = tasks[i].plant;
      }else if(tasks[i].taskType=="Object"){
        let type = row.insertCell();
        type.textContent = tasks[i].object;
      }else if(tasks[i].taskType=="Process"){
        let type = row.insertCell();
        type.textContent = tasks[i].process;
      }
      let creator = row.insertCell();
        creator.textContent = tasks[i].creator;
      let details = row.insertCell();
        details.textContent = tasks[i].details;
      let until = row.insertCell();
        until.textContent = tasks[i].until;
      let assignedTo = row.insertCell();
        assignedTo.textContent = tasks[i].assignedTo;

      let deleteTr = row.insertCell();

      let deleteDiv= document.createElement("div");
      deleteDiv.setAttribute("class","deleteImage")
      
      let binImg = document.createElement("img");
      binImg.src="src/delete_hover.png";
      binImg.id=i;
      binImg.setAttribute("onClick","deleteTaskFromTable(this.id)");
      binImg.setAttribute("class","deleteImage");
      deleteTr.appendChild(binImg);

      let idSaver=row.insertCell();
      idSaver.textContent=tasks[i]._id;
      idSaver.id="taskId"+i
      document.getElementById("taskId"+i).style.display="none"
    } 
  })
}
fillTaskTable();

function deleteTaskFromTable(id){
  let taskId=document.getElementById("taskId"+id);
  let table=document.getElementById("taskTable");
  $.ajax({
    url:"/taskManager/delete/"+taskId.textContent,
    method: "GET",
  }).done(function(res){
    if(res.ok){
      table.deleteRow(parseInt(id)+1)
    }else{
    }
  })
}