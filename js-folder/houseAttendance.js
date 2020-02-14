
var houseMembers = [];
console.log(houseMembers);
/*vease que lo primero que se hace es declararse un variable que contendar un array vacio donde se 
 supone se almacenara el array de objetos que se obtendra mediante request de api a traves del 
  metodo fetch */
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
  /*vease que lo primero que se establece es el metodo fetch el cual simplemente tienen como parametros
  el url al cual se le hace el request, se especifica el tipo de metodo que es ('get'), y en el caso muy
  particular de esta solicitud se establecen headers los cuales vendrian siendo como especie de elementos 
  de seguridad propis del emisor del API necesarios en este caso para que el proceso tenga exito */
  .then
  (
    response => {
      return response.json()
    }
  )
  /*despues se establece la primera promesa o promise , donde simplemente se desarrolla una funcion que 
   especifica una vez el url sea identficado retornar del msmo como respuesta el array de archivos , en
    este caso archivos json */
  .then
  (
    house => {
      houseMembers = house.results[0].members;
      document.getElementById("loading").style.display = "none"
      init()
    }
  )
  /*despues de la primera promise se establece la segunda promise la cual desarrolla una funcion arrow 
   que expone y asigna a la variable houseMembers  el camino del cual debe partir para trabajar sobre el 
    nuevo array de objetos json, especificandose que el objeto(en este caso house)marca la ruta empezando
    en results en su posicion 0, y de ahi members.vease que las funciones arrow a diferencia de las con
    vencionales tienen mayor alcance de ahi que se empiecen a implementar , no obstante si se traspola lo
    lo anterior a una funcion normal quedaria mas o menos asi 'function(house){houseMemebers=house.results[o]
      .members.....}'
      Vease que dentro de la funcion tambien se incluye un elemento getElement, el cual hace alusion a un 
      loader que inicializa en un parte del codigo  de manera visible , pero que una vez requerido el api
       con exito dejara de serlo de ahi que se le apendizen en esta parte de la promesa dicho elemento
       con la caracteristica de css  style.display==none
       Tambien se muestra un elemento que se le da un nombre init()presumiendose que es una funcion....
       esta fucnion seria el elemento abarcador de todas las variables  necesarias al inicio del proceso una 
       vez alcanzado con exito el api request y en el simplemente se acumulan todas las variables que 
        guardan relacion directa con el api requerido*/
  .catch
  (
    error => {
      console.log(error);
    }
  );
/*vease que despues de inicializada las dos promesas y el fetch quedaria disenar un medio de confirmacion
que determine si el proceso se dio con exito o no , para eso se desarrola el metodo catch error, en el
cual simplemente se determina que si una vez pasado por los procesos anteriores la operacion no es 
exitosa se emitira un console log que mostrara error determinandose las causas */

/*////////////////////////////////////////////////////////////////////////////////////////////// 
en esta segunda parte se estable la funcion que contendra todas la variables y procesos que en si son 
 necesarios para desarrollar el proceso , y como se explico anteriormente se le designo por nombre
 init()*/

