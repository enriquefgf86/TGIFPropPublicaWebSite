var houseMembers = [];
console.log(houseMembers);

fetch
(
  "https://api.propublica.org/congress/v1/113/house/members.json",
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
    response =>
    {
      return response.json()
      
    }

  )
  .then
  (
    usedFunctions =>
    {
    houseMembers = usedFunctions.results[0].members;
    document.getElementById("loader").style.display="none"
    init()
    
    }
  )
  .catch
  (
    error =>
    {
      console.log(error);
    }
  );

function init() {
  
  var arrayGeneral = houseMembers.filter(function (obj) { return obj; }).map(function (obj) { return obj.state; });
  var myNonRepeatedStatesArrayUnordered = arrayGeneral.filter(myNonRepeatedStates);
  var myStatesOrdered = statesOrdered(myNonRepeatedStatesArrayUnordered);
  myDropDown(myStatesOrdered)
  fileteredCheckbox();
  
}

/*variable que capta del file js todo el array de objetos neceasario correspondiente al House*/
/*function myLoadingButton()
{
  var loading=
  if(houseMembers!=[])
  {
       loading.classList.remove("loader")
  }
  else
  {
    loading.classList.add("loader")
  }
  return loading  
}*/
/*//////////////////////////////////////////////////////////////////////////////////////////////
Se crean  todas las variables las cuales harian referencia a los diferentes id con los que fueron 
identificados los checkboxes para posteriormente anadirsele un metodo llamdo add.eventLister()*/
var btnCheckBoxRepublicans = document.getElementById("republicans");
var btnCheckBoxIndependents = document.getElementById("independents");
var btnCheckBoxDemocrats = document.getElementById("democrats");
var filteredBystates = document.getElementById("select")

/*/////////////////////////////////////////////////////////////////////////////////////////////////////
vease que lo que se quiere es crear un filtro para el arraygeneral del house donde segun por partidos se 
ejecute el array correspondiente  con toodos sus objetos correspondientes a partidiarios comunes, esta variable 
posteriormente sera utilizada para la elaboracion del dropdown menu por estados*/


/*/////////////////////////////////////////////////////////////////////////////////////////////////////
se crean los eventos o metodos addEventListener para cada una de esas variables creadas que no haria mas 
"escuchar "cuando dichos elementos son usados(click, o hovered, o cualesquiera otra accion) 
para posteriormente realizar una fucnion

OJO, vease que tambien se adiciona una 4ta variable que tyendria que ver conb el id referente al selector del
dropdownlist asignandosele el nombre de filteredBystates */

btnCheckBoxRepublicans.addEventListener("click", function () { fileteredCheckbox((myForStates(houseMembers)), { partys: "party", states: "state", senioritys: "seniority", percentage: "votes_with_party_pct" }, "tabla-house") })

btnCheckBoxIndependents.addEventListener("click", function () { fileteredCheckbox((myForStates(houseMembers)), { partys: "party", states: "state", senioritys: "seniority", percentage: "votes_with_party_pct" }, "tabla-house") })

btnCheckBoxDemocrats.addEventListener("click", function () { fileteredCheckbox((myForStates(houseMembers)), { partys: "party", states: "state", senioritys: "seniority", percentage: "votes_with_party_pct" }, "tabla-house") })

filteredBystates.addEventListener("change", function () { fileteredCheckbox((myForStates(houseMembers)), { partys: "party", states: "state", senioritys: "seniority", percentage: "votes_with_party_pct" }, "tabla-house") })
/*vease que simplemente  a esa variable creada para obtner las propiedas del elemento id al cual ella
hace referencia se le inicializa el metodo, addEventListener, especificandosle que mediante una accion clic(las 3 primeras)
sobre ese elemento possedeor del id, dicha variable ejecutara una funcion, cuya funcion seria el fileteredCheckBox (mas adelante
desarrollada) la cual teniendo en cuenta estos eventListeners tendra como parametros 3
elementos:una funcion que se ejecuta sobre el array general houseMembers, llamada myForSates
los objetos a los cuales se llamara en la conformacion de la tabla a partir de dicho array, o sea{partys,states,....con
sus respectivos elementos u objetos""}, y el id""tabla house"el cual identifica a la tabla  que contienne
 la pagina home del house(congressmen)*/
/*OJO se toma la ejecuccion de esta funcion (myForStates(houseMembers), en vez del array en si pues a parte de la funcion
filteredCheckbox, la tabla se dinamiza con un dropdownlist por estados, lo cual de manera directa tambien modifica la tabla
y dicha funcion(myForStates) es la encargada de inicializar las condiciones que interactuando con le array (memeberHouse)
propician el resultado final*/


