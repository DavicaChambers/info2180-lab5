window.addEventListener("load", () => {
	const countryLookupButton = document.querySelector("#country_lookup");
	
	const cityLookupButton = document.querySelector("#cities_lookup");
	const resDiv = document.querySelector("#result");

	const countryHeading = {
		tableHeading : ["Name", "Continent", "Independence", "Head of State"],
		databaseName : ["name", "continent", "independence_year", "head_of_state"]
	};

	const cityHeading  = {
		tableHeading : ["Name", "District", "Population"],
		databaseName : ["name", "district", "population"]
	}
	
	//ajaxCall("", "countries");
	
	countryLookupButton.addEventListener("click", ajaxCall);
	cityLookupButton.addEventListener("click", ajaxCall);




function ajaxCall(e){
	var context="";
	var context="";
	var lookupResult = document.querySelector("#country");
	e.preventDefault();
	if(e.target.id=="country_lookup"){
		context="countries";
	}else if (e.target.id=="cities_lookup"){
		context="cities";
	}

	fetch(`world.php?countryName=${lookupResult.value}&context=${context}`)	
		.then(response => response.json())
		.then(data => {
			if(data.length > 0){
				switch(context){
					case "countries":
						showResults(data,countryHeading);
						break;
					case "cities": 
						showResults(data,cityHeading);
						break;
					default: 
						notFound();
				}
			}else{
				notFound();	
			}
		})
		.catch(err => console.log(err));
}


function showResults(data, tableHeading){

	const resTable = createEmptyTable(tableHeading.tableHeading); 	
	const resTableBody = document.createElement("tbody");

	for(let j = 0; j < data.length; j++){
		currentRow = newRow(tableHeading.databaseName.map(x => data[j][x]));
		resTableBody.appendChild(currentRow);		
	}

	resTable.appendChild(resTableBody);
	resDiv.innerHTML = "";
	resDiv.appendChild(resTable);
}

function newRow(rowValues){
	const row = document.createElement("tr");
	
	for(let j = 0; j < rowValues.length; j++){
		const columnVal = document.createElement("td");
		columnVal.appendChild(document.createTextNode(rowValues[j]));
		row.appendChild(columnVal);
	}

	
	return row
}


function createEmptyTable(headerValues){
	const newTable = document.createElement("table");
	const header = document.createElement("thead");

	for(let j = 0; j < headerValues.length; j++){
		headerField = document.createElement("th");
		headerField.appendChild(document.createTextNode(headerValues[j]));
		header.appendChild(headerField);
	}

	newTable.appendChild(header);

	
	return newTable;
}

function notFound(){
	resDiv.innerHTML = "No Results";
}
});