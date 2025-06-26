-- GEOGRAPHY & ZONES FUNCTIONAL GROUP
-- Tables: countries, zones, zone_cities

CREATE TABLE public.countries (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  iso_code_2 character NOT NULL UNIQUE,
  iso_code_3 character NOT NULL UNIQUE,
  name text NOT NULL,
  phone_prefix text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT countries_pkey PRIMARY KEY (id)
);

CREATE TABLE public.zones (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  country_iso character NOT NULL,
  zone_code text NOT NULL,
  zone_name text NOT NULL,
  description text,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT zones_pkey PRIMARY KEY (id)
);

CREATE TABLE public.zone_cities (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  zone_id uuid NOT NULL,
  city_name text NOT NULL,
  city_code text,
  CONSTRAINT zone_cities_pkey PRIMARY KEY (id),
  CONSTRAINT zone_cities_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zones(id)
);