/*////////////////////////////////////////////////////////////////////////////////////////////////////
vease que este funcion simplemente se le llama filteredCheckbox pues filtrara o ejecutara la creacion de tablas a 
partir dle checkbox o los checkboxes que sean triggereados*/
// => === function()*/

/*1/*vease que en la item uno se llama a la funcion o se invocaa para que se ejecute, claramente el orden de su 
llamado no tiene importancia laguna simepre y cuando se encuetre en el mismo archivo, es muy importante su llamado
pues de otra forma no se ejecutaria*/

/*2,3*/ /*vease que en estos dos primeros items simplemente se declara la funcion llamada
 fileteredCheckbox, ademas de declararse una variable llamada filteredmemebrs, la cual le seria asignado el valor de
 filtro,vease tambien que como sample para la ejecucion de dicha aplicacion se tomara el array asignado a la variable 
 houseMembers,que mediante el metodo filter, evaluaria las posibles condiciones que filtrarian la tabla */

/*4*/ /*el metodo filtro se condicionaria de la siguiente manera:el primer elemento en el metodo seria una funccion
anonima o arrow=> funtion haciendo la sintaxis mas concisa y teniendo ya implicitavalores de retorno y demas , el para
metro member, no es mas que eso, un parametro utilizado en la funcion el cual seria comodin para hacer alusion
 a que elemento dentro del array se tomara en cuennta para comparar y de ahi filtrar la funcion, vease que los parentisis 
 que encierran cada sintaxis en este tipo de estilo reprsentarian un if, por lo que a manera de sintesis se pudies decir
 que teniendo en cuenta que el id republicans es chequeado y el objeto party corresponde con la R de ,republicanos, entonces
 se filtrara el array  houseMembers para republicans, o(||) si()el id democrats es chequeadoy el objeto party corresponde con la R de ,republicanos, entonces
 se filtrara el array  houseMembers para democrats,o(||) si()el id independentss es chequeadoy el objeto party corresponde con la R de ,republicanos, entonces
 se filtrara el array  houseMembers para independentss, esto seria el primer if condicionante de manera compuesta mediante
 funcion arrow y que filtraria el array siempre y cuado uno de los checkboxes o mas de uno fuese chequeado */

 /*5 como segunda condicionante se establece otra condicion que simplemente expone una alternativa de crear una tabla 
 a partir del  de la funcion (myforStates(houseMembers))la cual como se explico anteriormente se incluye en el esquema
 en vez del array en si pues dicha funcion seria la encargada de hacer dinamico e inclusivo el dropdownlist que 
 relacionaria los estados con los checkboxes,teneidno en cuenta los parametros para ella enunciados{}, 
 dandosele su ubicacion en el  lugar que se hace referencia mediante id 'tabla house'... si
  ninguno de esos checkxboxes fuese chequeado y por tanto, la variable filteredMembers  fuese cero por no tener array 
  filtrado

 /*6-En este caso si ninguna de las dosfunciones anteriores se cumple entonces se inicializaria la creacion de una tabla a 
 partir de la variable filteredMemebr*/


/*---------------------pasos explicados de la funcion---------------------------*/
/*1--------*/

/*2--------*/ function fileteredCheckbox() {
/*3-------*/ let filteredMembers = (myForStates(houseMembers)).filter(
/*4-------*/ member =>
    (document.getElementById("republicans").checked && member.party == "R") ||
    (document.getElementById("democrats").checked && member.party == "D") ||
    (document.getElementById("independents").checked && member.party == "I"));


   /*6--------*/ createTable(filteredMembers, { partymem: "party", statemem: "state", senioritymem: "seniority", votesmem: "votes_with_party_pct" }, "tabla-house");

  var notification = document.getElementById("alert")
  if (document.getElementById("republicans").checked && filteredMembers.length == 0) {
    notification.innerHTML = "No Republicans on the search,try with other party.Thanks!!"
    notification.classList.remove("alert", "alert-success")
    notification.classList.add("alert", "alert-danger")
  }
  else if (document.getElementById("democrats").checked && filteredMembers.length == 0) {
    notification.innerHTML = "No Democrats on the search,try with other party.Thanks!!"
    notification.classList.remove("alert", "alert-success")
    notification.classList.add("alert", "alert-danger")
  }
  else if (document.getElementById("independents").checked && filteredMembers.length == 0) {
    notification.innerHTML = "No Independents on the search,try with other party.Thanks!!"
    notification.classList.remove("alert", "alert-success")
    notification.classList.add("alert", "alert-danger")
  }
  else if (filteredMembers.length !== 0) {
    notification.innerHTML = " "
    notification.classList.remove("alert", "alert-success")
  }
  else if ((document.getElementById("republicans").checked) &&
    (document.getElementById("democrats").checked) &&
    (document.getElementById("independents").checked) == false) {
    notification.innerHTML = "Please Select Party and State"
    notification.classList.remove("alert", "alert-danger")
    notification.classList.add("alert", "alert-success")
    document.getElementById("mostrar").style.display = "none"
  }
  else {
    notification.innerHTML = "Please Select Party and State"
    notification.classList.remove("alert", "alert-danger")
    notification.classList.add("alert", "alert-success")
  }
}




