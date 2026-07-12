grant select, insert, update, delete on table public.boards to authenticated;

alter table public.boards enable row level security;

create policy "Users can create their own boards"
on public.boards
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can view their own boards"
on public.boards
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can update their own boards"
on public.boards
for update
to authenticated
using (auth.uid() = user_id);

create policy "Users can delete their own boards"
on public.boards
for delete
to authenticated
using (auth.uid() = user_id);
