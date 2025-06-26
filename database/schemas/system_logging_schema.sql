-- SYSTEM & LOGGING FUNCTIONAL GROUP
-- Tables: audit_trail, logs, webhook_logs, translations

CREATE TABLE public.audit_trail (
  id integer NOT NULL DEFAULT nextval('audit_trail_id_seq'::regclass),
  user_id uuid,
  table_name text,
  record_id text,
  field_changed text,
  old_value text,
  new_value text,
  changed_at timestamp without time zone DEFAULT now(),
  CONSTRAINT audit_trail_pkey PRIMARY KEY (id)
);

CREATE TABLE public.logs (
  id integer NOT NULL DEFAULT nextval('logs_id_seq'::regclass),
  user_id uuid,
  table_name text,
  record_id uuid,
  action text,
  message text,
  level text,
  data jsonb,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT logs_pkey PRIMARY KEY (id)
);

CREATE TABLE public.webhook_logs (
  id integer NOT NULL DEFAULT nextval('webhook_logs_id_seq'::regclass),
  payload jsonb,
  source text,
  received_at timestamp without time zone DEFAULT now(),
  CONSTRAINT webhook_logs_pkey PRIMARY KEY (id)
);

CREATE TABLE public.translations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  field_name text NOT NULL,
  language_code text NOT NULL,
  translated_value text NOT NULL,
  CONSTRAINT translations_pkey PRIMARY KEY (id)
);