let add_btn = document.getElementById("add");
let notes = document.querySelector(".notes-container");
let txt_area = document.querySelector("#txt_area");
let color = document.querySelector("#color");
let para_2 = document.querySelector("#p");
let clear_btn = document.getElementById("clear");
let div_container = document.querySelector(".div-container");

function addNotes() {
  if (txt_area.value === "") {
    alert("Please enter some text");
    para_2.style.display = "block";
  } else {
    let div = document.createElement("div");
    let cross = document.createElement("button");
    let para = document.createElement("p");

    cross.innerText = "X";
    cross.style.fontSize = "15px";
    cross.style.marginLeft = "10px";
    cross.style.cursor = "pointer";
    cross.style.backgroundColor = color.value;
    cross.style.border = "none";
    cross.style.color = "white";
    cross.style.borderRadius = "10px";
    cross.style.height = "10px";

    para.innerText = txt_area.value;
    para.style.width = "95%";
    div.style.backgroundColor = color.value;
    div.style.height = "200px";
    div.style.width = "100%";
    div.style.marginTop = "20px";
    div.style.padding = "10px";
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.contentEditable = "true";
    div.style.outline = "none";
    div.style.borderRadius = "10px";
    div.style.overflowY = "auto";

    para_2.style.display = "none";

    div_container.style.display = "flex";
    div_container.style.gap = "10px";

    cross.addEventListener("click", function () {
      div.remove();
    });

    div.appendChild(para);
    div.appendChild(cross);
    div_container.appendChild(div);
    notes.appendChild(div_container);
    txt_area.value = "";
  }
}

add_btn.addEventListener("click", addNotes);

clear_btn.addEventListener("click", function () {
  let divs = document.querySelectorAll(".notes-container div");

  if (divs.length === 0) {
    alert("Notes not added");
    return;
  }

  divs.forEach((note) => {
    note.remove();
  });
  
});
