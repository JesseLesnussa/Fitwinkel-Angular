import { Klant } from './klant';
import { MerkenComponent } from './merken/merken.component';

export class Klacht {
    Klachtennummer?			: string;  	
    snelstartnr?			    :  string;
    Klantnaam?				:  string;	
    Klantadres?				:  string;
    Klantpostcode?			:  string;
    Woonplaats?				:  string;
    Telefoonnummer? 		    :  string;
    mobiel?					:  string;
    Telefoon? 				:  string;
    vast?					:  string;
    Email?					:  string;
    Klachtenomschrijving?	:  string;
    Merk?					:  string;
    Type?					:  string;
    Serienummer?			    :  string;
    Modelnummer?			    :  string;
    Aankoopdatum?			:  string;
    DatumBegin?				:  string;
    DatumOpgelost?			:  string;
    DagenOpen?				:  number;
    AantalActies?			:  number;
    WeeknummerBegin?		    :  number;
    WeeknummerEind?			:  number;
    jaarBegin?				:  number;
    jaarEind?				:  number;
    Urgent?					:  string;
    S?						:   number;
    klant?                  : Klant;
    MerkType?               : {Merknaam:String, SerienummerVerplicht: number};
    medewerkerId?           : number;
}
