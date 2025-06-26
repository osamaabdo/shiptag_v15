-- PLATFORM INTEGRATIONS FUNCTIONAL GROUP
-- Tables: platforms, platform_integrations, platform_orders

CREATE TABLE public.platforms (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  logo_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT platforms_pkey PRIMARY KEY (id)
);

CREATE TABLE public.platform_integrations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  platform_id uuid,
  external_shop_id text,
  access_token text,
  refresh_token text,
  token_expires_at timestamp with time zone,
  shop_name text,
  connected_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true,
  CONSTRAINT platform_integrations_pkey PRIMARY KEY (id),
  CONSTRAINT platform_integrations_platform_id_fkey FOREIGN KEY (platform_id) REFERENCES public.platforms(id)
);

CREATE TABLE public.platform_orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  platform_id uuid NOT NULL,
  external_order_id text NOT NULL,
  status text,
  customer_name text,
  customer_address_id uuid,
  items jsonb NOT NULL,
  raw_payload jsonb,
  synced_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT platform_orders_pkey PRIMARY KEY (id)
);