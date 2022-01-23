const formEl = document.querySelector("form");
      const tbodyEl = document.querySelector("tbody");
      const tableEl = document.querySelector("table");
      
      function onAddtask(e) {
        e.preventDefault();
        const taskName = document.getElementById("taskName").value;
        const taskType = document.getElementById("taskType").value;
        const creator = document.getElementById("creator").value;
        const details = document.getElementById("details").value;
        const until = document.getElementById("until").value;
        const assignee = document.getElementById("assignee").value;

        tbodyEl.innerHTML += `
            <tr>
                <td>${taskName}</td>
                <td>${taskType}</td>
                <td>${creator}</td>
                <td>${details}</td>
                <td>${until}</td>
                <td>${assignee}</td>
                
                
                
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