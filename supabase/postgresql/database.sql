
drop table if exists docs;
create table docs (
  id uuid primary key REFERENCES auth.users(id) on delete cascade not null,
  user_id uuid REFERENCES auth.users(id) on DELETE CASCADE default auth.uid() not null,
  title text NOT NULL,
  description text,
  content text
);

drop table IF EXISTS subscriptions;
create table subscriptions (
  id uuid primary key REFERENCES auth.users(id) on delete cascade not null,
  email text unique NOT NULL
);

drop table IF EXISTS openaitoken;
create table openaitoken (
  id uuid primary key REFERENCES auth.users(id) on delete cascade not null,
  user_id uuid REFERENCES auth.users(id) on DELETE CASCADE default auth.uid() not null,
  token text NOT NULL
);

create or replace function public.check_if_email_exists(_email text)
returns text as
$$
declare
_mail text;
  begin
    select email into _mail from auth.users where email = _email;
    return _mail;
  end;
$$
language plpgsql security definer;

alter table public.docs ENABLE ROW LEVEL SECURITY;
alter table public.subscriptions ENABLE ROW LEVEL SECURITY;
alter table public.openaitoken ENABLE ROW LEVEL SECURITY;

-- Apply Row-Level Security policies for the 'subscriptions' table
CREATE POLICY "Enable insert for all users on subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (true);

-- Apply Row-Level Security policies for the 'docs' table
CREATE POLICY select_docs ON public.docs
    FOR SELECT
    USING (user_id = auth.uid() and auth.role() = 'authenticated');

CREATE POLICY insert_docs ON public.docs
    FOR INSERT
    WITH CHECK (user_id = auth.uid() and auth.role() = 'authenticated');

CREATE POLICY update_docs ON public.docs
    FOR UPDATE
    USING (user_id = auth.uid() and auth.role() = 'authenticated')
    WITH CHECK (user_id = auth.uid() and auth.role() = 'authenticated');

CREATE POLICY delete_docs ON public.docs
    FOR DELETE
    USING (user_id = auth.uid() and auth.role() = 'authenticated');

-- Apply Row-Level Security policies for the 'openaitoken' table
CREATE POLICY select_openaitoken ON public.openaitoken
    FOR SELECT
    USING (user_id = auth.uid() and auth.role() = 'authenticated');

CREATE POLICY insert_openaitoken ON public.openaitoken
    FOR INSERT
    WITH CHECK (user_id = auth.uid() and auth.role() = 'authenticated');

CREATE POLICY update_openaitoken ON public.openaitoken
    FOR UPDATE
    USING (user_id = auth.uid() and auth.role() = 'authenticated')
    WITH CHECK (user_id = auth.uid() and auth.role() = 'authenticated');

CREATE POLICY delete_openaitoken ON public.openaitoken
    FOR DELETE
    USING (user_id = auth.uid() and auth.role() = 'authenticated');