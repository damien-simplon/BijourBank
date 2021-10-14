console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {

    $(document).foundation();
    

    const params = new URLSearchParams(window.location.search);
    var values = new Array();

    localStorage.clear();

    var i = 0;
    for(var param of params){
      values[i] = param[1];
      i++;
    }
    console.log(values);
    console.log(localStorage.getItem("tableauValues"));
    if(typeof localStorage.getItem("tableauValues") === null){
      values += ";";
      localStorage.setItem("tableauValues", values);
      console.log(localStorage.getItem("tableauValues"));
    }else{
      var tableauValues = localStorage.getItem("tableauValues");
      var tableauLength = 0;
      tableauValues = tableauValues.split(";");
      tableauLength = tableauValues.length - 1;
      for( let j = 0 ; j < tableauLength ; j++ ){
        tableauValues[j] += ";";
      }
      tableauValues[tableauLength] = values;
      console.log(tableauValues);
      localStorage.setItem("tableauValues", tableauValues);
      var values = localStorage.getItem("tableauValues");
      var tabLength = 0;
      values = values.split(";");
      valuesLength = values.length - 1;
      console.log(values);
      for( let j = 1 ; j < valuesLength ; j++ ){
        values[j] = values[j].split(",");
      }
      console.log(values);
    }
    for(let i = 0 ; i < tabLength ; i++){
      if(values[i][0] == "credit" || values[i][0] == "debit"){

        var img = "";
        if(values[i][0] == "credit"){
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
                <h2>${values[i][1]}</h2>
                <small>${values[i][2]}</small>
              </div>
            </div>
            <div class="cell small-3 text-right">
              <div>
                <p class="count">${values[i][3]}€</p>
                <small>100%</small>
              </div>
            </div>
          </div>`;
  
        var div = document.createElement("div");
        div.classList.add("operation", values['operator']);
        div.innerHTML = html;
        var currentDiv = document.getElementsByClassName("grid-container").item(1);
        currentDiv.append(div);
      }
    }
    

});
