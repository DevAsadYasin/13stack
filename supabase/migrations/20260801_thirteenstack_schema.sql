
create schema if not exists thirteenstack;

grant usage on schema thirteenstack to anon, authenticated, service_role;

grant all on all tables in schema thirteenstack to service_role;
grant all on all routines in schema thirteenstack to service_role;
grant all on all sequences in schema thirteenstack to service_role;

alter default privileges for role postgres in schema thirteenstack
  grant all on tables to service_role;
alter default privileges for role postgres in schema thirteenstack
  grant all on routines to service_role;
alter default privileges for role postgres in schema thirteenstack
  grant all on sequences to service_role;
create table if not exists thirteenstack.consultations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  source text not null default '13stack',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists consultations_created_at_idx
  on thirteenstack.consultations (created_at desc);

create index if not exists consultations_email_idx
  on thirteenstack.consultations (email);
create table if not exists thirteenstack.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default '13stack',
  lists text[] not null default array['studio_news']::text[],
  opt_in_studio boolean not null default true,
  opt_in_skedvio boolean not null default false,
  consent_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint newsletter_subscribers_email_key unique (email)
);

create index if not exists newsletter_subscribers_lists_idx
  on thirteenstack.newsletter_subscribers using gin (lists);

alter table thirteenstack.consultations enable row level security;
alter table thirteenstack.newsletter_subscribers enable row level security;
