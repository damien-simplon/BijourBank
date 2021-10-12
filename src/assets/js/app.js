console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();

  var formButton = document.getElementsByClassName("btSubmit").item(0);
  formButton.onclick = function(){
    
    var operator = document.getElementById("operator").value;
    var titre = document.getElementById("titre").value;
    var desc = document.getElementById("desc").value;
    var montant = document.getElementById("montant").value;

    if(operator == ("credit" || "debit")){
      if(operator == "credit"){

      }else{
        
      }
    }

  }

});
