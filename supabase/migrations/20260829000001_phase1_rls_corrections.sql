-- Citylink Phase 1 RLS Corrections Migration
-- Implements explicit RLS policies for community_members, businesses, and categories
-- Adheres strictly to Database.md, Security.md, and Communities.md

-- =============================================================================
-- 1. CATEGORIES RLS POLICIES
-- =============================================================================

-- Anyone (public & authenticated) can view active categories
CREATE POLICY "Public read active categories" ON public.categories
    FOR SELECT USING (status = 'active');

-- Modification is restricted to server-side admin role / service_role


-- =============================================================================
-- 2. BUSINESSES RLS POLICIES
-- =============================================================================

-- Public can view active businesses; owners can view their business in any status
CREATE POLICY "Public read active businesses" ON public.businesses
    FOR SELECT USING (status = 'active' OR owner_id = auth.uid());

-- Authenticated users can register/create their own business
CREATE POLICY "Authenticated users can create business" ON public.businesses
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Only the owner can update their business details
CREATE POLICY "Owners can update own business" ON public.businesses
    FOR UPDATE USING (auth.uid() = owner_id);


-- =============================================================================
-- 3. COMMUNITY MEMBERS RLS POLICIES
-- =============================================================================

-- Membership visibility:
-- 1. Users can always view their own membership status.
-- 2. Public community members are visible to all.
-- 3. Private community members are visible ONLY to approved members or community creator.
CREATE POLICY "Read community members policy" ON public.community_members
    FOR SELECT USING (
        user_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.communities c
            WHERE c.id = community_members.community_id AND (
                c.privacy = 'public'
                OR c.creator_id = auth.uid()
            )
        )
        OR EXISTS (
            SELECT 1 FROM public.community_members my_mem
            WHERE my_mem.community_id = community_members.community_id
              AND my_mem.user_id = auth.uid()
              AND my_mem.status = 'approved'
        )
    );

-- Authenticated users can submit a join request or join for themselves
CREATE POLICY "Users can request or join community" ON public.community_members
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Members can update their own status (e.g. leaving), or community creator/admins can approve/manage roles
CREATE POLICY "Members or admins can update membership" ON public.community_members
    FOR UPDATE USING (
        user_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.communities c
            WHERE c.id = community_members.community_id AND c.creator_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM public.community_members admin_mem
            WHERE admin_mem.community_id = community_members.community_id
              AND admin_mem.user_id = auth.uid()
              AND admin_mem.role IN ('owner', 'admin')
              AND admin_mem.status = 'approved'
        )
    );

-- Members can leave, or creator/admins can remove/ban
CREATE POLICY "Members or admins can delete membership" ON public.community_members
    FOR DELETE USING (
        user_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.communities c
            WHERE c.id = community_members.community_id AND c.creator_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM public.community_members admin_mem
            WHERE admin_mem.community_id = community_members.community_id
              AND admin_mem.user_id = auth.uid()
              AND admin_mem.role IN ('owner', 'admin')
              AND admin_mem.status = 'approved'
        )
    );