function init() {
  var arrayNames = houseMembers.filter(function (obj) { return obj }).map(function (obj) { return obj.first_name });
  var arrayVotes = houseMembers.filter(function (obj) { return obj }).map(function (obj) { return obj.votes_with_party_pct });
  var arrayNumber = arrayNames.length

  var democratarray = houseMembers.filter(function (obj) { return obj.party === "D" }).map(function (obj) { return obj.first_name });
  var democratVotes = houseMembers.filter(function (obj) { return obj.party === "D" }).map(function (obj) { return obj.votes_with_party_pct });
  var democratsNumber = democratarray.length;

  var republicanarray = houseMembers.filter(function (obj) { return obj.party === "R" }).map(function (obj) { return obj.first_name });
  var republicanVotes = houseMembers.filter(function (obj) { return obj.party === "R" }).map(function (obj) { return obj.votes_with_party_pct });
  var republicanNumber = republicanarray.length

  var independentarray = houseMembers.filter(function (obj) { return obj.party === "I" }).map(function (obj) { return obj.first_name });
  var independentVotes = houseMembers.filter(function (obj) { return obj.party === "I" }).map(function (obj) { return obj.votes_with_party_pct });
  var independentNumber = independentarray.length
  /*vease que el primer grupo de variables dentro del init corresponden a elementos que filtrararn el array
   alojado en la variable houseMemebrs, usando el metodo map, para retornar objetos especificos dentro del array
   con estos retornos se determinarian variables que posteriormente seran necesarias para determinar parametros 
    de funciones u otros arrays o variables necesarias  */


  var arrayDem = minyArray(democratsNumber, average(democratVotes))
  var arrayRep = (minyArray(republicanNumber, average(republicanVotes)))
  var arrayInd = (minyArray(independentNumber, average(independentVotes)));
  /*este grupo de variables se les asigna una funcion llamada minyArray, la cual contiene dos paranmetros 
  los cuales serian un a variable previamente determinada , y una funcion llamada average , que determina 
  el promedio sobre otra variable ya previamente determinada, dando cada una de lllas un sort de mini arrays
   compuestos por dos numeros */
  var arrayTotales = tablaGlanceSumaTotales(mytotalesNum(arrayNumber), mytotalesNum(average(arrayVotes)))
  /*esta variable simplemente se le asigna el resultado de una funcion llamada  tablaGlanceSumaTotales
   la cual tiene como parametros una funcion que retorna el total de elementos  y otra funcion
   que resume el total de averages, y como resumen se podria decir que esta variable serian los totales
    en cuanto a numeros y promedios de las tres variables inicializadas anteriormente */
  var arrayMatrixTablaGlance = matrixTablaGlance(arrayRep, arrayDem, arrayInd, arrayTotales)
  /*ya simplemente quedaria conformar esa tabla resumen de mini arrays en cuanto a numeros y
  promedios , vease que esta variable es la encargada de dicho proceso , asignandosele una funcion que como
  parametros tine los elementos antes explicados */

  let resultAscending = myNewArrayAscending(houseMembers, "missed_votes_pct")
  var resumedHouseLeast = addingRepeatedAfter10pct(resultAscending, "missed_votes_pct")

  var resultDescending = myNewArrayDescending(houseMembers, "missed_votes_pct")
  var resumedHouseMost = addingRepeatedAfter10pct(resultDescending, "missed_votes_pct")

  let resultAscending1 = myNewArrayAscending(houseMembers, "votes_with_party_pct")
  var resumedHouseLeast1 = addingRepeatedAfter10pct(resultAscending1, "votes_with_party_pct")

  var resultDescending1 = myNewArrayDescending(houseMembers, "votes_with_party_pct")
  var resumedHouseMost1 = addingRepeatedAfter10pct(resultDescending1, "votes_with_party_pct")
  /*este grupo de variables devuelve arrays ordenados de manera ascendente , o descendente, siendo
   la funciones myNewArrayAscending/Descending y  addingRepeatedAfter10pct, las cuales tienen
    como parametro eL array en si sobre el cual se realizara  el mapeo, y el objeto dentro del esos arrays
     para los cuals se evalua la funcion */

  var btnCheckBoxRepublicans = document.getElementById("republicans");
  var btnCheckBoxIndependents = document.getElementById("independents");
  var btnCheckBoxDemocrats = document.getElementById("democrats");
  var filteredBystates = document.getElementById("select")
  /*En este caso se declaran variables que hacen referencia a un id especifico  en los html, las cuales
   seran utilizadas posteriormente como elementos de una funcion en la que se ncluyen eventListeners
   para triggerear una accion*/

  var arrayGeneral = houseMembers.filter(function (obj) { return obj; }).map(function (obj) { return obj.state; });
  /*se declara una variable que de manera general filtara el array house members, retornando mediante metodo map el objeto
  state, para cada uno de los elementos del array , lo cual sera utilizado posteriormente para el dropdownfilter selector
    */

  var myNonRepeatedStatesArrayUnordered = arrayGeneral.filter(myNonRepeatedStates);
  /*esta variable simplemente se le asigna el resultado de una funcion que filtra el array general, previamente filtrado
  retornando el objeto state sobre una variable mas adelante determinada llamada myNonRepeatedStates */

  var myStatesOrdered = statesOrdered(myNonRepeatedStatesArrayUnordered);
  /*esta variable  depende de la anterior, y simplemente se le es asignada el valor que retorne la variable anterior
   la cual es asignada como parametro a la funcion  statesOrdered*/

  /*///////////////////////////////////////////FUNCIONES A UTILIZAR///////////////////////////////////
  En esta seccion de la funcion init se inicializan todas las funciones ademas de condicionantes que determinarian
  que funcion ejecutar ademas de que html file es el que se ejecuta en dependencia de los id expuestos, y la interaccion
   del usuario con la app */
  if (document.getElementById("house-attendance-atGlance-table")) {
    tableGlanceHouse(arrayMatrixTablaGlance, "#house-attendance-atGlance-table>tr")

    createTable(resumedHouseLeast, { total: "missed_votes", percentage: "missed_votes_pct" }, "house-attendance-least-table")

    createTable(resumedHouseMost, { total: "missed_votes", percentage: "missed_votes_pct" }, "house-attendance-most-table")
  }
  /*vease que el primer if determinaria que en dependencia del id con el cual el usuario interactua determinaria 
  la app que se dispone en pantalla , ademas de crearse tablas de resumen , y tablas de engage most y least*/
  else if (document.getElementById("bodyTabHouseGlance")) {
    tableGlanceHouse(arrayMatrixTablaGlance, "#bodyTabHouseGlance>tr")

    createTable(resumedHouseLeast1, { total: "total_votes", percentage: "votes_with_party_pct" }, "leastLoyalty")

    createTable(resumedHouseMost1, { total: "total_votes", percentage: "votes_with_party_pct" }, "mostloyalty")
  }
  /*lo mismo pasaria con el segundo condicionante if else comoalternativa al no cumplimiento d ela primera condicion, 
   aunque en este caso haria referencia a las creaciones de tablas y demas referentes al loyalty most y least del
    house ademas de la creacion de tabla glance para ese concepto */

  else if (document.getElementById("tabla-house")) {
    fileteredCheckbox();

    btnCheckBoxRepublicans.addEventListener("click", function () { fileteredCheckbox((myForStates(houseMembers)), { partys: "party", states: "state", senioritys: "seniority", percentage: "votes_with_party_pct" }, "tabla-house") })
    btnCheckBoxIndependents.addEventListener("click", function () { fileteredCheckbox((myForStates(houseMembers)), { partys: "party", states: "state", senioritys: "seniority", percentage: "votes_with_party_pct" }, "tabla-house") })
    btnCheckBoxDemocrats.addEventListener("click", function () { fileteredCheckbox((myForStates(houseMembers)), { partys: "party", states: "state", senioritys: "seniority", percentage: "votes_with_party_pct" }, "tabla-house") })
    filteredBystates.addEventListener("change", function () { fileteredCheckbox((myForStates(houseMembers)), { partys: "party", states: "state", senioritys: "seniority", percentage: "votes_with_party_pct" }, "tabla-house") })
    /*en esta tercera condicionante  y bajo el supuesto de que el usuario interactue con la interfaz que posse el id, a la cual se hace alusion
    se inicializaria la tercera opcion en donde como primer elemento se muestra una funcion llamada  fileteredCheckbox() ade mas
    de addEventListeners sobre variables previamente inicializadas, las cuales como bien expone cada funcion se activarian
     mediante click(3 primeras) y change(en el caso de la ultima para el dropdown selector) interactuando en conjunto
      para dar un resultado combinado entre filtros de checkboxes y dropdownmenu para mostrar un resultado final  sobre 
       las tablas estadisticas que funciones ejecutaria */

    myDropDown(myStatesOrdered)
    myForStates(houseMembers)
  }
  /*estas dos funciones se inicializan pues se utilizan ppor variables previamente para el desarrollo y retorno de 
   resultados que contribuyen a informaciones estadisticas de las tablas a mostrar */

  else {
    dots = document.getElementById("dots");
    moreText = document.getElementById("more");
    btnText = document.getElementById("myBtn");

    myFunction()
  }/*por ultimo si ninguna de las condicionantes anteriores se cumple entonces se desarrolla la tercera y ultima condicionante
  la cual daria escenario el desarro de la funcion myFunction inicializada para la ecuacion de read more read less */
}/*aqui termina la seccion de la funcion init (contenedora de las funcines y variables fundamentales en la aplicacion)*/


