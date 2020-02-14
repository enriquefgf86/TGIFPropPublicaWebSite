var houseMembers=dataHouse.results[0].members;

var arrayNames=houseMembers.filter(function(obj){return obj}).map(function(obj){return obj.first_name});
var arrayVotes=houseMembers.filter(function(obj){return obj}).map(function(obj){return obj.votes_with_party_pct});
var arrayGeneral=houseMembers.filter(function(obj){return obj}).map(function(obj){return obj});
var arrayNumber=arrayNames.length 

var democratarray=houseMembers.filter(function(obj){return obj.party==="D"}).map(function(obj){return obj.first_name});
var democratVotes=houseMembers.filter(function(obj){return obj.party==="D"}).map(function(obj){return obj.votes_with_party_pct});
var democratGeneral=houseMembers.filter(function(obj){return obj.party==="D"}).map(function(obj){return obj});
var democratsNumber=democratarray.length 

var republicanarray=houseMembers.filter(function(obj){return obj.party==="R"}).map(function(obj){return obj.first_name});
var republicanGeneral=houseMembers.filter(function(obj){return obj.party==="R"}).map(function(obj){return obj});
var republicanVotes=houseMembers.filter(function(obj){return obj.party==="R"}).map(function(obj){return obj.votes_with_party_pct});
var republicanNumber=republicanarray.length 
                             /*usando metodo fileter para filtar los republicanos ademas de dterminar el
                              length d esu array para determinar su nuemro*/
var independentarray=houseMembers.filter(function(obj){return obj.party==="I"}).map(function(obj){return obj.first_name});
var independentGeneral=houseMembers.filter(function(obj){return obj.party==="I"}).map(function(obj){return obj});
var independentVotes=houseMembers.filter(function(obj){return obj.party==="I"}).map(function(obj){return obj.votes_with_party_pct});
var independentNumber=independentarray.length

var General=houseMembers.filter(function(obj){return obj.first_name}).map(function(obj){return obj.votes_with_party_pct});

var arrayDem = minyArray(democratsNumber, average(democratVotes))

/*se crea un sub array que contendra todo lo referente al cuadro democrata
                        demarcando numeros(democratsNumber y average(average(democratNumber))
                        dejando una matriz que as o menos quedaria asi arrayDem[210,88.15]*/
var arrayRep = (minyArray(republicanNumber, average(republicanVotes)))
/*se crea un sub array que contendra todo lo referente al cuadro republicano
demarcando numeros(republicanNumber y average(average(republicanVotes))
dejando una matriz que as o menos quedaria asi arrayDem[240,90.32]*/
var arrayInd = (minyArray(independentNumber, average(independentVotes)));
/*se crea un sub array que contendra todo lo referente al cuadro independiente
demarcando numeros(independientNumber y average(average(independientVotes))
dejando una matriz que as o menos quedaria asi arrayDem[0,nan]*/  

var arrayTotales=tablaGlanceSumaTotales(mytotalesNum(arrayNumber),mytotalesNum(average(arrayVotes)))

var arrayMatrixTablaGlance=matrixTablaGlance(arrayRep,arrayDem,arrayInd,arrayTotales)

let resultAscending = myNewArrayAscending(houseMembers, "votes_with_party_pct")
var resumedHouseLeast=addingRepeatedAfter10pct(resultAscending,"votes_with_party_pct")
console.log(resumedHouseLeast)

var resultDescending=myNewArrayDescending(houseMembers, "votes_with_party_pct")
var resumedHouseMost=addingRepeatedAfter10pct(resultDescending,"votes_with_party_pct")
console.log(resumedHouseMost)


tableGlanceHouse(arrayMatrixTablaGlance,"#bodyTabHouseGlance>tr")

createTable(resumedHouseLeast,{total:"total_votes",percentage:"votes_with_party_pct"},"leastLoyalty")

createTable(resumedHouseMost,{total:"total_votes",percentage:"votes_with_party_pct"},"mostloyalty")


/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/ 
 function average (numbers) 
 {
    var sum = 0;
    for (let i = 0; i < numbers.length; i++)
    {
     sum =sum+ numbers[i];
        
    }
    if(sum==0)
    {
      return 0
    }
    else
    {
    return sum / numbers.length;
  }
}

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function mytotalesNum(number)/**se establece una funcion que sumariza los parametros  para resumir los
                             filtros para el numero de democrats , republicanos e independientes para seguir
                             construyendo la tabla atendance */

{
  var total=number
  return total;
}

