--- Criar os schemas ---
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS roles;

-- DROP TABLE roles.roles
CREATE TABLE IF NOT EXISTS roles.roles (
	id serial NOT NULL,
	role varchar(20) NOT NULL,
    
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    
    CONSTRAINT pk_roles PRIMARY KEY (id)
);

-- inserts
INSERT INTO roles.roles(id, role) values(1, 'admin'), (2, 'default'), (3, 'tattoo_artist');

--- Tabela de usuários no schema 'users' ---
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    roles INTEGER[] NOT NULL DEFAULT ARRAY[2],

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,

    CONSTRAINT pk_users PRIMARY KEY (id)
);

--- Tabela de tatuadores no schema 'tattoo_artists' ---
CREATE TABLE IF NOT EXISTS public.tattoo_artists (
    id SERIAL NOT NULL,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    
    CONSTRAINT pk_tattoo_artists PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE IF NOT EXISTS public.studios (
	id serial NOT NULL,
	name varchar(200) NOT NULL,
    owner_id integer NOT NULL,

	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    
    CONSTRAINT pk_studios PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (owner_id) REFERENCES public.users(id)
);


CREATE TABLE tattoos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tattoo_artist_id INTEGER NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    image_extension VARCHAR(255) NOT NULL,
    image_link VARCHAR(255) NOT NULL,
    search_values TEXT NOT NULL,
    popularity INTEGER NOT NULL,
    image BYTEA NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    CONSTRAINT fk_tattoo_artist FOREIGN KEY (tattoo_artist_id) REFERENCES tattoo_artists(id) ON DELETE CASCADE
);


--- Add new column and configure old lines ---
ALTER TABLE public.tattoo_artists ADD COLUMN schedulings JSONB;
UPDATE tattoo_artists 
SET schedulings = '{
    "sunday": [],
    "monday": [],
    "tuesday": [],
    "wednesday": [],
    "thursday": [],
    "friday": [],
    "saturday": []
}'::JSONB;
ALTER TABLE tattoo_artists ALTER COLUMN schedulings SET NOT NULL;
ALTER TABLE  tattoo_artists ALTER COLUMN schedulings
SET DEFAULT '{
    "sunday": [],
    "monday": [],
    "tuesday": [],
    "wednesday": [],
    "thursday": [],
    "friday": [],
    "saturday": []
}'::JSONB;

create table tattoos_likes(
	id serial not null primary key,
	tattoo_id integer not null,
	user_id integer not null,
	
	constraint fk_tattoos foreign key (tattoo_id) references tattoos(id),
	constraint fk_user foreign key (user_id) references users(id)
);

CREATE OR REPLACE FUNCTION update_likes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE tattoos SET popularity = popularity + 1 WHERE id = NEW.tattoo_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE tattoos SET popularity = popularity - 1 WHERE id = OLD.tattoo_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tattoos_likes_insert_trigger
AFTER INSERT ON tattoos_likes
FOR EACH ROW
EXECUTE FUNCTION update_likes();

CREATE TRIGGER tattoos_likes_delete_trigger
BEFORE DELETE ON tattoos_likes
FOR EACH ROW
EXECUTE FUNCTION update_likes();