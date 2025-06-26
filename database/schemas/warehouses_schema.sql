-- WAREHOUSES & INVENTORY FUNCTIONAL GROUP
-- Tables: warehouses, bins

CREATE TABLE public.warehouses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  address text,
  city text,
  country text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT warehouses_pkey PRIMARY KEY (id)
);

CREATE TABLE public.bins (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  warehouse_id uuid,
  user_id uuid,
  code text NOT NULL,
  zone text,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT bins_pkey PRIMARY KEY (id),
  CONSTRAINT bins_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouses(id)
);