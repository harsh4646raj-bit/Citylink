-- Phase 5: User Follows & Social Connections Migration
-- Matches Database.md Section 8 and Security.md

CREATE TABLE IF NOT EXISTS public.user_follows (
    follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);

CREATE INDEX IF NOT EXISTS idx_user_follows_follower ON public.user_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_user_follows_following ON public.user_follows(following_id);

-- Enable RLS
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;

-- 1. Anyone can view follow relationships (public connection graph)
CREATE POLICY "Public read user_follows" ON public.user_follows
    FOR SELECT USING (true);

-- 2. Authenticated users can follow others (preventing self-follows)
CREATE POLICY "Users can follow others" ON public.user_follows
    FOR INSERT WITH CHECK (
        auth.uid() = follower_id 
        AND follower_id != following_id
    );

-- 3. Authenticated users can unfollow
CREATE POLICY "Users can unfollow" ON public.user_follows
    FOR DELETE USING (auth.uid() = follower_id);
