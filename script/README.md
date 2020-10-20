Postgre

Connect by psql and run commands:
CREATE DATABASE <db-name>;
\connect <db-name>;
CREATE USER <user> WITH PASSWORD '<password>';
ALTER DATABASE <db-name> OWNER TO <user>;

Mysql

CREATE DATABASE <db-name>;
CREATE USER "<username>" IDENTIFIED BY "<password>";
GRANT USAGE ON *.* TO "<username>"@"%";
=> full quyen GRANT ALL privileges ON <db-name>.* TO "<username>"@"%";
⇒ read/write GRANT SELECT,INSERT,UPDATE,DELETE,CREATE ON <db-name>.* TO "<username>"@"%";
ALTER USER "<username>" IDENTIFIED WITH mysql_native_password BY "<password>";
FLUSH PRIVILEGES; 

Mongo

$ mongo --host 192.168.45.6:27017 -u root -p
use <database-name>
db.createUser(
 {
   user: "<user>",
   pwd: "<password>",
   roles: [ { role: "readWrite", db: "<database-name>" } ]
 }
) 
