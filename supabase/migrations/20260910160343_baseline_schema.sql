create table public.profiles (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  name character varying(50) not null,
  email character varying(255) not null,
  contact_number character varying(16) not null,
  profession character varying(50) not null,
  organisation_name character varying(100) not null,
  country_code text not null,
  constraint profiles_pkey primary key (id),
  constraint profiles_contact_number_key unique (contact_number),
  constraint profiles_email_key unique (email),
  constraint chk_name_length check ((char_length((name)::text) >= 2)),
  constraint chk_contact_number check (
    ((contact_number)::text ~ '^\+[0-9]{8,15}$'::text)
  ),
  constraint chk_profession check (
    (
      (profession)::text = any (
        (
          array[
            'Working Professional'::character varying,
            'Student'::character varying
          ]
        )::text[]
      )
    )
  ),
  constraint chk_organisation_name check ((char_length((organisation_name)::text) >= 2)),
  constraint chk_country_code check ((country_code ~ '^[A-Z]{2}$'::text)),
  constraint chk_email_format check (
    (
      (email)::text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text
    )
  )
) TABLESPACE pg_default;