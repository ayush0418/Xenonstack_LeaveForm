SET ROLE 'postgres';

-- USE THIS IF WANTED ENUM DATA TYPE IN THE DATABASE. I REMOVED THIS BECAUSE OF ADDING AN EXCEL SHEET INTO THE DATABASE THAT CONTAIN VARIOUS NAMES

-- create type teamname_type AS ENUM ('CloudOps', 'PlatformOps', 'DevOps', 'ItOps', 'SRE'); 
-- create type reporter_type AS ENUM ('Sahil Bansal', 'Chitransh Sharma', 'Approva Sharma', 'Surya Kant'); 
-- create type leave_type AS ENUM ('Sick Leave', 'Casual Leave', 'Earned Leave'); 

-- create table if not exists employee (
-- 	id SERIAL primary key, 
-- 	emp_name text, 
-- 	team_name teamname_type, 
-- 	leave_from date, 
-- 	leave_to date, 
-- 	leave_type leave_type, 
-- 	reporter reporter_type, 
-- 	attachment bytea,
-- 	status text default 'Pending'	
-- );


--  USE THIS IF NOT WANTED ENUM DATATYPE IN THE DATABASE. used this for sending excel sheet data using python
create table if not exists employee (
	id SERIAL primary key, 
	emp_name text, 
	team_name text, 
	leave_from date, 
	leave_to date, 
	leave_type text, 
	reporter text, 
	attachment bytea,
	status text default 'Pending'	
);

create table if not exists notifications (
	id  integer , 
	reporter text, 
	status text default 'Pending'
);

CREATE OR REPLACE FUNCTION update_notifications()
  RETURNS TRIGGER AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO notifications (id, reporter)
		VALUES (NEW.id, NEW.reporter);
	ELSIF TG_OP = 'UPDATE' THEN
		UPDATE notifications
		SET reporter = NEW.reporter
		WHERE id = OLD.id;
	END IF;
  	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER formdata_notifications_trigger
AFTER INSERT OR UPDATE ON public.employee
FOR EACH ROW
EXECUTE FUNCTION update_notifications();

