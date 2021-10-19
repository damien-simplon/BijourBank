$(document).ready(function () {
	$(document).foundation();
});
console.log('Bijour Bank !');
/**
 * init foundation
 */
function setData() {
	var datastorage = {
		titre: document.getElementById('titre').value,
		desc: document.getElementById('desc').value,
		montant: document.getElementById('montant').value,
		operator: document.getElementById('operator').value,
	};
	localStorage.setItem(Date.now(), JSON.stringify(datastorage));
}

let montantCredit = 0;
let montantDebit = 0;
for (let i = 0; i < localStorage.length; i++) {
	let element = localStorage.key(i);
	let obj = JSON.parse(localStorage.getItem(element));
	var img = '';
	if (obj.operator == 'credit') {
		img = 'sac-dargent';
		montantCredit = montantCredit + Number(obj.montant);
	} else {
		img = 'depenses';
		montantDebit = montantDebit + Number(obj.montant);
	}

  let montantCreditTotal = 0;
  let montantDebitTotal = 0;
	for (let j = 0; j < localStorage.length; j++) {
    let elementTotal = localStorage.key(j);
    let objTotal = JSON.parse(localStorage.getItem(elementTotal));
		if (objTotal.operator == 'credit') {
			montantCreditTotal = montantCreditTotal + Number(objTotal.montant);
		} else {
			montantDebitTotal = montantDebitTotal + Number(objTotal.montant);
		}
	}

	var html = `
        <div class="operation ${obj.operator}">
            <div class="grid-x grid-padding-x align-middle">
                <div class="cell shrink">
                    <div class="picto">
                        <img src="./assets/images/${img}.png" alt="${obj.operator}" />
                    </div>
                </div>
                <div class="cell auto">
                    <div>
                        <h2>${obj.titre}</h2>
                        <small>${obj.desc}</small>
                    </div>
                </div>
                <div class="cell small-3 text-right">
                    <div>
                        <p class="count">${obj.montant}€</p>
                        <small>${ obj.operator == "credit" ? 100 * obj.montant / montantCreditTotal : 100 * obj.montant / montantDebitTotal}%</small>
                    </div>
                </div>
            </div>
        </div>
    `;
	var repalce = document.getElementById('grid-container');
	repalce.insertAdjacentHTML('afterbegin', html);
}

var solde = document.getElementById('solde');
solde.innerHTML = montantCredit - montantDebit + '.00€';

/*
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
      if(values[i].substring(0,1) == "-"){
        values[i] = values[i].split("-");
        values[i] = values[i][1];
      }
      i++;
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

    var goodBad = document.getElementById("goodBad");
    if(montant < 1000){
      goodBad.classList.remove("good");
      goodBad.classList.add("bad");
      goodBad.innerHTML = "ça commence à être la crise !"
    }else{
      goodBad.classList.remove("bad");
      goodBad.classList.add("good");
      goodBad.innerHTML = "on est bien 😃";
    }

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
    
    */
