import { hash } from '@node-rs/bcrypt';
import { Cuisine, Neighborhood } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RESTAURANT_NAMES = [
  'Gastown Sushi',
  'Yaletown Ramen',
  'Kitsilano Izakaya',
  'Robson Street Bistro',
  'Granville Island Seafood',
  'West End Cafe',
  'Downtown Fusion',
  'Chinatown Dumpling House',
  'Commercial Drive Italian',
  'Main Street Tapas',
  'Mount Pleasant Brunch',
  'False Creek Grill',
  'Coal Harbour Sushi',
  'Davie Street Noodle',
  'Gastown Gastropub',
  'Yaletown Steakhouse',
  'Kitsilano Vegan',
  'Robson Street Korean',
  'Granville Island Oyster',
  'West End Thai',
  'Downtown Indian',
  'Chinatown Hot Pot',
  'Commercial Drive Greek',
  'Main Street Mexican',
  'Mount Pleasant Pizza',
  'False Creek Sushi',
  'Coal Harbour Seafood',
  'Davie Street Ramen',
  'Gastown Burger',
  'Yaletown Pasta',
  'Kitsilano Sushi',
  'Robson Street Thai',
  'Granville Island Cafe',
  'West End Izakaya',
  'Downtown Korean',
  'Chinatown Dim Sum',
  'Commercial Drive Indian',
  'Main Street Italian',
  'Mount Pleasant Sushi',
  'False Creek Ramen',
  'Coal Harbour Steak',
  'Davie Street Pizza',
  'Gastown Seafood',
  'Yaletown Fusion',
  'Kitsilano Thai',
  'Robson Street Sushi',
  'Granville Island Bistro',
  'West End Korean',
  'Downtown Izakaya',
  'Chinatown Noodle',
];

