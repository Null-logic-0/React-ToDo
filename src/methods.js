// // import from src modules folder

import DataList from "./datalist.js";

// // get listed inputs from local storage

// export default class display {
//   static getToDoListFromStorage = () => {
//     let toDoLists;

//     if (JSON.parse(localStorage.getItem("LocalDataList")) === null) {
//       toDoLists = [];
//     } else {
//       toDoLists = JSON.parse(localStorage.getItem("LocalDataList"));
//     }
//     return toDoLists;
//   };

//   // add listed inputs to the local storage
//   static addListToStorage = (toDoLists) => {
//     const item = JSON.stringify(toDoLists);
//     localStorage.setItem("LocalDataList", item);
//   };

//   // index list inputs by number
//   static newIndexNum = (toDoLists) => {
//     toDoLists.forEach((item, i) => {
//       item.index = i + 1;
//     });
//   };

//   // delete from local storage
//   static deleteListData = (id) => {
//     let toDoLists = this.getToDoListFromStorage();
//     const ListItemToDelete = toDoLists[id];

//     toDoLists = toDoLists.filter((item) => item !== ListItemToDelete);

//     this.newIndexNum(toDoLists);
//     this.addListToStorage(toDoLists);
//   };

//   static ListInputUpdate = (newDescription, id) => {
//     const toDoLists = this.getToDoListFromStorage();
//     const updateList = toDoLists[id];

//     toDoLists.forEach((item) => {
//       if (item === updateList) {
//         item.description = newDescription;
//       }
//     });

//     this.addListToStorage(toDoLists);
//     this.showLists();
//   };

//   static removeToDoListBtn = () => {
//     document.querySelectorAll(".remove_btn").forEach((button) =>
//       button.addEventListener("click", (event) => {
//         event.preventDefault();
//         let id;
//         if (button.id > 0) {
//           id = button.id - 1;
//         } else {
//           id = 0;
//         }
//         this.deleteListData(id);
//         this.showLists();
//       })
//     );
//   };

//   // section created dynamically
//   static toDoListsHtml = (
//     { description, index },
//     statusCheck,
//     statusCompleted
//   ) => {
//     const ul = document.createElement("ul");
//     ul.className = "to-do";
//     ul.innerHTML = `
//         <li><input class="checkbox" id="${index}" type="checkbox" ${statusCheck}></li>
//         <li><input id="LIST${index}" type="text" class="text${statusCompleted}" value="${description}" readonly></li>
//         <li class="remove-edit">
//         <button class="edit_list_btn" id="${index}"><i class="fa fa-ellipsis-v icon"></i></button>
//         <button class="remove_btn" id="${index}"><i class="fa fa-trash-can icon"></i></button>
//         </li>
//       `;
//     return ul;
//   };

//   // show listed tasks
//   static showLists = () => {
//     const toDoLists = this.getToDoListFromStorage();
//     document.querySelector(".toDoListContainer").innerHTML = "";
//     toDoLists.forEach((item) => {
//       let statusCheck;
//       let statusCompleted;
//       if (item.completed === true) {
//         statusCheck = "checked";
//         statusCompleted = "completed";
//       } else {
//         statusCheck = "";
//         statusCompleted = "";
//       }
//       document
//         .querySelector(".toDoListContainer")
//         .appendChild(this.toDoListsHtml(item, statusCheck, statusCompleted));
//     });

//     this.removeToDoListBtn();
//     this.editListBtnEvent();
//     this.updateListBtnEvent();

//     const event = new Event("listUpdated");
//     document.dispatchEvent(event);
//   };

//   // add a task to a list
//   static addLists = (description) => {
//     const toDoLists = this.getToDoListFromStorage();
//     const index = toDoLists.length + 1;
//     const newTask = new DataList(description, false, index);

//     toDoLists.push(newTask);
//     this.addListToStorage(toDoLists);
//     this.showLists();
//   };

//   // update to do list
//   static updateListBtnEvent = () => {
//     document.querySelectorAll(".text").forEach((input) =>
//       input.addEventListener("keypress", (event) => {
//         if (event.key === "Enter") {
//           event.preventDefault();
//           const inputListId = "LIST";
//           const ListIdSelected = event.currentTarget.id;
//           let listID;

//           if (!ListIdSelected.includes("LIST")) {
//             listID = inputListId.concat(ListIdSelected);
//           } else {
//             listID = ListIdSelected;
//           }

