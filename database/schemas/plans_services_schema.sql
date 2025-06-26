-- PLANS & SERVICES FUNCTIONAL GROUP
-- Tables: plans, services, plan_services, user_service_overrides

CREATE TABLE public.plans (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  description text,
  price numeric NOT NULL,
  billing_cycle text NOT NULL CHECK (billing_cycle = ANY (ARRAY['monthly'::text, 'yearly'::text])),
  duration_in_months integer DEFAULT 1,
  is_active boolean DEFAULT true,
  upgrade_to ARRAY,
  trial_period_days integer,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT plans_pkey PRIMARY KEY (id)
);

CREATE TABLE public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  CONSTRAINT services_pkey PRIMARY KEY (id)
);

CREATE TABLE public.plan_services (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  plan_id uuid,
  service_id uuid,
  enabled boolean DEFAULT true,
  CONSTRAINT plan_services_pkey PRIMARY KEY (id),
  CONSTRAINT plan_services_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id),
  CONSTRAINT plan_services_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id)
);

CREATE TABLE public.user_service_overrides (
  user_id uuid NOT NULL,
  service_id uuid NOT NULL,
  is_enabled boolean NOT NULL,
  reason text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_service_overrides_pkey PRIMARY KEY (user_id, service_id),
  CONSTRAINT user_service_overrides_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT user_service_overrides_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id)
);