/**
 * Selects which tasks are shown in schedule depending on filter selection
 * @param {String} mode Which tasks should be shown (all, created, assigned)
 */
function getFilteredTasks(mode){
  let currUser="";
  let response = fetch('/api/verify').then(response => {
    if (response.ok) {
        response.json().then(data => {
            currUser= data.data.username;
        }).catch(error => console.log(error));
    }
  }).catch(error => console.log(error));
  // clear old table and create new
  $("#taskTable tr").remove(); 
      addHeadToTable();
      // Get all tasks
  $.ajax({
    url:"/taskManager",
    method: "GET",
  }).done(function(res){
    let data=res.data;
    // display all tasks
    if(mode==="all"){
      $("#taskTable tr").remove(); 
      addHeadToTable();
      fillTaskTable(data)
    }else if(mode==="assigned"){ // display assigned tasks
      if(data.length!=0){
        let tasks = new Array();
        for(i=0; i<data.length;i++){
          if(data[i].assignedTo===currUser){
            tasks.push(data[i]);
          }
        }
        fillTaskTable(tasks)
      }else{return}
    }else if(mode==="created"){ // display created tasks
      if(data.length!=0){
        let tasks = new Array();
        for(i=0; i<data.length;i++){
          if(data[i].creator===currUser){
            tasks.push(data[i]);
          }
        }
        fillTaskTable(tasks)
      }else{return}
    }
  })
}

/**
 * Creates the schedule, each task is a new row with altering color scheme
 * @param {*} res Array of task objects
 */
function fillTaskTable(res){
    let tasks=res;
    // sort tasks via dates ascending
    tasks.sort(function(a,b){
        if(a.until<b.until){
          return -1;
        }else if(a.until>b.until){
          return 1;
        }else return 0;
      })
    let table=document.getElementById("taskTable")
    // HTML DOM creation
    for(i=0; i<tasks.length;i++){
      let row = table.insertRow();
        row.id = "row";
      // different background colors
      if(i%2==0){
        row.setAttribute("class","teven");
      }else{
        row.setAttribute("class","todd");
      }
      // create different cells for task attributes
      let name = row.insertCell();
        name.textContent = tasks[i].taskName;

      let type = row.insertCell();
        type.textContent = tasks[i].taskType;

      let elem = row.insertCell();
        elem.textContent = tasks[i].taskElement;
        // create onHover popup
        elem.setAttribute("class", "has-details")
        let detailsSpan = document.createElement("span");
        detailsSpan.setAttribute("class", "details rounded")
        getInfoForObject(tasks[i].taskType, tasks[i].taskElement, detailsSpan);
        elem.appendChild(detailsSpan)

      let creator = row.insertCell();
        creator.textContent = tasks[i].creator;
        // create onHover popup
        creator.setAttribute("class", "has-details")
        let creatorSpan = document.createElement("span");
        creatorSpan.setAttribute("class", "details rounded")
        getInfoForUser(creatorSpan, tasks[i].creator);
        creator.appendChild(creatorSpan)

      let details = row.insertCell();
        details.textContent = tasks[i].details;

      let until = row.insertCell();
        until.textContent = createDateString(tasks[i].until);

      let assignedTo = row.insertCell();
        assignedTo.textContent = tasks[i].assignedTo;
        // create onHover popup
        assignedTo.setAttribute("class", "has-details")
        let assignSpan = document.createElement("span");
        assignSpan.setAttribute("class", "details rounded")
        getInfoForUser(assignSpan, tasks[i].assignedTo);
        assignedTo.appendChild(assignSpan)

      // create delete button
      let deleteTr = row.insertCell();

      let deleteDiv= document.createElement("div");
      deleteDiv.setAttribute("class","deleteImage")
      
      let binImg = document.createElement("img");
      binImg.src="src/delete_hover.png";
      binImg.id=i;
      binImg.setAttribute("onClick","deleteTaskFromTable(this.id)");
      binImg.setAttribute("class","deleteImage");
      deleteTr.appendChild(binImg);

      // invisible id saver for delete action
      let idSaver=row.insertCell();
      idSaver.textContent=tasks[i]._id;
      idSaver.id="taskId"+i
      document.getElementById("taskId"+i).style.display="none"
    } 
  }
