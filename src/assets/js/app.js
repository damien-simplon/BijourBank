$(document).ready(function () {
	$(document).foundation();
});
console.log('Bijour Bank !');
/**
 * init foundation
 */

let montantCredit = 0;
let montantDebit = 0;
var repalce = document.getElementById('grid-container');

function setData() {
	let i = localStorage.length;
	var datastorage = {
		titre: document.getElementById('titre').value,
		desc: document.getElementById('desc').value,
		montant: document.getElementById('montant').value,
		operator: document.getElementById('operator').value,
	};
	localStorage.setItem(i, JSON.stringify(datastorage));
}

var affichageSuperieur = function () {
	var montant = montantCredit - montantDebit;
	var solde = document.getElementById('solde');
	solde.innerHTML = montant + '.00€';
	var goodBad = document.getElementById('goodBad');
	if (montant >= 1000) {
		goodBad.innerHTML = 'on est bien 😃';
		goodBad.classList.remove('bad');
		goodBad.classList.add('good');
	} else {
		goodBad.innerHTML = 'on est mal :(';
		goodBad.classList.remove('good');
		goodBad.classList.add('bad');
	}
};

var affichage = function () {
	for (let i = 0; i < localStorage.length; i++) {
		var obj = JSON.parse(localStorage.getItem(i));

		let html = affichageHTML(obj);
		repalce.insertAdjacentHTML('afterbegin', html);
	}
};

var affichageHTML = function (obj) {
	let img = '';
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
                    <small>${
						obj.operator == 'credit'
							? (100 * obj.montant) / montantCreditTotal
							: (100 * obj.montant) / montantDebitTotal
					}%</small>
                </div>
            </div>
        </div>
    </div>`;

	return html;
};

var filtres = function (nb, filtreA) {
	for (let i = 0; i < filtreA.length; i++) {
		filtreA.item(i).className = '';
	}
	filtreA.item(nb).classList.add('active');
};

function view(cd) {
	var filtre = document.getElementsByClassName('navHeader');
	filtre = filtre.item(0);
	var filtreA = filtre.getElementsByTagName('a');
	var repalce = document.getElementById('grid-container');
	repalce.innerHTML = '';
	if (cd == 'all') {
		affichage();
		filtres(0, filtreA);
	} else {
		for (let i = 0; i < localStorage.length; i++) {
			var obj = JSON.parse(localStorage.getItem(i));
			if (obj.operator == cd) {
				let html = affichageHTML(obj);
				repalce.insertAdjacentHTML('afterbegin', html);
			}
		}
		if (cd == 'credit') {
			filtres(1, filtreA);
		} else {
			filtres(2, filtreA);
		}
	}
}

affichage();
affichageSuperieur();
