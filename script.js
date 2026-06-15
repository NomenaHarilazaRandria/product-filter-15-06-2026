//liste des produits disponibles
const products = [
{
	id:1,
	name:["pc","ordinateur portable","computer"],
	marque: "HP Pavilion x360",
	categorie: "informatique",
	productImage: "images/hp-pavilion-x360.jpg",
	price: 800
},
{
	id:2,
	name:["pc","ordinateur de bureau","computer"],
	categorie: "informatique",
	marque: "DELL OptiPlex",
	productImage: "images/dell-optiplex.jpg",
	price: 450
},
{
	id:3,
	name:["imprimante"],
	categorie: "informatique",
	marque: "HP DeskJet 2820e",
	productImage: "images/hp-deskjet-2820e.jpg",
	price: 90
},
{
	id:4,
	name:["frigo","refrigérateur","congélateur"],
	categorie: "electromenage",
	marque: "frigo Samsung",
	productImage: "images/fr-samsung.jpg",
	price: 800
},
{
	id:5,
	name:["cuisinière"],
	categorie: "electromenage",
	marque: "cuisinière Bosch",
	productImage: "images/cuisiniere-bosch.jpg",
	price: 620
},
{
	id:6,
	name:["mixeur"],
	categorie: "electromenage",
	marque: "Mixeur Vista BL 1950",
	productImage: "images/mixeur-vista-bl-1950.jpg",
	price: 30
},
{
	id:7,
	name:["pc","ordinateur de bureau","computer"],
	categorie: "informatique",
	marque: "Dell Slim ECS1250",
	productImage: "images/dell-ecs1250-slim-desktop.jpg",
	price: 650
},
{
	id:8,
	name:["pc","ordinateur de bureau","computer"],
	categorie: "informatique",
	marque: "ASUS ExpertCenter",
	productImage: "images/asus-expertcenter.jpg",
	price: 760
},
{
	id:9,
	name:["pc","ordinateur de bureau","computer"],
	categorie: "informatique",
	marque: "Lenovo Legion",
	productImage: "images/lenovo-legion.jpg",
	price: 2500
},
{
	id:10,
	name:["pc","ordinateur portable","computer"],
	marque: "HP Envy x360",
	categorie: "informatique",
	productImage: "images/hp-envy-x360.jpg",
	price: 650
}

];

//liste des noms des produits pour le live-search
const listeProductName = [
{
	name:"pc",
	categorie: "informatique"
},
{
	name:"ordinateur portable",
	categorie: "informatique"
},
{
	name:"computer",
	categorie: "informatique"
},
{
	name:"ordinateur de bureau",
	categorie: "informatique"
},
{
	name:"imprimante",
	categorie: "informatique"
},
{
	name:"frigo",
	categorie: "electromenage"
},
{
	name:"refrigérateur",
	categorie: "electromenage"
},
{
	name:"congélateur",
	categorie: "electromenage"
},
{
	name:"cuisinière",
	categorie: "electromenage"
},
{
	name:"mixeur",
	categorie: "electromenage"
}	
];

const formInput = document.getElementById('formInput');
const productCategorieSelection = document.getElementById('productCategorie');
const productMaximumPriceSelection = document.getElementById('productMaximumPrice');
const productRenderDiv = document.getElementById('productRender');

// fonction et récupération de l'input pour le live-search
const inputSearch = document.getElementById('inputSearch');
const outputListProductName = document.getElementById('outputListProductName');

inputSearch.addEventListener('input', ()=> {
	outputListProductName.textContent = "";
	const inputText = inputSearch.value.trim().toLowerCase();
	if(inputText){
		const listeProductNameFiltered = listeProductName.filter(el=> el.name.toLowerCase().includes(inputText));
		if(listeProductNameFiltered.length > 0){
			listeProductNameFiltered.forEach(productName => {
				displayProductName(productName,inputText);
				outputListProductName.classList.remove('red'); //css color red
			})
		}else{
			outputListProductName.textContent = "Résultat introuvable";
			outputListProductName.classList.add('red');
		}
	}
});
function displayProductName(productName,inputText){
	const li = document.createElement('li');
	const index = productName.name.toLowerCase().indexOf(inputText);
	const avant = productName.name.slice(0,index);
	const match = productName.name.slice(index, index+inputText.length);
	const apres = productName.name.slice(index+inputText.length);
	li.innerHTML = `${avant}<span class="match">${match}</span>${apres}`; // css match bold
	outputListProductName.appendChild(li);
	li.addEventListener('mousedown', (e) => {
		e.preventDefault();
		inputSearch.value = productName.name; // dia tokony mivadika automatique ny catégorie, dia desable ny hafa
		outputListProductName.textContent = "";
		productCategorieSelection.value = productName.categorie;
	});
}

//récupération donnée input pour comparer avec produits

/*avant, le code était comme ceci :

formInput.addEventListener('submit',(e)=>{
	e.preventDefault();
	const productInput = inputSearch.value.toLowerCase().trim();
	if(productInput){
		outputListProductName.textContent = "";
		afficheProducts(productInput);
	}else{
		return;
	}
})
*/
formInput.addEventListener('submit',(e)=>{
	e.preventDefault();
	filtreProduits();
});

//fonction pour afficher les produits
function afficheProduits(liste){
	productRenderDiv.innerHTML = liste.map(produit => {
		return `<div class="carte">
		<h3>${produit.marque}</h3>
		<p>Price : ${produit.price}</p>
		<img src=${produit.productImage} alt="image"/>
		<button>Acheter</button>
		</div>
		`;
	}).join('');
}

//fonction pour gérer les filtres
function filtreProduits(){
	const inputText = inputSearch.value.toLowerCase().trim();
	const categorie = productCategorieSelection.value;
	const prixMax = productMaximumPriceSelection.value;
	
	const result = products.filter(produit => {
		//filtre input
		const matchInput = !inputText || produit.name.some(name => 
			name.toLowerCase().includes(inputText)
		);
		//filtre catégorie
		const matchCategorie = !categorie || produit.categorie === categorie;
		//filtre prix
		const matchPrix = !prixMax || produit.price <= prixMax;
		//ono combine tout
		return matchInput && matchCategorie && matchPrix;
	});
	afficheProduits(result);	
}

productCategorieSelection.addEventListener('change', filtreProduits);
productMaximumPriceSelection.addEventListener('change', filtreProduits);