/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////SECCION DE FUNCIONES EN GENERAL//////////////////////////////////////////// */
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function average(numbers) {
  var sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];

  }
  if (sum == 0) {
    return 0
  }
  else {
    return (sum / numbers.length).toFixed(2);
  }
}/*A continuacion se inicializa la funcion average la cual determina el promedio de un array teniendo en cuenta
 el numero de elementos que posee el mismo , y una vez alcanzado ese total se dividiria entre la sumatoria de 
 sus valores, de ahi sum = sum + numbers[i]...vease que se usa el metodo toFixed  el cual redondearia a dos lugares 
 despues de la coma cualesquiera el resultado decimal...esta funcion es utilizada en la conformacion de las tablas
  at Glance */
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function minyArray(arraynumb, arrayAverage) {
  var arrayContainer = []
  arrayContainer.push(arraynumb, arrayAverage)
  return arrayContainer
}/*en este caso se desarrolla la fucnion minyArray la cual es la encargada de fusionar dos parametros
 en un array , o sea un array de numeros y un array de promedios (average), los cuales dispuestos de manera
  exacta dispondrian un matriz de mini arrays para conformar una tabla resumen, en este caso esta funcion tambien
   es utilizada para el desarrollo de l tabla At Glance */
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function mytotalesNum(number) {
  var total = number
  return total;
}/**se establece una funcion que sumariza los parametros  para resumir los filtros para el numero de democrats ,
 republicanos e independientes para seguir  construyendo la tabla At Glance */
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function tablaGlanceSumaTotales(arrayNumeros, arrayVotos) {
  var arrayTotales = []
  arrayTotales.push(arrayNumeros, arrayVotos)
  return arrayTotales
}
/*se establece una funcion que sumariza en dos parametros el totales de miembros y de averages  de cada partido
lo cual seria entonces el resumen de a fila total en la tabla  At Glance  */
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function matrixTablaGlance(arrayx, arrayy, arrayz, arraytotal) {
  var tablaResumen = []
  tablaResumen.push(arrayx, arrayy, arrayz, arraytotal)
  return tablaResumen
}
/*se adicionan todas las arrays mediante metodo push para crear una matriz de arrays que contendria todos
los arrays con sus componentes dentro asignadosele la variable llamada arrayMatrixTablaGlance pra el
 desarrollo de dich funcion mas o menos arrayMatrixTablaGlance[[210;88.34],[240;90.12],[0;nan],[450,181...]]  */

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function tableGlanceHouse(matrix, tableid) {
  var glanceTr = document.querySelectorAll(tableid)
  console.log(glanceTr)
  for (var i = 0, len4 = matrix.length; i < len4; i++) {
    for (var j = 0, len5 = matrix[i].length; j < len5; j++) {
      var celda = document.createElement("td");
      celda.innerHTML = matrix[i][j]

      glanceTr[i].appendChild(celda)
    }
  }
}
/*se crea la funcion que conformaria la tabla en si, vease que se crea una variable (glanceTr) la cual mediante el 
metodo de querySelectorall, recogeria todos los valores previamente existenctes en la tabla conformantes
del tr, para despues junto con los valores del loop volverseles a insertar a dicha tabla de manera funcional.
Como la funcion se realiza sobre un array de arrays(matriz) se establecen dos loops, el primero recorreria la
posicion del array principal, y el segundo recorreria la ubicacion del los elementos de segundo subarray teniendo
en cuenta su posicion como elemento del primero declarandose dos variables(i,j), donde la segunda se evaluaria
empezando desde su posicion cero y recorria su array teniendo en cuenta la posicion en que se encuentra la variable
i que itera en la matriz principal .Vease que para cada iteracion se crea un elemento "td" el cual se le asigna a la
variable llamada celda,que a su vez establece en el html mediante property innerHTML dicha matrix de arrays tanto 
para sus valores generales i como para sus sub arrays j.Y por ultimo se adhiere dicho contenido al cuerpo de la 
tabla "glancetr" mediante la function Dom appendchild especificandose que lo que se va a adherir es todo lo asignado
a la variable celda mediante los loops */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function addingRepeatedAfter10pct(array, obj) {
  var resumedArray = []
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
  return resumedArray
}
/*en este caso se desarrolla una funcion que determinaria que numeros se adicionarian a un array despues de haberse 
llenado el mismo con el 10 porciento del array general, la genesis en si concluye que una vez este array este completo
 se compararian los elementos excluidos con el ultimo numero incluido en el array
 (de ahi la expresion:else if (resumedArray[resumedArray.length - 1][obj] == array[i][obj]){ resumedArray.push(array[i])...)
 y de ser iguales entonces ese elemento tambin se incluiria aunque no formara parte del 10 porciento mediante la 
 metodo push*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function myNewArrayAscending(array, field) {
  return array.sort(function Objs(obj1, obj2) {
    return obj1[field] - obj2[field]
  }
  )
}/* funcion que determina mediante el uso de objetos el sorteo de un array por orden ya sea numerico o alfabetico 
   o cualesquierea que fuese la orden*/
