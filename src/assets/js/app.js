console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {

    $(document).foundation();
    

    const params = new URLSearchParams(window.location.search); // on récupére l'url
    var values = new Array(); //initialisation d'un array
    for (const param of params) { //parcours des paramètres de l'url récupérée
      values[param[0]] = [param[1]]; //on affecte dans un tableau à 2 entrées le nom du param avec sa valeur
    }
    // pour récupérer la valeur d'un param on utilise donc values['operator'];

    var img = "";
    if(values['operator'] == "credit"){
      img = "sac-dargent";
    }else{
      img = "depenses";
    }
        
    var html = `
      <div class="grid-x grid-padding-x align-middle">
        <div class="cell shrink">
          <div class="picto">
            <img src="./assets/images/${img}.png" alt="credit" />
          </div>
        </div>
        <div class="cell auto">
          <div>
            <h2>${values["titre"]}</h2>
            <small>${values["desc"]}</small>
          </div>
        </div>
        <div class="cell small-3 text-right">
          <div>
            <p class="count">${values["montant"]}€</p>
            <small>100%</small>
          </div>
        </div>
      </div>`;

    var div = document.createElement("div");
    div.classList.add("operation", values['operator']);
    div.innerHTML = html;
    var currentDiv = document.getElementsByClassName("grid-container").item(1);
    currentDiv.append(div);

});
