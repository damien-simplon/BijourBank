console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {

    $(document).foundation();

    var get = function(tableauGet){
      var tableau = new Array();
      for(let i = 0 ; i < tableauGet.length ; i++){
        tableau[i] = tableauGet[i].textContent;
      }
      return tableau;
    }

    var addValue = function(tableau, value){
      tableau[tableau.length] = value;
    }

    const params = new URLSearchParams(window.location.search);
    var values = new Array();
   
    var i = 0;
    for(var param of params){
      values[i] = param[1];
      i++;
      if(values[3].includes("-")){
        values[3] = values[3].split("-");
        values[3] = values[3][1];
      }
    }
    
    console.log(values);

    //localStorage.clear();

    var operationGet;
    var titreGet;
    var descGet;
    var countGet;
    
    var operation = new Array();
    var titre = new Array();
    var desc = new Array();
    var count = new Array();

    var storageLocal = false;
    if(localStorage.getItem("operation")){
      operationGet = localStorage.getItem("operation");
      operation = operationGet.split(",");
      titreGet = localStorage.getItem("titre");
      titre = titreGet.split(",");
      descGet = localStorage.getItem("desc");
      desc = descGet.split(",");
      countGet = localStorage.getItem("count");
      count = countGet.split(",");
      storageLocal = true;
    }else{
       operationGet = document.getElementsByClassName("operation");
       titreGet = document.getElementsByClassName("titre");
       descGet = document.getElementsByClassName("desc");
       countGet = document.getElementsByClassName("count");
    }
    console.log(operationGet);
    console.log(titreGet);
    console.log(descGet);
    console.log(countGet);
    console.log(storageLocal);
    
    if(storageLocal == false){
      console.log(storageLocal);
      console.log(operationGet);
      for(let i = 0 ; i < operationGet.length ; i++){
          if(operationGet[i].classList.contains("credit")){
            operation[i] = "credit";
          }else{
            operation[i] = "debit";
          }
      }
      titre = get(titreGet);
      desc = get(descGet);
      count = get(countGet);
    }


    if(values[0] == "debit" || values[0] == "credit"){
      addValue(operation,values[0]);
      addValue(titre,values[1]);
      addValue(desc,values[2]);
      values[3] += "€";
      addValue(count,values[3]);
    }

    localStorage.setItem("operation", operation);
    localStorage.setItem("titre", titre);
    localStorage.setItem("desc", desc);
    localStorage.setItem("count", count);
    
    console.log(operation);
    console.log(titre);
    console.log(desc);
    console.log(count);

    var montant = 0;
    for(let i = 0 ; i < count.length ; i++){
      var nombreBrut = count[i].split("€");
      var nombre = nombreBrut[0].replace(/ /g, '');
      var parseNombre = parseInt(nombre,10);
      if(operation[i] == "credit"){
        montant += parseNombre;
      }else{
        montant -= parseNombre;
      }
    }
    console.log(montant);

    var montantGet = document.getElementById("solde");
    montantGet.innerHTML = montant + ".00 €";

    operationGet = document.getElementsByClassName("operation");
    var removeOperationsLength = operationGet.length - 1;
    for(let i = removeOperationsLength ; i >= 0 ; i--){
      operationGet.item(i).remove();
    }

    for(let i = 0 ; i < operation.length ; i++){

      var img = "";
      if(operation[i] == "credit"){
        img = "sac-dargent";
      }else{
        img = "depenses";
      }
         
      var html = `
        <div class="grid-x grid-padding-x align-middle">
          <div class="cell shrink">
            <div class="picto">
              <img src="./assets/images/${img}.png" alt="${operation[i]}" />
            </div>
          </div>
          <div class="cell auto">
            <div>
              <h2>${titre[i]}</h2>
              <small>${desc[i]}</small>
            </div>
          </div>
          <div class="cell small-3 text-right">
            <div>
              <p class="count">${count[i]}</p>
              <small>100%</small>
            </div>
          </div>
        </div>`;

      var div = document.createElement("div");
      div.classList.add("operation", operation[i]);
      div.innerHTML = html;
      var currentDiv = document.getElementsByClassName("grid-container").item(1);
      currentDiv.append(div);
      
    }
    

});