/**////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function myNewArrayDescending(arrayx, field) {
  return arrayx.sort(function Objs(obj1, obj2) {
    return obj2[field] - obj1[field]
  }
  )
}
/**se realiza la misma funcion de ordenamientos de objetos mediante el sort de un array de objetos
  si lo qie se quiere es ordenar el array de mayor a menor teniendo en cuanta
 el objeto para el cual se evalua*/
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function createTable(array, props, tableId) {
  var bodytabla = document.getElementById(tableId)
  for (var i = 0, len1 = array.length; i < len1; i++) {
    var row = document.createElement("tr");
    var celda1 = document.createElement("td");
    var referencia = document.createElement("a");
    var celda2 = document.createElement("td");
    var celda3 = document.createElement("td");


    referencia.setAttribute("href", array[i].url)
    referencia.setAttribute("target", array[i].url)
    referencia.innerHTML = array[i].first_name + " " + (array[i].middle_name || "") + " " + array[i].last_name;

    celda1.append(referencia)
    celda2.innerHTML = array[i][props.total]
    celda3.innerHTML = array[i][props.percentage]



    bodytabla.append(row);
    row.append(celda1, celda2, celda3)

  }
}
/*////////////////////////////////////////////////////////////////////////////////////////////////////*/

/*1--------*/

