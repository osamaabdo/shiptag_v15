-- PAYMENTS & BILLING FUNCTIONAL GROUP
-- Tables: transactions, wallets, wallet_transactions, bank_details, billing_addresses, coupons, coupon_usages

CREATE TABLE public.transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount numeric NOT NULL,
  currency text DEFAULT 'SAR'::text,
  status text NOT NULL CHECK (status = ANY (ARRAY['payment_initiated'::text, 'payment_success'::text, 'payment_failed'::text, 'refunded'::text])),
  debit_type text CHECK (debit_type = ANY (ARRAY['bank'::text, 'wallet'::text])),
  debit_id uuid,
  credit_type text CHECK (credit_type = ANY (ARRAY['wallet'::text, 'order'::text, 'bank'::text])),
  credit_id uuid,
  payment_gateway text,
  gateway_transaction_id text,
  gateway_response_code text,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT transactions_pkey PRIMARY KEY (id)
);

CREATE TABLE public.wallets (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  name text NOT NULL,
  balance numeric NOT NULL DEFAULT 0.00,
  currency text DEFAULT 'SAR'::text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT wallets_pkey PRIMARY KEY (id)
);

CREATE TABLE public.wallet_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  wallet_id uuid NOT NULL,
  transaction_id uuid NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['credit'::text, 'debit'::text])),
  amount numeric NOT NULL,
  balance_before numeric,
  balance_after numeric,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT wallet_transactions_pkey PRIMARY KEY (id),
  CONSTRAINT wallet_transactions_wallet_id_fkey FOREIGN KEY (wallet_id) REFERENCES public.wallets(id),
  CONSTRAINT wallet_transactions_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id)
);

CREATE TABLE public.bank_details (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  profile_type text CHECK (profile_type = ANY (ARRAY['freelancer'::text, 'company'::text])),
  user_id uuid NOT NULL,
  bank_name text,
  account_name text,
  iban text,
  swift_code text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT bank_details_pkey PRIMARY KEY (id),
  CONSTRAINT bank_details_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.billing_addresses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  profile_type text CHECK (profile_type = ANY (ARRAY['freelancer'::text, 'company'::text])),
  user_id uuid NOT NULL,
  country text,
  city text,
  region text,
  street text,
  postal_code text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT billing_addresses_pkey PRIMARY KEY (id),
  CONSTRAINT billing_addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.coupons (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  discount_type text NOT NULL CHECK (discount_type = ANY (ARRAY['percentage'::text, 'fixed'::text])),
  discount_value numeric NOT NULL,
  usage_limit integer,
  used_count integer DEFAULT 0,
  max_usage_per_user integer,
  min_order_value numeric,
  plan_id uuid,
  expires_at timestamp with time zone,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT coupons_pkey PRIMARY KEY (id),
  CONSTRAINT coupons_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id)
);

CREATE TABLE public.coupon_usages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  coupon_id uuid,
  user_id uuid NOT NULL,
  used_at timestamp with time zone DEFAULT now(),
  CONSTRAINT coupon_usages_pkey PRIMARY KEY (id),
  CONSTRAINT coupon_usages_coupon_id_fkey FOREIGN KEY (coupon_id) REFERENCES public.coupons(id)
);