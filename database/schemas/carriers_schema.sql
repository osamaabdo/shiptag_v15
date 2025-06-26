-- CARRIERS & SHIPPING SERVICES FUNCTIONAL GROUP
-- Tables: carriers, carrier_services, carrier_pickup_options, rates, costs

CREATE TABLE public.carriers (
  id integer NOT NULL DEFAULT nextval('carriers_id_seq'::regclass),
  code text NOT NULL UNIQUE,
  logo_url text,
  sorting integer DEFAULT 0,
  max_weight numeric,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT carriers_pkey PRIMARY KEY (id)
);

CREATE TABLE public.carrier_services (
  id integer NOT NULL DEFAULT nextval('carrier_services_id_seq'::regclass),
  carrier_id integer,
  name text NOT NULL,
  delivery_type text,
  region text,
  transit_time interval,
  delivery_days ARRAY,
  pickup_dates ARRAY,
  min_weight numeric,
  max_weight numeric,
  dimensional_limit jsonb,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT carrier_services_pkey PRIMARY KEY (id),
  CONSTRAINT carrier_services_carrier_id_fkey FOREIGN KEY (carrier_id) REFERENCES public.carriers(id)
);

CREATE TABLE public.carrier_pickup_options (
  id integer NOT NULL DEFAULT nextval('carrier_pickup_options_id_seq'::regclass),
  carrier_service_id integer,
  type text NOT NULL CHECK (type = ANY (ARRAY['pickup'::text, 'dropoff'::text])),
  availability text DEFAULT 'all'::text CHECK (availability = ANY (ARRAY['all'::text, 'partial'::text, 'city_specific'::text])),
  cities ARRAY,
  CONSTRAINT carrier_pickup_options_pkey PRIMARY KEY (id),
  CONSTRAINT carrier_pickup_options_carrier_service_id_fkey FOREIGN KEY (carrier_service_id) REFERENCES public.carrier_services(id)
);

CREATE TABLE public.rates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  from_country_iso character NOT NULL,
  from_zone text,
  to_country_iso character NOT NULL,
  to_zone text,
  carrier_code text NOT NULL,
  carrier_service_code text,
  from_weight numeric NOT NULL,
  to_weight numeric NOT NULL,
  rate_type text NOT NULL CHECK (rate_type = ANY (ARRAY['flat'::text, 'per_kg'::text])),
  rate_amount numeric NOT NULL,
  base_fee numeric,
  currency text NOT NULL DEFAULT 'SAR'::text,
  plan_id uuid NOT NULL,
  delivery_days integer,
  valid_from date,
  valid_to date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  user_id uuid,
  organization_id uuid,
  CONSTRAINT rates_pkey PRIMARY KEY (id),
  CONSTRAINT rates_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id)
);

CREATE TABLE public.costs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  from_country_iso character NOT NULL,
  from_zone text,
  to_country_iso character NOT NULL,
  to_zone text,
  carrier_code text NOT NULL,
  carrier_service_code text,
  from_weight numeric NOT NULL,
  to_weight numeric NOT NULL,
  rate_type text NOT NULL CHECK (rate_type = ANY (ARRAY['flat'::text, 'per_kg'::text])),
  cost_amount numeric NOT NULL,
  base_fee numeric,
  currency text NOT NULL DEFAULT 'SAR'::text,
  valid_from date,
  valid_to date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT costs_pkey PRIMARY KEY (id)
);