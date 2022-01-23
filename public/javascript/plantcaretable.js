const formEl = document.querySelector("form");
      const tbodyEl = document.querySelector("tbody");
      const tableEl = document.querySelector("table");
      
      function onAddtask(e) {
        e.preventDefault();
        const plantName = document.getElementById("plantName").value;
        const plantSpecies = document.getElementById("plantSpecies").value;
        const details = document.getElementById("details").value;
        const imgUrl = document.getElementById("imgUrl").value;
        const dataUrl = document.getElementById("dataUrl").value;
        
        tbodyEl.innerHTML += `
            <tr>
                <td>${plantName}</td>
                <td>${plantSpecies}</td>
                <td>${details}</td>
                <td>${imgUrl}</td>
                <td>${dataUrl}</td>
                
                
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