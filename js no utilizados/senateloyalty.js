var senateMembers=data.results[0].members;

var arrayNames=senateMembers.filter(function(obj){return obj}).map(function(obj){return obj.first_name});
var arrayVotes=senateMembers.filter(function(obj){return obj}).map(function(obj){return obj.votes_with_party_pct});
var arrayGeneral=senateMembers.filter(function(obj){return obj}).map(function(obj){return obj});
var arrayNumber=arrayNames.length 

var democratarray=senateMembers.filter(function(obj){return obj.party==="D"}).map(function(obj){return obj.first_name});
var democratVotes=senateMembers.filter(function(obj){return obj.party==="D"}).map(function(obj){return obj.votes_with_party_pct});
var democratGeneral=senateMembers.filter(function(obj){return obj.party==="D"}).map(function(obj){return obj});
var democratsNumber=democratarray.length 
/*usando metodo fileter para filtar los democratas ademas de dterminar el
                              length d esu array para determinar su nuemro*/
var republicanarray=senateMembers.filter(function(obj){return obj.party==="R"}).map(function(obj){return obj.first_name});
var republicanGeneral=senateMembers.filter(function(obj){return obj.party==="R"}).map(function(obj){return obj});
var republicanVotes=senateMembers.filter(function(obj){return obj.party==="R"}).map(function(obj){return obj.votes_with_party_pct});
var republicanNumber=republicanarray.length                                                           
/*usando metodo fileter para filtar los republicanos ademas de dterminar el
                                                            length d esu array para determinar su nuemro*/
var independentarray=senateMembers.filter(function(obj){return obj.party==="I"}).map(function(obj){return obj.first_name});
var independentGeneral=senateMembers.filter(function(obj){return obj.party==="I"}).map(function(obj){return obj});
var independentVotes=senateMembers.filter(function(obj){return obj.party==="I"}).map(function(obj){return obj.votes_with_party_pct});
var independentNumber=independentarray.length  

var General=senateMembers.filter(function(obj){return obj.first_name}).map(function(obj){return obj.votes_with_party_pct});
                              
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

let resultAscendingLoyalty = myNewArrayAscending(senateMembers, "votes_with_party_pct")
var arrayResumedLoyaltyLeast=addingRepeatedAfter10pct(resultAscendingLoyalty,"votes_with_party_pct")
console.log(arrayResumedLoyaltyLeast)

var resultDescendingLoyalty=myNewArrayDescending(senateMembers, "votes_with_party_pct")
var arrayResumedLoyaltyMost=addingRepeatedAfter10pct(resultDescendingLoyalty,"votes_with_party_pct")
console.log(arrayResumedLoyaltyMost)
 

tableGlanceSenate(arrayMatrixTablaGlance,"#table-senate-glance>tr")

createTable(arrayResumedLoyaltyLeast,{total:"total_votes",percentaje:"votes_with_party_pct"},"least-loyal-senate-table")

createTable(arrayResumedLoyaltyMost,{total:"total_votes",percentaje:"votes_with_party_pct"},"most-loyal-senate-table")


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
function minyArray(arraynumb, arrayAverage)
 {
var arrayContainer = []
arrayContainer.push(arraynumb, arrayAverage)
return arrayContainer
} /*se crea un sub array que contendra todo lo referente al cuadro democrata
                        demarcando numeros(democratsNumber y average(average(democratNumber))
                        dejando una matriz que as o menos quedaria asi arrayDem[210,88.15]*/

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function mytotalesNum(number)/**se establece una funcion que sumariza los parametros  para resumir los
                             filtros para el numero de democrats , republicanos e independientes para seguir
                             construyendo la tabla atendance */

{
  var total=number
  return total;
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
function tableGlanceSenate(matrix,tableid)
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
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function myNewArrayAscending(arrayAscending, field)
{
    return arrayAscending.sort(function Objs(obj1, obj2)
        {
            return obj1[field] - obj2[field]
        }
    )
}
 /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////
 vease que en esta funcion simplemente se establece la relacion entre dos arrays , el cual determinaria que 
 otros elementos de una arry mayor pudiesen incluirse en una array menor  si cierta condicion se cumple*/
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
/**////////////////////////////////////////////////////////////////////////////////////////////////////////// */
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
function createTable(arraySenate,props,tableId)
{
  var bodytablaSenateMost=document.getElementById(tableId)
    for(var i=0,len1=arraySenate.length;i<len1;i++)
    {
    
      var rowSenateMost=document.createElement("tr");
      var celdaSenateName=document.createElement("td");
        var referencia=document.createElement("a");
        var celdaSenatePartyVotes=document.createElement("td");
        var celdaSenateVotes=document.createElement("td");

        

        referencia.setAttribute("href",arraySenate[i].url)
        referencia.setAttribute("target",arraySenate[i].url)
        referencia.innerHTML=arraySenate[i].first_name+" "+(arraySenate[i].middle_name||"")+" "+arraySenate[i].last_name;

        celdaSenateName.append(referencia)
        celdaSenatePartyVotes.innerHTML=arraySenate[i][props.total]
        celdaSenateVotes.innerHTML=arraySenate[i][props.percentaje]
        
       
       
        bodytablaSenateMost.append(rowSenateMost);
        rowSenateMost.append(celdaSenateName,celdaSenatePartyVotes,celdaSenateVotes)
         
    }
}


