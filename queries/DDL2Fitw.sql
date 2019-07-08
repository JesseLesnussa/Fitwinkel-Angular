CREATE TABLE
Klachten
(
	Klachtennummer			INT IDENTITY(1002000, 1) PRIMARY KEY,
	merkId					INT,
	medewerkerId			INT,
	klantId					INT,
	productNaam				VARCHAR(255),
	productNummer			VARCHAR(255),
	Serienummer				VARCHAR(255),
	defectOnderdeel			VARCHAR(255),
	orderNummer				VARCHAR(255),
	Aankoopdatum			VARCHAR(255),
	DatumBegin				VARCHAR(255),
	Klachtenomschrijving	VARCHAR(255),
	S						BIT
)

INSERT INTO
Klachten
VALUES
(1,1,'Productnaam','Productnummer','Serienummer','','Ordernummer', '11-12-2018','21-12-2018','Klachtenomschrijving 1', 1),
(1,3,'Productnaam','Productnummer','Serienummer','','Ordernummer', '11-12-2018','21-12-2018','Klachtenomschrijving 2', 1),
(1,4,'Productnaam','Productnummer','Serienummer','','Ordernummer', '11-12-2018','21-12-2018','Klachtenomschrijving 3', 1),
(1,4,'Productnaam','Productnummer','Serienummer','','Ordernummer', '11-12-2018','21-12-2018','Klachtenomschrijving 4', 1)

