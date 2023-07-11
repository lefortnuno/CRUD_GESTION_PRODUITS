drop database gestion_produits;

create database gestion_produits;
use gestion_produits;

create table PRODUITS (
    numProd int(11) NOT NULL AUTO_INCREMENT,
    design varchar(255) NOT NULL,
    prix FLOAT(2) NOT NULL,
    quantite FLOAT(2) NOT NULL,
    montant FLOAT(2) NOT NULL,
    PRIMARY KEY (numProd)
);
 
 
