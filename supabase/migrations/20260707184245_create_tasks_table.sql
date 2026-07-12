create type task_status as enum (
    'todo',
    'in_progress',
    'done'
);

create table public.boards (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    user_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

create table public.tasks (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    status task_status not null default 'todo',
    board_id uuid not null references public.boards(id) on delete cascade,
    created_at timestamptz not null default now()
);

