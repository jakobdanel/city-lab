const formEl = document.querySelector("form");
      const tbodyEl = document.querySelector("tbody");
      const tableEl = document.querySelector("table");
      
      function onAddtask(e) {
        e.preventDefault();
        const task = document.getElementById("task").value;
        const assignee = document.getElementById("assignee").value;
        const until = document.getElementById("until").value;
        
        tbodyEl.innerHTML += `
            <tr>
                <td>${task}</td>
                <td>${assignee}</td>
                <td>${until}</td>
                
                <td><button class="deleteBtn">Delete</button></td>
            </tr>
        `;
      }

      function onDeleteRow(e) {
        if (!e.target.classList.contains("deleteBtn")) {
          return;
        }

        const btn = e.target;
        btn.closest("tr").remove();
      }

      formEl.addEventListener("submit", onAddtask);
      tableEl.addEventListener("click", onDeleteRow);