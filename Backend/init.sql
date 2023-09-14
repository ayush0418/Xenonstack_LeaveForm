SET ROLE 'postgres';

create type teamname_type AS ENUM ('CloudOps', 'PlatformOps', 'DevOps', 'ItOps', 'SRE'); 
create type reporter_type AS ENUM ('Sahil Bansal', 'Chitransh Sharma', 'Approva Sharma', 'Surya Kant'); 
create type leave_type AS ENUM ('Sick Leave', 'Casual Leave', 'Earned Leave'); 

create table if not exists employee (
	id SERIAL primary key, 
	emp_name text, 
	team_name teamname_type, 
	leave_from date, 
	leave_to date, 
	leave_type leave_type, 
	reporter reporter_type, 
	attachment bytea,
	status text default 'Pending'	
);
