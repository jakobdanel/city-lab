const formEl = document.querySelector("form");
      const tbodyEl = document.querySelector("tbody");
      const tableEl = document.querySelector("table");
      
      function onAddtask(e) {
        e.preventDefault();
        const borrower = document.getElementById("toolname").value;
        const toolname = document.getElementById("borrower").value;
        const description = document.getElementById("description").value;
        
        tbodyEl.innerHTML += `
            <tr>
                <td>${toolname}</td>
                <td>${borrower}</td>
                <td>${description}</td>
                
                
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