//           document.getElementById(listID).setAttribute("readonly", "readonly");
//           this.ListInputUpdate(
//             document.getElementById(listID).value,
//             Number(listID.replace("LIST", "")) - 1
//           );
//         }
//       })
//     );
//   };

//   // edit list
//   static editListBtnEvent = () => {
//     let previousList = null;
//     document.querySelectorAll(".edit_list_btn").forEach((button) =>
//       button.addEventListener("click", (event) => {
//         event.preventDefault();
//         const inputListId = "LIST";
//         const ListIdSelected = event.currentTarget.id;
//         let listID;

//         if (!ListIdSelected.includes("LIST")) {
//           listID = inputListId.concat(ListIdSelected);
//         } else {
//           listID = ListIdSelected;
//         }

//         if (previousList !== null) {
//           previousList.getElementById(listID).removeAttribute("readonly");
//         }

//         const listItem = event.target.closest("li");
//         previousList = listItem;
//         const ulItem = event.target.closest("ul");

//         listItem.style.background = "rgb(230, 230, 184)";
//         ulItem.style.background = "rgb(230, 230, 184)";

//         document.getElementById(listID).removeAttribute("readonly");
//         document.getElementById(listID).focus();
//         document.getElementById(listID).style.background = "rgb(230, 230, 184)";
//         listItem.querySelector(".edit_list_btn").style.display = "none";
//         listItem.querySelector(".remove_btn").style.display = "block";
//       })
//     );
//   };

//   static currentFilter = "all"; // default filter

//   static showLists = (filter = "all") => {
//     this.currentFilter = filter; // save current filter
//     const toDoLists = this.getToDoListFromStorage();
//     const container = document.querySelector(".toDoListContainer");
//     const filterContainer = document.querySelector(".task-filters");

//     container.innerHTML = "";

//     // Hide filters if no tasks
//     if (toDoLists.length === 0) {
//       filterContainer.style.display = "none";
//     } else {
//       filterContainer.style.display = "flex"; // or "block", depending on your layout
//     }

//     toDoLists
//       .filter((item) => {
//         if (filter === "active") return !item.completed;
//         if (filter === "completed") return item.completed;
//         return true; // 'all'
//       })
//       .forEach((item) => {
//         let statusCheck = item.completed ? "checked" : "";
//         let statusCompleted = item.completed ? "completed" : "";
//         container.appendChild(
//           this.toDoListsHtml(item, statusCheck, statusCompleted)
//         );
//       });

//     this.removeToDoListBtn();
//     this.editListBtnEvent();
//     this.updateListBtnEvent();
//     this.checkBoxEvent();
//   };

//   // ---------- NEW: Checkbox toggle ----------
//   static checkBoxEvent = () => {
//     document.querySelectorAll(".checkbox").forEach((checkbox) => {
//       checkbox.addEventListener("change", () => {
//         const id = Number(checkbox.id) - 1;
//         const toDoLists = this.getToDoListFromStorage();
//         toDoLists[id].completed = checkbox.checked;
//         this.addListToStorage(toDoLists);
//         this.showLists(this.currentFilter);
//       });
//     });
//   };

//   // ---------- NEW: Filter buttons ----------
//   static filterBtnEvent = () => {
//     document.querySelectorAll(".filter-btn").forEach((button) =>
//       button.addEventListener("click", () => {
//         const filter = button.getAttribute("data-filter");
//         this.showLists(filter);
//         document
//           .querySelectorAll(".filter-btn")
//           .forEach((btn) => btn.classList.remove("active"));
//         button.classList.add("active");
//       })
//     );
//   };
// }

// // ---------- Initialize filter buttons ----------
// document.addEventListener("DOMContentLoaded", () => {
//   display.showLists();
//   display.filterBtnEvent();

//   document.getElementById("inputList").addEventListener("submit", (e) => {
//     e.preventDefault(); // stops the POST
//     const input = document.getElementById("addList");
//     if (input.value.trim() !== "") {
//       display.addLists(input.value.trim());
//       input.value = "";
//     }
//   });
// });

export default class display {
  static currentFilter = "all";

  static getToDoListFromStorage = () => {
    const data = localStorage.getItem("LocalDataList");
    return data ? JSON.parse(data) : [];
  };

  static addListToStorage = (toDoLists) => {
    localStorage.setItem("LocalDataList", JSON.stringify(toDoLists));
  };