const DESCRIPTIONS = [
  'A cozy restaurant in the heart of Vancouver, serving authentic cuisine with a modern twist. Our chefs use only the freshest local ingredients to create memorable dining experiences.',
  'Experience the true taste of Vancouver in our elegant dining space. We specialize in traditional dishes prepared with contemporary techniques.',
  'Our restaurant offers a unique blend of traditional and innovative cuisine. Enjoy our carefully curated menu in a sophisticated atmosphere.',
  'Step into our world of culinary excellence where tradition meets innovation. Our dishes are crafted with passion and precision.',
  'Discover the art of dining at our restaurant. We take pride in serving dishes that celebrate the seasons and local ingredients.',
  'Our restaurant is a celebration of culinary traditions. Each dish tells a story of our rich cultural heritage.',
  'Experience the harmony of flavors at our restaurant. We combine traditional techniques with modern presentation.',
  'Our chefs create culinary masterpieces using the finest seasonal ingredients. Join us for an unforgettable dining experience.',
  'We bring the authentic taste to your table. Our menu features both classic and innovative dishes.',
  'Enjoy the perfect balance of tradition and innovation at our restaurant. Our dishes are crafted with care and attention to detail.',
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

async function generateMockData() {
  const businesses = [];

  for (let i = 1; i <= 50; i++) {
    const password = `password${i}`;
    const hashedPassword = await hash(password, 10);

    businesses.push({
      name: RESTAURANT_NAMES[i - 1],
      email: `restaurant${i}@example.com`,
      password: hashedPassword,
      support_single: true,
      support_group: true,
      capacity_of_group: Math.floor(Math.random() * 6) + 2,
      cuisine_kind: getRandomElement(Object.values(Cuisine)),
      price_level: Math.floor(Math.random() * 3) + 1,
      neighborhood: getRandomElement(Object.values(Neighborhood)),
      zip_code: 'V6B 1H8',
      address: `${i} ${getRandomElement(['W', 'E'])} Hastings St, Vancouver, BC`,
      tel: `604-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}-${String(
        Math.floor(Math.random() * 9999),
      ).padStart(4, '0')}`,
      total_seats: Math.floor(Math.random() * 50) + 20,
      payment_method: 'Credit Card, Cash',
      parking: 'Available',
      description: getRandomElement(DESCRIPTIONS),
    });
  }

  const sql = generateSQL(businesses);
  console.log(sql);
}

function generateSQL(
  businesses: {
    name: string;
    email: string;
    password: string;
    support_single: boolean;
    support_group: boolean;
    capacity_of_group: number;
    cuisine_kind: string;
    price_level: number;
    neighborhood: string;
    zip_code: string;
    address: string;
    tel: string;
    total_seats: number;
    payment_method: string;
    parking: string;
    description: string;
  }[],
) {
  const sql = `
    -- Reset sequences
    ALTER SEQUENCE business_id_seq RESTART WITH 1;
    ALTER SEQUENCE business_hours_id_seq RESTART WITH 1;
    ALTER SEQUENCE business_hours_label_id_seq RESTART WITH 1;
    ALTER SEQUENCE business_tag_id_seq RESTART WITH 1;
    ALTER SEQUENCE course_id_seq RESTART WITH 1;

    -- Truncate tables (considering foreign key constraints)
    TRUNCATE TABLE business_hours CASCADE;
    TRUNCATE TABLE business_hours_label CASCADE;
    TRUNCATE TABLE business_tag CASCADE;
    TRUNCATE TABLE course CASCADE;
    TRUNCATE TABLE business CASCADE;

    -- Business table
    INSERT INTO business (
      name, email, password, support_single, support_group, 
      capacity_of_group, cuisine_kind, price_level, neighborhood,
      zip_code, address, tel, total_seats, payment_method,
      parking, description, created_at, updated_at
    ) VALUES
    ${businesses
      .map(
        (b) => `(
      '${b.name}',
      '${b.email}',
      '${b.password}',
      ${b.support_single},
      ${b.support_group},
      ${b.capacity_of_group},
      '${b.cuisine_kind}',
      ${b.price_level},
      '${b.neighborhood}',
      '${b.zip_code}',
      '${b.address}',
      '${b.tel}',
      ${b.total_seats},
      '${b.payment_method}',
      '${b.parking}',
      '${b.description}',
      NOW(),
      NOW()
    )`,
      )
      .join(',\n')};

    -- BusinessHours table
    INSERT INTO business_hours (
      business_id, 
      day_of_week, 
      hours_kind, 
      is_open, 
      open_time, 
      close_time,
      created_at,
      updated_at
    )
    SELECT 
      id, 
      day_of_week::"DayOfWeek", 
      'LUNCH', 
      true, 
      '11:00', 
      '14:00',
      NOW(),
      NOW()
    FROM business
    CROSS JOIN (VALUES 
      ('MON'),
      ('TUE'),
      ('WED'),
      ('THU'),
      ('FRI'),
      ('SAT'),
      ('SUN')
    ) AS days(day_of_week);

    -- Add dinner hours
    INSERT INTO business_hours (
      business_id, 
      day_of_week, 
      hours_kind, 
      is_open, 
      open_time, 
      close_time,
      created_at,
      updated_at
    )
    SELECT 
      id, 
      day_of_week::"DayOfWeek", 
      'DINNER', 
      true, 
      '17:00', 
      '22:00',
      NOW(),
      NOW()
    FROM business
    CROSS JOIN (VALUES 
      ('MON'),
      ('TUE'),
      ('WED'),
      ('THU'),
      ('FRI'),
      ('SAT'),
      ('SUN')
    ) AS days(day_of_week);

    -- BusinessTag table
    INSERT INTO business_tag (business_id, name, created_at, updated_at)
    SELECT 
      id, 
      unnest(ARRAY['LUNCH', 'DINNER', 'RESERVATION_REQUIRED']), 
      NOW(),
      NOW()
    FROM business;

    -- Course table
    INSERT INTO course (
      business_id,
      name,
      time_duration,
      created_at,
      updated_at
    )
    SELECT 
      id,
      'Lunch Course',
      90,
      NOW(),
      NOW()
    FROM business;

    INSERT INTO course (
      business_id,
      name,
      time_duration,
      created_at,
      updated_at
    )
    SELECT 
      id,
      'Dinner Course',
      120,
      NOW(),
      NOW()
    FROM business;
  `;

  // SQLをファイルに出力
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const outputPath = path.join(__dirname, 'mock_data.sql');
  fs.writeFileSync(outputPath, sql);

  return sql;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateMockData().catch(console.error);
}
