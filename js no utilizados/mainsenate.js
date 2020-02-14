
var senateMembers=[];

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
  response=>
  {
    return response.json()
  }
)
.then
(
  usedFunctions=>
  {
    senateMembers= usedFunctions.results[0].members
    document.getElementById("loader").style.display="none"
    init()
  }
)
.catch
(
  error=>
  {
    console.log(error)
  }
)
function init()
{
  var arrayGeneral=senateMembers.filter(function(obj){return obj}).map(function(obj){return obj.state});
  var myNonRepeatedStatesArrayUnordered = arrayGeneral.filter(myNonRepeatedStates);
  var myStatesOrdered = statesOrdered(myNonRepeatedStatesArrayUnordered);
  myDropDown(myStatesOrdered)
  fileteredCheckbox()


}
/*---------------------------------------------------------------------------------------------------------------*/
var btnCheckBoxRepublicans=document.getElementById("republicansSenate")
var btnCheckBoxIndependents=document.getElementById("independentsSenate")
var btnCheckBoxDemocrats=document.getElementById("democratsSenate")
var dropDownselector=document.getElementById("selectSenate")
/*-----------------------------------------------------------------------------------------------------------------*/

btnCheckBoxRepublicans.addEventListener("click",function(){fileteredCheckbox(myForStates(senateMembers),{partys:"party",states:"state",senioritys:"seniority",percentage:"votes_with_party_pct"},"tabla-senado")})
btnCheckBoxIndependents.addEventListener("click",function(){fileteredCheckbox(myForStates(senateMembers),{partys:"party",states:"state",senioritys:"seniority",percentage:"votes_with_party_pct"},"tabla-senado")})
btnCheckBoxDemocrats.addEventListener("click",function(){fileteredCheckbox(myForStates(senateMembers),{partys:"party",states:"state",senioritys:"seniority",percentage:"votes_with_party_pct"},"tabla-senado")})
dropDownselector.addEventListener("change",function(){fileteredCheckbox(myForStates(senateMembers),{partys:"party",states:"state",senioritys:"seniority",percentage:"votes_with_party_pct"},"tabla-senado" )})



/*------------------------------------------------------------------------------------------------------------ */

    
    function fileteredCheckbox()
     {
      let filteredMembers = myForStates(senateMembers).filter(
        member =>
          (document.getElementById("republicansSenate").checked && member.party == "R") ||
          (document.getElementById("democratsSenate").checked && member.party == "D") ||
          (document.getElementById("independentsSenate").checked && member.party == "I")
      ) 
      createTable(filteredMembers,{partymem: "party",statemem: "state",senioritymem: "seniority",votesmem: "votes_with_party_pct"},"tabla-senado");
          
     var notification1=document.getElementById("alert")

     if(document.getElementById("republicansSenate").checked&&filteredMembers.length==0)
     {
       notification1.innerHTML="No Republicans on the search,try with other party.Thanks!!"
       notification1.classList.remove("alert", "alert-success")
       notification1.classList.add("alert","alert-danger")
     }
     else if(document.getElementById("democratsSenate").checked&&filteredMembers.length==0)
     {
       notification1.innerHTML="No Democrats on the search,try with other party.Thanks!!"
       notification1.classList.remove("alert", "alert-success")
       notification1.classList.add("alert","alert-danger")
     }
     else if(document.getElementById("independentsSenate").checked&&filteredMembers.length==0)
     {
       notification1.innerHTML="No Independents on the search,try with other party.Thanks!!"
       notification1.classList.remove("alert", "alert-success")
       notification1.classList.add("alert","alert-danger")
     }
     else if(filteredMembers.length!==0)
     {
       notification1.innerHTML=" "
       notification1.classList.remove("alert", "alert-success")
     }
     else if((document.getElementById("republicansSenate").checked )&&
             (document.getElementById("democratsSenate").checked )&&
             (document.getElementById("independentsSenate").checked)==false)
            {
              
              notification1.innerHTML="Please Select Party and State"
              notification1.classList.remove("alert","alert-danger")
              notification1.classList.add("alert", "alert-success")
              document.getElementById("mostrar").style.display="none"
            }
      else
            {
              notification1.innerHTML="Please Select Party and State"
              notification1.classList.remove("alert","alert-danger")
              notification1.classList.add("alert", "alert-success")
              
            }
            
}
/*------------------------------------------------------------------------------------------------------------------*/
function createTable(arraySenate,props,tableId)
{
    var bodytablaSenate=document.getElementById(tableId)
    bodytablaSenate.innerHTML=" "
    for(var i=0,len=arraySenate.length;i<len;i++)
    {
        var rowSenate=document.createElement("tr");
        var celdaSenadoName=document.createElement("td");
        var referencia=document.createElement("a");
        var celdaSenadoParty=document.createElement("td")
        var celdaSenadoState=document.createElement("td");
        var celdaSenadoYears=document.createElement("td");
        var celdaSenadoVotes=document.createElement("td");


        referencia.setAttribute("href",arraySenate[i].url)
        referencia.setAttribute("target",arraySenate[i].url)
        referencia.innerHTML=arraySenate[i].first_name+" "+(arraySenate[i].middle_name||"")+" "+arraySenate[i].last_name;

        celdaSenadoName.append(referencia);
        celdaSenadoParty.innerHTML=arraySenate[i][props.partymem]
        celdaSenadoState.innerHTML=arraySenate[i][props.statemem]
        celdaSenadoYears.innerHTML=arraySenate[i][props.senioritymem]
        celdaSenadoVotes.innerHTML=arraySenate[i][props.votesmem]
       
       
        bodytablaSenate.append(rowSenate);
        rowSenate.append(celdaSenadoName,celdaSenadoParty,celdaSenadoState,celdaSenadoYears,celdaSenadoVotes)
    }
}


/*console.log(createTable(myForStates(senateMembers),{partymem:"party",statemem:"state",senioritymem:"seniority",votesmem:"votes_with_party_pct"},"tabla-senado"))

*/
/*--------------------------------------------------------------------------------------------------------------*/


function myNonRepeatedStates(value, index, self)
{
  return self.indexOf(value) === index;
}



function statesOrdered(array)
{
  array.sort();
  return array;
}




/*-----------------------------------------------------------------------------------------------------------------*/
function myDropDown(array)
{var select = document.getElementById("selectSenate"),
array;
 for (var i = 0; i < array.length; i++)
{
var option = document.createElement("OPTION"),
txt = document.createTextNode(array[i]);
option.appendChild(txt);
option.setAttribute("value", array[i]);
select.insertBefore(option, select.lastChild);
}}

/*-----------------------------------------------------------------------------------------------------------------*/
function myForStates(array/*,obj*/)
 {
 var valorDropdown = document.getElementById("selectSenate").value;
 var arrayofstates = [];

 for (var i = 0; i < array.length; i++) 
  {
    if (array[i].state/*[obj]*/ == valorDropdown || valorDropdown == "Default") 
    {
    arrayofstates.push(array[i]);
    }
  }
  return arrayofstates;
}



/*-------------------------------------------------------------------------------------------------------------- */