  static newIndexNum = (toDoLists) => {
    toDoLists.forEach((item, i) => (item.index = i + 1));
  };

  static deleteListData = (index) => {
    let lists = this.getToDoListFromStorage();
    lists = lists.filter((_, i) => i !== index);
    this.newIndexNum(lists);
    this.addListToStorage(lists);
  };

  static ListInputUpdate = (newDescription, index) => {
    const lists = this.getToDoListFromStorage();
    if (!lists[index]) return; // safeguard
    lists[index].description = newDescription;
    this.addListToStorage(lists);
  };

  static addLists = (description) => {
    const lists = this.getToDoListFromStorage();
    lists.push(new DataList(description, false, lists.length + 1));
    this.addListToStorage(lists);
    this.showLists(this.currentFilter);
  };

  static toDoListsHtml = ({ description, index, completed }, arrayIndex) => {
    const ul = document.createElement("ul");
    ul.className = "to-do";
    ul.dataset.index = arrayIndex;
    ul.innerHTML = `
    <li><input class="checkbox" type="checkbox" ${
      completed ? "checked" : ""
    }></li>
    <li><input class="text ${
      completed ? "completed" : ""
    }" type="text" value="${description}" readonly></li>
    <li class="remove-edit">
      <button class="remove_btn" style="display: ${
        completed ? "inline-block" : "none"
      }"><i class="fa fa-trash-can icon"></i></button>
    </li>
  `;
    return ul;
  };

  static showLists = (filter = "all") => {
    this.currentFilter = filter;
    const lists = this.getToDoListFromStorage();
    const container = document.querySelector(".toDoListContainer");
    const filterContainer = document.querySelector(".task-filters");
    container.innerHTML = "";
    filterContainer.style.display = lists.length === 0 ? "none" : "flex";

    lists
      .map((item, i) => ({ ...item, arrayIndex: i }))
      .filter((item) => {
        if (filter === "active") return !item.completed;
        if (filter === "completed") return item.completed;
        return true;
      })
      .forEach((item) => {
        container.appendChild(this.toDoListsHtml(item, item.arrayIndex));
      });

    this.removeToDoListBtn();
    this.enableClickToEdit();
    this.checkBoxEvent();
  };

  static removeToDoListBtn = () => {
    document.querySelectorAll(".remove_btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const index = Number(btn.closest("ul").dataset.index);
        this.deleteListData(index);
        this.showLists(this.currentFilter);
      });
    });
  };

  static enableClickToEdit = () => {
    document.querySelectorAll(".text").forEach((input) => {
      input.addEventListener("click", () => {
        const ul = input.closest("ul");
        const index = Number(ul.dataset.index);

        // Add editing class to the whole ul
        ul.classList.add("editing");

        // Make input editable and focus
        input.removeAttribute("readonly");
        input.focus();

        // Save on Enter key
        const enterHandler = (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            input.setAttribute("readonly", "readonly");
            ul.classList.remove("editing");
            this.ListInputUpdate(input.value, index);
            input.removeEventListener("keypress", enterHandler);
          }
        };
        input.addEventListener("keypress", enterHandler);

        // Save on click outside
        const clickOutsideHandler = (e) => {
          if (!ul.contains(e.target)) {
            input.setAttribute("readonly", "readonly");
            ul.classList.remove("editing");
            this.ListInputUpdate(input.value, index);
            document.removeEventListener("click", clickOutsideHandler);
          }
        };
        setTimeout(
          () => document.addEventListener("click", clickOutsideHandler),
          0
        );
      });
    });
  };

  static checkBoxEvent = () => {
    document.querySelectorAll(".checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const ul = checkbox.closest("ul");
        const index = Number(ul.dataset.index);
        const lists = this.getToDoListFromStorage();
        lists[index].completed = checkbox.checked;
        this.addListToStorage(lists);
        this.showLists(this.currentFilter);
      });
    });
  };

  static filterBtnEvent = () => {
    document.querySelectorAll(".filter-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        this.showLists(filter);
        document
          .querySelectorAll(".filter-btn")
          .forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
      });
    });
  };
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  display.showLists();
  display.filterBtnEvent();

  document.getElementById("inputList").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("addList");
    if (input.value.trim() !== "") {
      display.addLists(input.value.trim());
      input.value = "";
    }
  });

  document.getElementById("btnClear").addEventListener("click", () => {
    localStorage.removeItem("LocalDataList");
    display.showLists();
  });
});
