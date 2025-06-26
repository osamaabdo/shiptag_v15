-- PRODUCTS FUNCTIONAL GROUP
-- Tables: products, product_variants, product_images, product_inventory, product_sync_logs

CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  external_id text,
  platform_id uuid,
  name text NOT NULL,
  sku text,
  barcode text,
  description text,
  price numeric,
  currency text DEFAULT 'SAR'::text,
  hs_code text,
  country_of_origin text,
  weight_grams numeric,
  length_cm numeric,
  width_cm numeric,
  height_cm numeric,
  is_active boolean DEFAULT true,
  synced_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_platform_id_fkey FOREIGN KEY (platform_id) REFERENCES public.platforms(id)
);

CREATE TABLE public.product_variants (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid,
  user_id uuid,
  name text NOT NULL,
  sku text,
  barcode text,
  price numeric,
  weight_grams numeric,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT product_variants_pkey PRIMARY KEY (id),
  CONSTRAINT product_variants_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);

CREATE TABLE public.product_images (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid,
  user_id uuid,
  image_url text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT product_images_pkey PRIMARY KEY (id),
  CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);

CREATE TABLE public.product_inventory (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid,
  variant_id uuid,
  warehouse_id uuid,
  bin_id uuid,
  user_id uuid,
  batch_number text,
  expiration_date date,
  quantity integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT product_inventory_pkey PRIMARY KEY (id),
  CONSTRAINT product_inventory_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT product_inventory_variant_id_fkey FOREIGN KEY (variant_id) REFERENCES public.product_variants(id),
  CONSTRAINT product_inventory_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouses(id),
  CONSTRAINT product_inventory_bin_id_fkey FOREIGN KEY (bin_id) REFERENCES public.bins(id)
);

CREATE TABLE public.product_sync_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid,
  platform_id uuid,
  user_id uuid,
  synced_at timestamp with time zone DEFAULT now(),
  sync_status text,
  error_message text,
  CONSTRAINT product_sync_logs_pkey PRIMARY KEY (id),
  CONSTRAINT product_sync_logs_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT product_sync_logs_platform_id_fkey FOREIGN KEY (platform_id) REFERENCES public.platforms(id)
);

CREATE TABLE public.variant_batches (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  variant_id uuid,
  warehouse_id uuid,
  bin_id uuid,
  user_id uuid,
  batch_number text,
  expiration_date date,
  quantity integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT variant_batches_pkey PRIMARY KEY (id),
  CONSTRAINT variant_batches_variant_id_fkey FOREIGN KEY (variant_id) REFERENCES public.product_variants(id),
  CONSTRAINT variant_batches_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouses(id),
  CONSTRAINT variant_batches_bin_id_fkey FOREIGN KEY (bin_id) REFERENCES public.bins(id)
);