/*2--------*/ function fileteredCheckbox() {
/*3-------*/ let filteredMembers = (myForStates(houseMembers)).filter(
/*4-------*/ member =>
    (document.getElementById("republicans").checked && member.party == "R") ||
    (document.getElementById("democrats").checked && member.party == "D") ||
    (document.getElementById("independents").checked && member.party == "I"));


/*5--------*/ createTableMain(filteredMembers, { partymem: "party", statemem: "state", senioritymem: "seniority", votesmem: "votes_with_party_pct" }, "tabla-house");

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
/*---------------------pasos explicados de la funcion---------------------------*/
/*vease que este funcion simplemente se le llama filteredCheckbox pues filtrara o ejecutara la creacion de \
tablas a partir dle checkbox o los checkboxes que sean triggereados*/// => === function()*/

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

 /*5-En este caso si ninguna de las dosfunciones anteriores se cumple entonces se inicializaria la creacion de una tabla a 
 partir de la variable filteredMemebr*/

 /*6 como ultimo se desarrolla un grupo de condicionantes que teniendo en cuenta el id alert harian de conjunto la funcion
  de filtrar el dropdown selector y los chechboxes , ademas de mostrar o no mostrar cuadros de alerta cuando 
   cualesquiera la informacion requerida sea nula*/
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function createTableMain(array, props, tableId) {
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
/*En este caso se inicializa la creacion de la tabla que teniendo en cuenta, tres parametros para que de manera general 
se resuma la creacion de la tabla teniendo en cuenta el array , los parametros para los cuales se evalua la construccion
de la tabla , y el id que lo caliza el lugra en donde dicha tabla se ria construida en el html.
Como dato interesante se puede ver  que la variable a la cual se asigna el elemnto constructor teneindo en cuenta el id
(bodytabla) isofacto despues de haber sido declarada se le asigan aun valor nulo, lo cual indica que   cada  dicha
variable cada vez qye  reciba una fucnion directa reiniciara su diseno completo almacenando nuevos valores simepre que la 
funcion y el filtro indiquen que conjunto de datos llamar */

/*--------------creacion de las condiciones para el DropDown List-------------------------------------*/
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function myNonRepeatedStates(value, index, self) {
  return self.indexOf(value) === index;
}
/*vease que primero se desarrolla una funcion que determina que valores de una array se repiten , mediante 
tres parametros , valor, index, y selfcompared, donde la logica de la funcion explica que se devolveria el valor al self 
,si el primer valor no repetido que se almacene en value(culaesquiera el valor que este tenga en el array)= al index en si
una vez declarada la funcion que determina las elementos del array no repetidos se aplica dicha funcion 
a cualesquiera el array que se quisiese analizar de la siguiente manera, obtniedose un array sin elementos repetidos
aunque no ordenado de ahi que se le asigne a la variable el nombre de myNonRepeatedStatesArrayUnordered */
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function statesOrdered(array) {
  array.sort();
  return array;
}
/* en el siguiente paso entonces se ordenaria en este caso de manera alfabetica  la lista de elementos que dicho array 
 asignado a la variable myNonRepeatedStatesArrayUnordered posee creandose una funcion que ordene alfabeticamente dicho
 array   filtrado para los elementods no repetidos, utilizando el metodo sort sobre el mismo array , retornando su valor
 en si  de manera ordenada
Vease que despues simplemente se le asigna una variable  para inicializar dicha funcion esta vez sobre el array en 
si que quermeos analizar u ordenar( en este caso seria el asigando a la variable myNonRepeatedStatesArrayUnordered ) */
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
/*------------------------creacion de dropdown list a partir de los procesos anteriores--------------------------

1---vease que lo primero quue se hace es inicializar una variable a la cual se le asiganara toda accion o cambio referente
al item contenedor del id"select en html'dicha variale seria el puente conector entre lo que que quiere hacer esta funcion
y su ejecucion final en el html y por consiguiente resultaod de salida al usuario

2---en este segundo paso se inicializa la variable contenerdora del array ordenado y sin repetir a partir del cual se 
quiere construir el dropdpown list

3---Se inicia un bucle que iteraria sobre el anterior array, para de esta manera analizar cada elemento del mismo, 
inicialzando varias acciones para cda una de los elemntos del array en si.
4---se inicializa el metodo createElement, inicializando una condicion llamda "OPTION"y dicha condicion transformara
el valor de cada elemento en el array en una opcion como tal.

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
anadir otro elemento a ese droppdown list*/
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
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
/*//----------------A continuacion desarrollo de la  funcion que conecta el dropdown list con la tabla---------------
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
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
 function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read More";
    moreText.style.display = "none";
  }
  else {
    dots.style.display = "none";
    btnText.innerHTML = "Read Less...";
    moreText.style.display = "inline";
  }
}/*funcion que determina el read less read more en el html home. */
