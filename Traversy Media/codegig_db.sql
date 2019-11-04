DROP DATABASE IF EXISTS codegig_db;


CREATE DATABASE codegig_db;

USE codegig_db;


CREATE TABLE gigs(
  id int NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  technologies VARCHAR(255) NOT NULL,
  budget VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL,
  PRIMARY KEY (id)
);


