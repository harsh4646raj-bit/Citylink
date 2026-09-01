-- Citylink Master Initial Schema Migration
-- Matches Database.md, Security.md, and PRD.md

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Cities
CREATE TABLE IF NOT EXISTS public.cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    state TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'India',
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    boundary JSONB,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'coming_soon')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cities_slug ON public.cities(slug);
CREATE INDEX IF NOT EXISTS idx_cities_status ON public.cities(status);

-- 2. Profiles (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    home_city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
    privacy TEXT NOT NULL DEFAULT 'public' CHECK (privacy IN ('public', 'private')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_home_city ON public.profiles(home_city_id);

-- 3. Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    icon TEXT,
    type TEXT NOT NULL CHECK (type IN ('business', 'service', 'marketplace', 'community', 'job')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_type ON public.categories(type);

-- 4. Communities
CREATE TABLE IF NOT EXISTS public.communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    type TEXT NOT NULL DEFAULT 'interest' CHECK (type IN ('city', 'college', 'society', 'interest', 'other')),
    privacy TEXT NOT NULL DEFAULT 'public' CHECK (privacy IN ('public', 'private')),
    city_id UUID NOT NULL REFERENCES public.cities(id) ON DELETE RESTRICT,
    creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    cover_image TEXT,
    avatar TEXT,
    rules TEXT,
    verification_required BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'suspended')),
    member_count INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_communities_city ON public.communities(city_id);
CREATE INDEX IF NOT EXISTS idx_communities_privacy ON public.communities(privacy);
CREATE INDEX IF NOT EXISTS idx_communities_slug ON public.communities(slug);

-- 5. Community Members
CREATE TABLE IF NOT EXISTS public.community_members (
    community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'moderator', 'member')),
    status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('requested', 'approved', 'rejected', 'banned', 'left')),
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (community_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_community_members_user ON public.community_members(user_id);
CREATE INDEX IF NOT EXISTS idx_community_members_status ON public.community_members(status);

-- 6. Posts
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    city_id UUID NOT NULL REFERENCES public.cities(id) ON DELETE RESTRICT,
    community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    post_type TEXT NOT NULL DEFAULT 'text' CHECK (post_type IN ('text', 'media', 'announcement', 'poll')),
    visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'community', 'private')),
    location TEXT,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'archived', 'deleted', 'flagged')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_city ON public.posts(city_id);
CREATE INDEX IF NOT EXISTS idx_posts_community ON public.posts(community_id);
CREATE INDEX IF NOT EXISTS idx_posts_author ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);

-- 7. Businesses
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    city_id UUID NOT NULL REFERENCES public.cities(id) ON DELETE RESTRICT,
    address TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    phone TEXT,
    website TEXT,
    logo TEXT,
    cover_image TEXT,
    verification_status TEXT NOT NULL DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_businesses_city ON public.businesses(city_id);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON public.businesses(category_id);
CREATE INDEX IF NOT EXISTS idx_businesses_owner ON public.businesses(owner_id);

-- 8. Group Deals (Primary Feature)
CREATE TABLE IF NOT EXISTS public.group_deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    city_id UUID NOT NULL REFERENCES public.cities(id) ON DELETE RESTRICT,
    community_id UUID REFERENCES public.communities(id) ON DELETE SET NULL,
    service_id UUID,
    title TEXT NOT NULL,
    description TEXT,
    target_participants INTEGER NOT NULL CHECK (target_participants > 0),
    current_participants INTEGER NOT NULL DEFAULT 1 CHECK (current_participants >= 0),
    target_price NUMERIC(10, 2),
    deadline TIMESTAMPTZ NOT NULL,
    preferred_date DATE,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('draft', 'open', 'target_reached', 'offers_available', 'offer_selected', 'booking', 'in_progress', 'completed', 'cancelled', 'disputed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_group_deals_city ON public.group_deals(city_id);
CREATE INDEX IF NOT EXISTS idx_group_deals_status ON public.group_deals(status);
CREATE INDEX IF NOT EXISTS idx_group_deals_deadline ON public.group_deals(deadline);

-- 9. Group Deal Participants
CREATE TABLE IF NOT EXISTS public.group_deal_participants (
    group_deal_id UUID NOT NULL REFERENCES public.group_deals(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    address TEXT,
    preferred_slot TEXT,
    status TEXT NOT NULL DEFAULT 'joined' CHECK (status IN ('joined', 'confirmed', 'cancelled')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (group_deal_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_deal_participants_deal ON public.group_deal_participants(group_deal_id);
CREATE INDEX IF NOT EXISTS idx_deal_participants_user ON public.group_deal_participants(user_id);

-- 10. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    reference_type TEXT,
    reference_id UUID,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, read_at);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_deal_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Cities: Anyone can view active cities
CREATE POLICY "Public read active cities" ON public.cities
    FOR SELECT USING (status = 'active');

-- Profiles: Public profiles are visible to all; users can update their own
CREATE POLICY "Public read profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Communities: Public communities visible to all; private visible to approved members
CREATE POLICY "Public read public communities" ON public.communities
    FOR SELECT USING (privacy = 'public' OR creator_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.community_members cm
        WHERE cm.community_id = id AND cm.user_id = auth.uid() AND cm.status = 'approved'
    ));

CREATE POLICY "Authenticated users can create communities" ON public.communities
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Community owners/admins can update community" ON public.communities
    FOR UPDATE USING (auth.uid() = creator_id);

-- Posts: Public posts readable by all; private community posts only readable by members
CREATE POLICY "Read posts policy" ON public.posts
    FOR SELECT USING (
        visibility = 'public'
        OR author_id = auth.uid()
        OR (community_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM public.community_members cm
            WHERE cm.community_id = posts.community_id AND cm.user_id = auth.uid() AND cm.status = 'approved'
        ))
    );

CREATE POLICY "Authenticated users can create posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = author_id);

-- Group Deals: Visible in city context
CREATE POLICY "Read group deals" ON public.group_deals
    FOR SELECT USING (status != 'draft' OR creator_id = auth.uid());

CREATE POLICY "Authenticated users can create group deals" ON public.group_deals
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

-- Group Deal Participants: Addresses protected, only visible to creator, participant, or admin
CREATE POLICY "Read deal participants" ON public.group_deal_participants
    FOR SELECT USING (
        user_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.group_deals gd
            WHERE gd.id = group_deal_id AND gd.creator_id = auth.uid()
        )
    );

CREATE POLICY "Users can join group deals" ON public.group_deal_participants
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave group deals" ON public.group_deal_participants
    FOR UPDATE USING (auth.uid() = user_id);

-- Notifications: Only visible to owner
CREATE POLICY "Users can read own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

-- =============================================================================
-- SEED DATA (Pilot City: Muzaffarpur)
-- =============================================================================
INSERT INTO public.cities (id, name, slug, state, country, latitude, longitude, status)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'Muzaffarpur', 'muzaffarpur', 'Bihar', 'India', 26.1209, 85.3647, 'active'),
    ('a0000000-0000-0000-0000-000000000002', 'Patna', 'patna', 'Bihar', 'India', 25.5941, 85.1376, 'active'),
    ('a0000000-0000-0000-0000-000000000003', 'Delhi NCR', 'delhi-ncr', 'Delhi', 'India', 28.7041, 77.1025, 'active')
ON CONFLICT (slug) DO NOTHING;