getFilteredTasks("all");

/**
 * Delete ne task from schedule and drop it out of database
 * @param {*} id 
 */
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

/**
 * Gets all info for one specific item from database and creates a html span element which will be a onHover popup
 * @param {*} type 
 * @param {*} name 
 * @param {*} span 
 */
function getInfoForObject(type, name, span){
  if(type==="Plant"){
    $.ajax({
      url:"/plantManager/"+name,
      method: "GET",
    }).done(function(res){
      let imageHTML="";
      let dataHTML="";
      // set specific elements for plants
      if(res.data.imgUrl!=""){
        imageHTML='</br><a href="'+res.data.imgUrl+'">Picture of the Plant</a>'
      }
      if(res.data.dataUrl!=""){
        dataHTML='</br><a href="'+res.data.dataUrl+'">Further Information</a>'
      }
      let returnString="<p><b>"+res.data.plantName+"</b></br><b>Species: </b>"+res.data.plantSpecies+"</br><b>Details: </b>"+res.data.details+imageHTML+dataHTML+"</p>"
      span.innerHTML=returnString;
    })
  }else if(type==="Object"){
    $.ajax({
      url:"/objectManager/"+name,
      method: "GET",
    }).done(function(res){
      let imageHTML="";
      // set specific elements for objects
      if(res.data.imageUrl!=""){
        imageHTML='</br><a href="'+res.data.imgUrl+'">Picture of the Object</a>'
      }
      let returnString="<p><b>"+res.data.objectName+"</b></br><b>Description: </b>"+res.data.description+imageHTML+"</p>"
      span.innerHTML=returnString;
    })
  }else if(type==="Process"){
    $.ajax({
      url:"/processManager/"+name,
      method: "GET",
    }).done(function(res){
      console.log(res)
      imageHTML="";
      tutorialHTML="";
      // set specific elements for processes
      if(res.data.imageUrl!=""){
        imageHTML='</br><a href="'+res.data.imageUrl+'">Picture of the Process</a>'
      }
      if(res.data.tutorialUrl!=""){
        tutorialHTML='</br><a href="'+res.data.tutorialUrl+'">Tutorial</a>'
      }
      let returnString="<p><b>"+res.data.name+"</b></br><b>Description: </b>"+res.data.description+imageHTML+tutorialHTML+"</p>"
      span.innerHTML=returnString;
    })
  }
}
/**
 * Gets all info for one specific user from database and creates a html span element which will be a onHover popup
 * @param {*} span 
 * @param {*} name 
 */
function getInfoForUser(span, name){
  $.ajax({
    url:"/users/name/"+name,
    method: "GET",
  }).done(function(res){
    let returnString="<p><b>"+res.data.username+"</b></br><b>Name: </b>"+res.data.firstName+" "+res.data.lastName+"</br><b>E-Mail: </b>"+res.data.email+"</br><b>Phone: </b>"+res.data.telefonNumber+"</p>"
      span.innerHTML=returnString;
  })
}

/**
 * creates a table head element wit a specific desgin 
 */
function addHeadToTable(){
  let table=document.getElementById("taskTable")
  let header=table.createTHead();
    let row = header.insertRow();
      row.id = "row";
    let name = row.insertCell();
      name.textContent = "Task";
    let type = row.insertCell();
      type.textContent = "Type";
    let elem = row.insertCell();
      elem.textContent = "Element";
    let creator = row.insertCell();
      creator.textContent = "Creator";
    let details = row.insertCell();
      details.textContent = "Details";
    let until = row.insertCell();
      until.textContent = "Until";
    let assignedTo = row.insertCell();
      assignedTo.textContent = "Assignee";
    let deleteTr = row.insertCell();
}

/**
 * Restructures a date string into "dd.mm.yyyy" format and returns it
 * @param {*} date 
 * @returns 
 */
function createDateString(date){
  var dateWithoutTime = date.split("T")[0]
  var splitDate=dateWithoutTime.split("-");
  var yyyy = splitDate[0];
  var mm = splitDate[1];;
  var dd = splitDate[2];;
  today = dd + '.' + mm + '.' + yyyy;
  return today
}