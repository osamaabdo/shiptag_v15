-- ORDERS & SHIPPING FUNCTIONAL GROUP
-- Tables: orders, packages, order_charges, tracking_data

CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['manual'::text, 'e_invoice_send'::text, 'e_invoice_receive'::text, 'intl'::text])),
  from_address jsonb,
  to_address jsonb,
  platform_order_id uuid,
  status text DEFAULT 'draft'::text,
  description text,
  payment_status text,
  tracking_number text,
  declared_value numeric,
  cod_amount numeric,
  source text,
  carrier_id uuid,
  carrier_pickup_option text,
  carrier_delivery_option text,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id)
);

CREATE TABLE public.packages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  order_id uuid NOT NULL,
  length numeric NOT NULL,
  width numeric NOT NULL,
  height numeric NOT NULL,
  actual_weight numeric,
  dimensional_weight numeric,
  final_weight numeric,
  tracking_number text,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT packages_pkey PRIMARY KEY (id),
  CONSTRAINT packages_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id)
);

CREATE TABLE public.order_charges (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  order_id uuid NOT NULL,
  name text NOT NULL,
  type text,
  amount numeric NOT NULL,
  currency text DEFAULT 'SAR'::text,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT order_charges_pkey PRIMARY KEY (id),
  CONSTRAINT order_charges_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id)
);

CREATE TABLE public.tracking_data (
  id integer NOT NULL DEFAULT nextval('tracking_data_id_seq'::regclass),
  order_id uuid,
  status text,
  checkpoint text,
  timestamp timestamp without time zone,
  CONSTRAINT tracking_data_pkey PRIMARY KEY (id)
);