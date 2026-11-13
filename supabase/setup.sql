-- Pega TODO este archivo en Supabase → SQL Editor → Run. Se puede ejecutar más de una vez sin problema.

-- 1) Correo autorizado para editar. Cámbialo aquí si entrarás al /admin con otro correo.
create or replace function public.is_admin() returns boolean
language sql stable as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = lower('enmajvg1406@gmail.com')
$$;

-- 2) Contenido del sitio (una sola fila). Cualquiera puede leer; solo tú puedes escribir.
create table if not exists public.site_content (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
drop policy if exists "lectura publica" on public.site_content;
drop policy if exists "admin inserta" on public.site_content;
drop policy if exists "admin actualiza" on public.site_content;
drop policy if exists "admin borra" on public.site_content;
create policy "lectura publica" on public.site_content for select using (true);
create policy "admin inserta" on public.site_content for insert to authenticated with check (public.is_admin());
create policy "admin actualiza" on public.site_content for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin borra" on public.site_content for delete to authenticated using (public.is_admin());

-- 3) Carpeta de imágenes y videos (pública para verlas; solo tú puedes subir/borrar). Límite 50 MB por archivo.
insert into storage.buckets (id, name, public, file_size_limit)
values ('portafolio', 'portafolio', true, 52428800)
on conflict (id) do update set public = true, file_size_limit = 52428800;
drop policy if exists "admin sube" on storage.objects;
drop policy if exists "admin cambia" on storage.objects;
drop policy if exists "admin borra archivos" on storage.objects;
create policy "admin sube" on storage.objects for insert to authenticated with check (bucket_id = 'portafolio' and public.is_admin());
create policy "admin cambia" on storage.objects for update to authenticated using (bucket_id = 'portafolio' and public.is_admin());
create policy "admin borra archivos" on storage.objects for delete to authenticated using (bucket_id = 'portafolio' and public.is_admin());