/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*En este caso se inicializa la creacion de la tabla que teniendo en cuenta, tres parametros para que de manera general 
se resuma la creacion de la tabla teniendo en cuneta el array , los parametros para los cuales se evalua la construccion
de la tabla , y el id que lo caliza el lugra en donde dicha tabla se ria construida en el html.
Como dato interesante se puede ver  que la variable a la cual se asigna el elemnto constructor teneindo en cuenta el id
(bodytabla) isofacto despues de haber sido declarada se le asigan aun valor nulo, lo cual indica que   cada  dicha
variable cada vez qye  reciba una fucnion directa reiniciara su diseno completo almacenando nuevos valores simepre que la 
funcion y el filtro indiquen que conjunto de datos llamar */

function createTable(array, props, tableId) {
  var bodytabla = document.getElementById(tableId);
  bodytabla.innerHTML = "";
  for (var i = 0, len1 = array.length; i < len1; i++) {
    var row = document.createElement("tr");
    var celdaName = document.createElement("td");
    var referencia = document.createElement("a");
    var celdaParty = document.createElement("td");
    var celdaState = document.createElement("td");
    var celdaSeniority = document.createElement("td");
    var celdaVotes = document.createElement("td");

    referencia.setAttribute("href", array[i].url);
    referencia.setAttribute("target", array[i].url);
    referencia.innerHTML = array[i].first_name + " " + (array[i].middle_name || "") + " " + array[i].last_name;

    celdaName.append(referencia);
    celdaParty.innerHTML = array[i][props.partymem];
    celdaState.innerHTML = array[i][props.statemem];
    celdaSeniority.innerHTML = array[i][props.senioritymem];
    celdaVotes.innerHTML = array[i][props.votesmem];

    bodytabla.append(row);
    row.append(celdaName, celdaParty, celdaState, celdaSeniority, celdaVotes);
  }
}

/*--------------creacion de las condiciones para el DropDown List-------------------------------------*/
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*vease que primero se desarrolla una funcion que determina que valores de una array se repiten , mediante 
tres parametros , valor, index, y selfcompared, donde la logica de la funcion explica que se devolveria el valor al self 
,si el primer valor no repetido que se almacene en value(culaesquiera el valor que este tenga en el array)= al index en si
*/
function myNonRepeatedStates(value, index, self) {
  return self.indexOf(value) === index;
}
/*una vez declarada la funcion que determina las elementos del array no repetidos se aplica dicha funcion 
a culaesquiersa el array que se quisiese analizar de la siguiente manera, obtniedose un array sin elementos repetidos
aunque no ordenado de ahi que se le asigne a la variable el nombre de myNonRepeatedStatesArrayUnordered */



/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/* en el siguiente paso entonces se ordenaria en este caso de manera alfabetica  la lista de elementos que dicho array 
 asignado a la variable myNonRepeatedStatesArrayUnordered posee creandose una funcion que ordene alfabeticamente dicho
 array   filtrado para los elementods no repetidos, tilizando el metodo sort sobre el mismo array , retornando su valor
 en si  de manera ordenada*/

