-- USERS & AUTHENTICATION FUNCTIONAL GROUP
-- Tables: users, organizations, user_invitations, personal_profiles, freelancer_profiles, company_profiles, addresses

CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  auth_user_id uuid NOT NULL UNIQUE,
  organization_id uuid,
  user_type USER-DEFINED NOT NULL,
  full_name text,
  email text NOT NULL,
  phone text,
  role text NOT NULL DEFAULT 'member'::text,
  invited_by uuid,
  is_invitation_accepted boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),
  CONSTRAINT users_invited_by_fkey FOREIGN KEY (invited_by) REFERENCES public.users(id)
);

CREATE TABLE public.organizations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  plan_id uuid,
  CONSTRAINT organizations_pkey PRIMARY KEY (id),
  CONSTRAINT organizations_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id)
);

CREATE TABLE public.user_invitations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  email text,
  phone text,
  delivery_method text DEFAULT 'email'::text CHECK (delivery_method = ANY (ARRAY['email'::text, 'sms'::text, 'whatsapp'::text, 'manual'::text])),
  invited_by uuid NOT NULL,
  role text NOT NULL DEFAULT 'member'::text,
  token text NOT NULL UNIQUE,
  is_accepted boolean DEFAULT false,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_invitations_pkey PRIMARY KEY (id),
  CONSTRAINT user_invitations_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),
  CONSTRAINT user_invitations_invited_by_fkey FOREIGN KEY (invited_by) REFERENCES public.users(id)
);

CREATE TABLE public.personal_profiles (
  user_id uuid NOT NULL,
  government_id_number text NOT NULL,
  government_id_image text NOT NULL,
  CONSTRAINT personal_profiles_pkey PRIMARY KEY (user_id),
  CONSTRAINT personal_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.freelancer_profiles (
  user_id uuid NOT NULL,
  id_number text NOT NULL,
  certificate_number text NOT NULL,
  document_image text NOT NULL,
  id_image text NOT NULL,
  CONSTRAINT freelancer_profiles_pkey PRIMARY KEY (user_id),
  CONSTRAINT freelancer_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.company_profiles (
  user_id uuid NOT NULL,
  cr_number text NOT NULL,
  unified_national_number text NOT NULL,
  cr_document text NOT NULL,
  id_image text NOT NULL,
  vat_id text,
  CONSTRAINT company_profiles_pkey PRIMARY KEY (user_id),
  CONSTRAINT company_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.addresses (
  id integer NOT NULL DEFAULT nextval('addresses_id_seq'::regclass),
  user_id uuid,
  title text,
  name text,
  phone text,
  city text,
  country text,
  zip text,
  address_1 text,
  address_2 text,
  lat numeric,
  lng numeric,
  is_default boolean DEFAULT false,
  type text NOT NULL DEFAULT 'destination'::text,
  CONSTRAINT addresses_pkey PRIMARY KEY (id)
);