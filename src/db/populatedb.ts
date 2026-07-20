#! /usr/bin/env node

import { Client } from 'pg';
import 'dotenv/config';

const SQL = `

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 100 ) NOT NULL,
  description TEXT,
  image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 100 ) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  category_id INT REFERENCES categories(id) ON DELETE CASCADE,
  image_url VARCHAR(255)
);

TRUNCATE items, categories RESTART IDENTITY CASCADE;

INSERT INTO categories (name, description, image_url) 
VALUES
  ('shoes', 'Hiking shoes and boots', 'https://media.istockphoto.com/id/1422989430/photo/leather-hiking-boots-walking-on-mountain-trail.jpg?s=612x612&w=is&k=20&c=t3DWOFsDfAbe7q_c9DTH_V1ruLoja5SC55drtPoNvzo=' ),
  ('clothing', 'hiking clothing', 'https://media.istockphoto.com/id/1210366042/photo/padded-jacket-isolated.jpg?s=612x612&w=is&k=20&c=Dw7PfWWkIGYmFdVOlPRoYuTDYhSFR-Jp4nbiuXuj5cU='),
  ('backpacks', 'backpacks for day trips and overnight trips', 'https://media.istockphoto.com/id/925356980/photo/hiking-equipment-backpack-and-boots-on-top-of-mountain.jpg?s=612x612&w=is&k=20&c=dDW7L48GS1DkUs4dJTVEDmckpBnuVddpPgAfSFeB4B4='),
  ('tents', 'tents for all occasions', 'https://media.istockphoto.com/id/2283552072/photo/glowing-camping-tent-under-the-night-sky.jpg?s=612x612&w=is&k=20&c=IPotpRZBi6U_qRpxOi8H7eqeGnSueb5lNu7bGfgx2BY=');

  INSERT INTO items (name, description, price, quantity, category_id, image_url) 
  VALUES
  ('Saloman XA Pro 3D', 'The Salomon XA Pro 3D (now in its V9 generation) is a legendary, high-performance hybrid shoe designed for trail running, rugged hiking, and arduous outdoor adventures.', 150.00, 12, 1, 'https://media.istockphoto.com/id/483802874/photo/close-up-of-running-shoes-on-white-background.jpg?s=612x612&w=is&k=20&c=qkCHF4liZYTC77SAtGKwvs0w6JzfzXxfuos8u3OEbog='),
  ('TNF puffer', 'Yellow puffer jacket for cold weather', 79.99, 15, 2, 'https://media.istockphoto.com/id/2229677645/photo/single-bright-yellow-puffer-jacket-for-cold-rainy-weather-isolated-on-white-background.jpg?s=612x612&w=is&k=20&c=csuwCYg5bVmLeW16ls5SnABlv5TLymLccmoyN8hbqc0='),
  ('Osprey 45L backpack', '45L backpack meant for overnight trips', 105.99, 5, 3, 'https://media.istockphoto.com/id/161952203/photo/hiking-backpack.jpg?s=612x612&w=is&k=20&c=OCr_sdr-v5mB-IIgcbrrUK44v11x6o9PEDTAARv2njE='),
  ('Coleman tent', '2 person tent, made for 3 seasons', 59.99, 25, 4, 'https://media.istockphoto.com/id/1076755038/photo/camping-tent.jpg?s=612x612&w=is&k=20&c=KFuM-8PaZWsCYKjSwqZZSqQh8o5SFlRV5VYIvt9qf8I=');
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();