function statesOrdered(array) {
  array.sort();
  return array;
}
//console.log(statesOrdered(myNonRepeatedStatesArrayUnordered));
/*Vease que despues simplemente se le asigna una variable  para inicializar dicha funcion esta vez sobre el array en 
si que quermeos analizar u ordenar( en este caso seria el asigando a la variable myNonRepeatedStatesArrayUnordered ) */

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
------------------------creacion de dropdown list a partir de los procesos anteriores--------------------------*/
/*
1---vease que lo primero quue se hace es inicializar una variable a la cual se le asiganara toda accion o cambio referente
al item contenedor del id"select en html'dicha variale seria el puente conector entre lo que que quiere hacer esta funcion
y su ejecucion final en el html y por consiguiente resultaod de salida al usuario

2---en este segundo paso se inicializa la variable contenerdora del array ordenado y sin repetir a partir del cual se 
quiere construir el dropdpown list

3---Se inicia un bucle que iteraria sobre el anterior array, para de esta manera analizar cada elemento del mismo, 
inicialzando varias acciones para cda una de los elemntos del array en si.
4---se inicializa el metodo createElement, inicializando una condicion llamda "OPTION"y dicha condicion trasnformara
el valor de cada elemto en el array en una opcion como tal.

5---en este Paso simplemente se inicializa un node de texto sobre el array asignado a la variable myStatesOrdered
en la posicion que para ese momento este iterando el bucle[i], esto convertiria isofacto en texto dicho elemento.

6---vease que en este paso 6, despues de hebr creado un elemto "OPTION"asignado a la variable option la misma se le addiere
(append )la variable a la que anteriormente se le asigno el nodo de texto creado para cada item en el que se encuentre 
iterando el loop(text), esto garantiza convertir  cada uno de los lelemtos convertidos a texto en una opcion elegible 
o marcable en el droopdownlist.

7---vease que en este caso tambien se le adiere  a la variable option mediante el metodo set attribute una condicion a
ese valor del array por el cual esta iterando el loop, convirtiendo de manera oficial dicho elemento del array en un
item que representa un valor elegible, comparable y demas.

8---Aunque este ultinmo item supongo no seria necesario en nuestro ejemplo, vease que simplemente se llama a la variable 
select,la cual en principio contiene el getElementByID que hsace referencia al dropdonwlist, y mediante metodo InsertBefore
como bien explica , hace esxtensible dicho array permitioendo que se incereten neuvos valores en dicho array segun las 
propiedades o funciones o acciones que desarollan las variables option, y select en si mismo, solo en caso de que se quisiese
anadir otro elemento a ese droppdown list


*/function myDropDown(array) {
  /*1----------*/ var select = document.getElementById("select"),
/*2----------*/ array;

/*3----------*/ for (var i = 0; i < array.length; i++) {
/*4----------*/ var option = document.createElement("OPTION"),
/*5----------*/ txt = document.createTextNode(array[i]);
/*6----------*/ option.appendChild(txt);
/*7----------*/ option.setAttribute("value", array[i]);
/*8----------*/ select.insertBefore(option, select.lastChild);
  }

}

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//----------------A continuacion desarrollo de la  funcion que conecta el dropdown list con la tabla---------------
 Vease que dicha funcion seria la encargada de conectar cualesquiera los parametros  con la tabla , pues sul resultado
 seria el que se tomaria en cuenta para que a travez de los checkboxes se creeen las consequentas tablas  y demas
 
 1---Se inicializa una variable llamada valorDropDown, la cual simplemente se le extrae cualesquiera el valor del 
  elemnto poseedor del id"select' para una condicion dada de ahi su extension .value .Simplemente extareria el valor del
  dropDownList en cualesquiera la posicion que se encuentre paa un momento dado.

 2---Se crea un variable que contendria un array vacio en donde se alojarian todos los resultados para los cuales se evaluan
 dichas condicionantes.
 
 3---se inicialiaza un bucle el cual evaluaria el array en cuestion  siendo el contenedor de varias condiciones 

 4 y 5---la primera condicionante es un if que determian que si el array en cuestion es evaluado en su posicion para el ob
 jeto state(se seleciona state pues por este concepto es que el dropdownlist se evalua de ahi que especificamente se 
  indique dicho objeto) es igual al valor de la variable dropdown obtenida mediante metodo value o("||")dicha variable 
  dropdwon coincide con el valor"default""(valor del "value" en el item <option> del html contenido en el select que 
  inicializa el drodown), entonces ese valor del array pr el cual el llop en ese momento pasaria seria adicionado al 
  array vacio asignado a la variable var arrayofstates mediante metodo push

 6---vease que aqui simplemente se retorna el valor final al array contenedor de los nuevos valores :arrayofstates 

 7---y por ultimo simplemente se invoca dicha funcion sobre el array en si para el cual se quiera analizar , en este caso 
 houseMembers....OJO...vease que el llamado a esta funcion con el aray en cuestion es el que se utiliza para el desarrollo de
 los filtros a checkboxes y demas"(myForStates(houseMembers))"
 */


function myForStates(array/*,obj*/) {
 /*1*/ var valorDropdown = document.getElementById("select").value;
 /*2*/ var arrayofstates = [];

 /*3*/ for (var i = 0; i < array.length; i++) {
 /*4*/   if (array[i].state/*[obj]*/ == valorDropdown || valorDropdown == "Default") {
 /*5*/     arrayofstates.push(array[i]);
    }
  }
/*6*/  return arrayofstates;
}
console.log(myForStates(houseMembers/*,"state"*/));

/*7*/myForStates(houseMembers)



