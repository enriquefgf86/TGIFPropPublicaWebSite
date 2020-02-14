var senateMembers = [];

fetch
  (
    "https://api.propublica.org/congress/v1/113/senate/members.json",
    {
      method: "GET",
      headers:
      {
        "X-API-Key": "xdtXirNJP8AC99S3aVVLuH3PBKeYvXqudCe5JGqD"
      }
    }
  )
  .then
  (
    function (response) {
      return response.json()
    }
  )
  .then
  (
    function (senate) {
      senateMembers = senate.results[0].members;
      document.getElementById("loading").style.display = "none"
      init()
    }
  )
  .catch
  (
    function (error) {
      console.log(error)
    }
  )

function init() {
  var arrayNames = senateMembers.filter(function (obj) { return obj; }).map(function (obj) { return obj.first_name; });
  var arrayVotes = senateMembers.filter(function (obj) { return obj; }).map(function (obj) { return obj.votes_with_party_pct; });
  var arrayNumber = arrayNames.length;

  var democratarray = senateMembers.filter(function (obj) { return obj.party === "D"; }).map(function (obj) { return obj.first_name; });
  var democratVotes = senateMembers.filter(function (obj) { return obj.party === "D"; }).map(function (obj) { return obj.votes_with_party_pct; });
  var democratsNumber = democratarray.length;

  var republicanarray = senateMembers.filter(function (obj) { return obj.party === "R"; }).map(function (obj) { return obj.first_name; });
  var republicanVotes = senateMembers.filter(function (obj) { return obj.party === "R"; }).map(function (obj) { return obj.votes_with_party_pct; });
  var republicanNumber = republicanarray.length;

  var independentarray = senateMembers.filter(function (obj) { return obj.party === "I"; }).map(function (obj) { return obj.first_name; });
  var independentVotes = senateMembers.filter(function (obj) { return obj.party === "I"; }).map(function (obj) { return obj.votes_with_party_pct; });
  var independentNumber = independentarray.length;

  var arrayDem = minyArray(democratsNumber, average(democratVotes))
  var arrayRep = (minyArray(republicanNumber, average(republicanVotes)))
  var arrayInd = (minyArray(independentNumber, average(independentVotes)));
  var arrayTotales = tablaGlanceSumaTotales(mytotalesNum(arrayNumber), mytotalesNum(average(arrayVotes)));
  var arrayMatrixTablaGlance = matrixTablaGlance(arrayRep, arrayDem, arrayInd, arrayTotales);

  let resultAscendingAttendance = myNewArrayAscending(senateMembers, "missed_votes_pct");
  var arrayResumedAttendanceLeast = addingRepeatedAfter10pct(resultAscendingAttendance, "missed_votes_pct");

  var resultDescendingAttendance = myNewArrayDescending(senateMembers, "missed_votes_pct");
  var arrayResumedAttendanceMost = addingRepeatedAfter10pct(resultDescendingAttendance, "missed_votes_pct");

  let resultAscendingLoyalty = myNewArrayAscending(senateMembers, "votes_with_party_pct")
  var arrayResumedLoyaltyLeast = addingRepeatedAfter10pct(resultAscendingLoyalty, "votes_with_party_pct")

  var resultDescendingLoyalty = myNewArrayDescending(senateMembers, "votes_with_party_pct")
  var arrayResumedLoyaltyMost = addingRepeatedAfter10pct(resultDescendingLoyalty, "votes_with_party_pct")

  var btnCheckBoxRepublicans = document.getElementById("republicansSenate")
  var btnCheckBoxIndependents = document.getElementById("independentsSenate")
  var btnCheckBoxDemocrats = document.getElementById("democratsSenate")
  var filteredBystates = document.getElementById("selectSenate")

  var arrayGeneral = senateMembers.filter(function (obj) { return obj }).map(function (obj) { return obj.state });
  var myNonRepeatedStatesArrayUnordered = arrayGeneral.filter(myNonRepeatedStates);
  var myStatesOrdered = statesOrdered(myNonRepeatedStatesArrayUnordered);

  if (document.getElementById("table-senate-glance")) {
    tableGlanceSenate(arrayMatrixTablaGlance, "#table-senate-glance>tr")

    createTable(arrayResumedLoyaltyLeast, { total: "total_votes", percentage: "votes_with_party_pct" }, "least-loyal-senate-table")

    createTable(arrayResumedLoyaltyMost, { total: "total_votes", percentage: "votes_with_party_pct" }, "most-loyal-senate-table")
  }

  else if (document.getElementById("senate-attendance-atglance-table")) {
    tableGlanceSenate(arrayMatrixTablaGlance, '#senate-attendance-atglance-table>tr');

    createTable(arrayResumedAttendanceLeast, { total: "missed_votes", percentage: "missed_votes_pct" }, "least-attendance-senate-table");

    createTable(arrayResumedAttendanceMost, { total: "missed_votes", percentage: "missed_votes_pct" }, "most-attendance-senate-table");
  }

  fileteredCheckbox()

  btnCheckBoxRepublicans.addEventListener("click", function () { fileteredCheckbox(myForStates(senateMembers), { partys: "party", states: "state", senioritys: "seniority", percentage: "votes_with_party_pct" }, "tabla-senado") })
  btnCheckBoxIndependents.addEventListener("click", function () { fileteredCheckbox(myForStates(senateMembers), { partys: "party", states: "state", senioritys: "seniority", percentage: "votes_with_party_pct" }, "tabla-senado") })
  btnCheckBoxDemocrats.addEventListener("click", function () { fileteredCheckbox(myForStates(senateMembers), { partys: "party", states: "state", senioritys: "seniority", percentage: "votes_with_party_pct" }, "tabla-senado") })
  filteredBystates.addEventListener("change", function () { fileteredCheckbox(myForStates(senateMembers), { partys: "party", states: "state", senioritys: "seniority", percentage: "votes_with_party_pct" }, "tabla-senado") })

  myDropDown(myStatesOrdered)

  myForStates(senateMembers)
}
/*////////////////////FUNCIONES DE SENATE ATTENDANCE Y SENATE LOYALTY////////////////////////////////////////////////*/
function average(numbers) {
  var sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }
  if (sum == 0) {
    return 0;
  } else {
    return (sum / numbers.length).toFixed(2);
  }
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function minyArray(arraynumb, arrayAverage) {
  var arrayContainer = []
  arrayContainer.push(arraynumb, arrayAverage)
  return arrayContainer
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function mytotalesNum(number) {
  var total = number;
  return total;
}
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function tablaGlanceSumaTotales(arrayNumeros, arrayVotos) {
  var arrayTotales = [];
  arrayTotales.push(arrayNumeros, arrayVotos);
  return arrayTotales;
}
function matrixTablaGlance(arrayx, arrayy, arrayz, arraytotal) {
  var tablaResumen = [];
  tablaResumen.push(arrayx, arrayy, arrayz, arraytotal);
  return tablaResumen;
}
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function tableGlanceSenate(matrix, tableid) {
  var glanceTr = document.querySelectorAll(tableid);
  for (var i = 0, len4 = matrix.length; i < len4; i++) {
    for (var j = 0, len5 = matrix[i].length; j < len5; j++) {
      var celda = document.createElement("td");
      celda.innerHTML = matrix[i][j];

      glanceTr[i].appendChild(celda);
    }
  }
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function myNewArrayAscending(array, field) {
  return array.sort(function Objs(obj1, obj2) { return obj1[field] - obj2[field]; });
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function addingRepeatedAfter10pct(array, obj) {
  var resumedArray = [];
  for (var i = 0; i < array.length; i++) {
    if (i < 0.1 * array.length) {
      resumedArray.push(array[i]);
    }
    else if (resumedArray[resumedArray.length - 1][obj] == array[i][obj]) {
      resumedArray.push(array[i]);
    }
    else {
      break;
    }
  }
  return resumedArray;
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function myNewArrayDescending(arrayx, field) {
  return arrayx.sort(function Objs(obj1, obj2) { return obj2[field] - obj1[field]; });
}
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function createTable(arraySenateAttendanceMost, props, tableId) {
  var bodytabla = document.getElementById(tableId);
  for (var i = 0, len1 = arraySenateAttendanceMost.length; i < len1; i++) {
    var row = document.createElement("tr");
    var celda1 = document.createElement("td");
    var referencia = document.createElement("a");
    var celda2 = document.createElement("td");
    var celda3 = document.createElement("td");

    referencia.setAttribute("href", arraySenateAttendanceMost[i].url);
    referencia.setAttribute("target", arraySenateAttendanceMost[i].url);
    referencia.innerHTML =
      arraySenateAttendanceMost[i].first_name +
      " " +
      (arraySenateAttendanceMost[i].middle_name || "") +
      " " +
      arraySenateAttendanceMost[i].last_name;

    celda1.append(referencia);
    celda2.innerHTML = arraySenateAttendanceMost[i][props.total];
    celda3.innerHTML = arraySenateAttendanceMost[i][props.percentage];

    bodytabla.append(row);
    row.append(celda1, celda2, celda3);
  }
}
/*/////////////////////////////////////////////FUNCIONES DEL MAIN SENATE////////////////////////////////////// */
function fileteredCheckbox() {
  let filteredMembers = myForStates(senateMembers).filter(
    member =>
      (document.getElementById("republicansSenate").checked && member.party == "R") ||
      (document.getElementById("democratsSenate").checked && member.party == "D") ||
      (document.getElementById("independentsSenate").checked && member.party == "I"));

  createTableMain(filteredMembers, { partymem: "party", statemem: "state", senioritymem: "seniority", votesmem: "votes_with_party_pct" }, "tabla-senado");

  var notification1 = document.getElementById("alert")

  if (document.getElementById("republicansSenate").checked && filteredMembers.length == 0) {
    notification1.innerHTML = "No Republicans on the search,try with other party.Thanks!!"
    notification1.classList.remove("alert", "alert-success")
    notification1.classList.add("alert", "alert-danger")
  }
  else if (document.getElementById("democratsSenate").checked && filteredMembers.length == 0) {
    notification1.innerHTML = "No Democrats on the search,try with other party.Thanks!!"
    notification1.classList.remove("alert", "alert-success")
    notification1.classList.add("alert", "alert-danger")
  }
  else if (document.getElementById("independentsSenate").checked && filteredMembers.length == 0) {
    notification1.innerHTML = "No Independents on the search,try with other party.Thanks!!"
    notification1.classList.remove("alert", "alert-success")
    notification1.classList.add("alert", "alert-danger")
  }
  else if (filteredMembers.length !== 0) {
    notification1.innerHTML = " "
    notification1.classList.remove("alert", "alert-success")
  }
  else if ((document.getElementById("republicansSenate").checked) &&
    (document.getElementById("democratsSenate").checked) &&
    (document.getElementById("independentsSenate").checked) == false) {

    notification1.innerHTML = "Please Select Party and State"
    notification1.classList.remove("alert", "alert-danger")
    notification1.classList.add("alert", "alert-success")
    document.getElementById("mostrar").style.display = "none"
  }
  else {
    notification1.innerHTML = "Please Select Party and State"
    notification1.classList.remove("alert", "alert-danger")
    notification1.classList.add("alert", "alert-success")

  }

}
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function createTableMain(arraySenate, props, tableId) {
  var bodytablaSenate = document.getElementById(tableId)
  bodytablaSenate.innerHTML = " "
  for (var i = 0, len = arraySenate.length; i < len; i++) {
    var rowSenate = document.createElement("tr");
    var celdaSenadoName = document.createElement("td");
    var referencia = document.createElement("a");
    var celdaSenadoParty = document.createElement("td")
    var celdaSenadoState = document.createElement("td");
    var celdaSenadoYears = document.createElement("td");
    var celdaSenadoVotes = document.createElement("td");

    referencia.setAttribute("href", arraySenate[i].url)
    referencia.setAttribute("target", arraySenate[i].url)
    referencia.innerHTML = arraySenate[i].first_name + " " + (arraySenate[i].middle_name || "") + " " + arraySenate[i].last_name;

    celdaSenadoName.append(referencia);
    celdaSenadoParty.innerHTML = arraySenate[i][props.partymem]
    celdaSenadoState.innerHTML = arraySenate[i][props.statemem]
    celdaSenadoYears.innerHTML = arraySenate[i][props.senioritymem]
    celdaSenadoVotes.innerHTML = arraySenate[i][props.votesmem]


    bodytablaSenate.append(rowSenate);
    rowSenate.append(celdaSenadoName, celdaSenadoParty, celdaSenadoState, celdaSenadoYears, celdaSenadoVotes)
  }
}
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function myNonRepeatedStates(value, index, self) {
  return self.indexOf(value) === index;
}
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function statesOrdered(array) {
  array.sort();
  return array;
}
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function myDropDown(array) {
  var select = document.getElementById("selectSenate"),
    array;
  for (var i = 0; i < array.length; i++) {
    var option = document.createElement("OPTION"),
      txt = document.createTextNode(array[i]);
    option.appendChild(txt);
    option.setAttribute("value", array[i]);
    select.insertBefore(option, select.lastChild);
  }
}
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function myForStates(array/*,obj*/) {
  var valorDropdown = document.getElementById("selectSenate").value;
  var arrayofstates = [];

  for (var i = 0; i < array.length; i++) {
    if (array[i].state/*[obj]*/ == valorDropdown || valorDropdown == "Default") {
      arrayofstates.push(array[i]);
    }
  }
  return arrayofstates;
}
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

