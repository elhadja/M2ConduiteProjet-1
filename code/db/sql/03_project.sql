CREATE TABLE cdp_project (
    id int UNSIGNED AUTO_INCREMENT,
    name_ VARCHAR(32) NOT NULL,
    description_ TEXT NOT NULL,

    CONSTRAINT PK_ID PRIMARY KEY (id)
);

INSERT INTO `cdp_project`(`name_`, `description_`) 
        VALUES ("Project 01", "Premier projet");