# my-budget
A software solution for tracking finances created using Angular framework and Spring Boot 

--Steps for starting the app--

Prerequisites:
Git
VS Code - Installed the coding pack for Java and Spring boot extension 
Node.js(LTS), Angular

---------------------------------------------------------------------

Database setup:
-Install Postgresql (Windows x86/64 version 16.4):
    -in the setup set password as root, and port as 5432
    -in Stack builder choose PostgreSQL 16 on port 5432
    -under the dropdown Database driver choose psgODBC(64 bit)
    -everything not mentioned stays as default
-After the installation open pgAdmin4:
    -connect to the server using password root
    -in databases dropdown create a database called accounts
-With this the database setup is complete


---------------------------------------------------------------------

-in terminal: -use command git clone https://github.com/MatejaJakic1/myBudgetApplication.git
              -navigate to frontend folder and run nmp install 
-open cloned folder in VS Code
-run MybudgetApplication.java
-in terminal navigate to frontend folder and write ng serve --open

With that, this application should be up and running!