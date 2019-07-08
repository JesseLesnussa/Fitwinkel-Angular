import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Klacht } from './klacht';

@Injectable({
  providedIn: 'root'
})
export class MsSQLService {

  constructor(private HttpClient:HttpClient) { }
  
  getStatsLimit(type){
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/stats/limit?type=" + type)
  }

  getStatsStatus(){
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/stats/status")
  }

  getStatsMaandJaar(){
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/stats/maandjaar")
  }

  getStatsMerken(){
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/stats/merken")
  }

  getKlachten(){
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/klachten/")
  }

  getKlachtenByMedewerker(medewerkerId){
  
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/klachten?medewerkerId=" + medewerkerId)
  }

  getMerken(){
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/merken/")
  }
  getMerk(id){
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/merken/" + id)
  }

  getDetailsKlacht(id){
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/klachten/"+id)
  }

  getActies(id){
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/acties/"+id)
  }
  
  addActie(actie){
    return this.HttpClient.post("https://fitwinkel.azurewebsites.net/api/acties/", actie);
  }
  addMerk(merk){
    return this.HttpClient.post("https://fitwinkel.azurewebsites.net/api/merken/", merk);
  }
  addMedewerker(medewerker){
    return this.HttpClient.post("https://fitwinkel.azurewebsites.net/api/medewerkers/", medewerker);
  }
  deleteActie(actie){
    return this.HttpClient.delete("https://fitwinkel.azurewebsites.net/api/acties/" + actie.id);
  }
  deleteMedewerker(medewerker){
    return this.HttpClient.delete("https://fitwinkel.azurewebsites.net/api/medewerkers/" + medewerker.medewerkerId );
  }
  deleteMerk(merk){
    return this.HttpClient.delete("https://fitwinkel.azurewebsites.net/api/merken/"+merk.id);
  }
  getKlachtByMerk(merk){
 //   return this.HttpClient.get("http://localhost:8080/fitwinkel/klachten.php?merk="+merk)  
 return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/klachten")  
  }

  getKlachtByFilter(merk,status){

    let url = "https://fitwinkel.azurewebsites.net/api/klachten";
  if(!merk && status == null) url = url
  else if (merk != null && status == null)  url = "https://fitwinkel.azurewebsites.net/api/klachten?merknaam=" + merk 
  else if (!merk && status != null)  url = "https://fitwinkel.azurewebsites.net/api/klachten?s=" + status 
  else url = "https://fitwinkel.azurewebsites.net/api/klachten?merknaam=" + merk +"&s=" + status;

   return this.HttpClient.get(url);


 //   return this.HttpClient.get("http://localhost:8080/fitwinkel/klachten.php?merk="+merk+"&s="+status)  
  }
  addKlacht(klacht){
    klacht.merkId = klacht.MerkType.id;
    klacht.klantId = klacht.klant.id;
    klacht.klant = [];
    //Klant object mappen naar de volle JSON-object. Één laag omlaag 
    
    return this.HttpClient.post("https://fitwinkel.azurewebsites.net/api/klachten/", klacht);
  }

  updateChecklist(klacht){
    return this.HttpClient.post("https://fitwinkel.azurewebsites.net/api/klachten/updateChecklist", klacht);
  }

  updateKlacht(klacht){   
    return this.HttpClient.post("https://fitwinkel.azurewebsites.net/api/klachten/update", klacht);
  }


  getKlanten(){
  //  return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/relatieslocal") 
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/relatiesTest") 

  }
  getKlant(id){
  //return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/relaties/"+id) 
  return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/relatiesTest/"+id) 
  
}

  deleteKlant(klant){
    return this.HttpClient.delete("https://fitwinkel.azurewebsites.net/api/relaties/" + klant.id) 
  }

  deleteKlacht(klacht){
    return this.HttpClient.delete("https://fitwinkel.azurewebsites.net/api/klachten/" + klacht.klachtennummer) 
  }

  addKlant(klant){
    return this.HttpClient.post("https://fitwinkel.azurewebsites.net/api/relaties/", klant) 
  }

  getMedewerkers(){
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/medewerkers") 
  }

  getMedewerker(id){
    return this.HttpClient.get("https://fitwinkel.azurewebsites.net/api/medewerkers/"+id)
  }

  updateKlachtGegevens(klacht){
    return this.HttpClient.post("https://fitwinkel.azurewebsites.net/api/klachten/updateKlachtgegevens", klacht);   
  }

  updateMerk(merk){
    return this.HttpClient.post("https://fitwinkel.azurewebsites.net/api/merken/update", merk);
  }
}