function minyArray(arraynumb, arrayAverage)
 {
var arrayContainer = []
arrayContainer.push(arraynumb, arrayAverage)
return arrayContainer
 }

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*se establece una funcion que sumariza en dos parametros el totales de miembros y de averages  de cada partido
lo cula seria entonces el resumen de a fila total en la tabla Glance  */
function tablaGlanceSumaTotales(arrayNumeros, arrayVotos)
{
  var arrayTotales=[]
  arrayTotales.push(arrayNumeros, arrayVotos)
  return arrayTotales
}

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*se adicionan todas las arrays mediante metodo push para crear una matriz
de arrays que contendria todos los arrays con sus componentes dentro asignadosele la variable llamada
arrayMatrixTablaGlance pra el desarrollo de dich funcion mas o menos
arrayMatrixTablaGlance[[210;88.34],[240;90.12],[0;nan],[450,181...]]  */

function matrixTablaGlance(arrayx, arrayy, arrayz, arraytotal)
{
  var tablaResumen =[]
  tablaResumen .push(arrayx, arrayy, arrayz, arraytotal)
  return tablaResumen 
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////
se crea la fncion que conformaria la tabla en si, vease que se crea una variable (glanceTr) la cual mediante el 
metodo de querySelectorall, recogeria todos los valores previamente existenctes en la tabla conformantes
del tr, para despues junto con los valores del loop volverseles a insertar a dicha tabla de manera funcional.
Como la funcion se realiza sobre un array de arrays(matriz) se establecen dos loops, el primero recorreria la
posicion del array proncipal, y el segundo recorreria la ubicacion del los elementos de segundo subarray teneindo
en cuenta su posicion como elemento del priemro declarandose dos variables(i,j), donde la segunda se evaluaria
empezando desde su posicion cero y recorria su array teneidno en cuenta la posicion en que se encunetra la variable
i que itera en la matriz principal .Vease que para cada iteracion se crea un elemento "td" el cual se le asigna a la
variable llamada celda,que a su vez establece en el html mediante property innerHTML dicha matrix de arrays tanto 
para sus valores generales i como para sus sub arrays j.Y por ultimo se adhiere dicho contenido al cuerpo de la 
tabla "glancetr" mediante la function Dom appendchild especificandose que lo que se va a adherir es todo lo asignado
a la variable celda mediante los loops */
function tableGlanceHouse(matrix,tableid)
{
var glanceTr=document.querySelectorAll(tableid)
for(var i=0,len4=matrix.length;i<len4;i++)
{
  for(var j=0, len5=matrix[i].length;j<len5;j++)
  {
    var celda=document.createElement("td");
    celda.innerHTML=matrix[i][j]

    glanceTr[i].appendChild(celda)
  }
}
}

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     funcion que determina mediante el uso de objetos el sorteo de un array por orden ya sea numerico o alfabetico 
     o cualesquierea que fuese la orden*/

function myNewArrayAscending(array, field)
{
    return array.sort(function Objs(obj1, obj2){return obj1[field] - obj2[field]})
}

 /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////
 vease que en esta funcion simplemente se establece la relacion entre dos arrays , el cual determinaria que 
 otros elementos de una arry mayor pudiesen incluirse en una array menor  si cierta condicion se cumple*/
  
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function addingRepeatedAfter10pct(array,obj)
 {
   var resumedArray=[]
   for( var i=0;i<array.length;i++)
   {
     if(i<0.1*array.length)
     {
       resumedArray.push(array[i]);
     }
     else if (resumedArray[resumedArray.length-1][obj]==array[i][obj])
     {
       resumedArray.push(array[i]);
     }
     else
     {
       break;
     }
   }
   return resumedArray
 }
 
/*////////////////////////////////////////////////////////////////////////////////////////// */

/**se realiza la misma funcion de ordenamientos de objetos mediante el sort de un array de objetos
 *  si lo qie se quiere es ordenar el array de mayor a menor teniendo en cuanta
 * el objeto para el cual se evalua, en este caso el votes.....pct
 */
function myNewArrayDescending(arrayx, field)
{
    return arrayx.sort(function Objs(obj1, obj2)
        {
            return obj2[field] - obj1[field]
        }
    )
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function createTable(array,props,tableId)
{
    var bodytabla=document.getElementById(tableId)
    for(var i=0,len1=array.length;i<len1;i++)
    {
    
      var row=document.createElement("tr");
      var celda1=document.createElement("td");
      var referencia=document.createElement("a");
      var celda2=document.createElement("td");
      var celda3=document.createElement("td");
              

        referencia.setAttribute("href",array[i].url)
        referencia.setAttribute("target",array[i].url)
        referencia.innerHTML=array[i].first_name+" "+(array[i].middle_name||"")+" "+array[i].last_name;

        celda1.append(referencia)
        celda2.innerHTML=array[i][props.total]
        celda3.innerHTML=array[i][props.percentage];
        
       
       
        bodytabla.append(row);
        row.append(celda1,celda2,celda3)
         
    }
}


