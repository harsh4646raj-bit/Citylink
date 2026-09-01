-- Seed Data for Pilot Cities
INSERT INTO public.cities (id, name, slug, state, country, latitude, longitude, status)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'Muzaffarpur', 'muzaffarpur', 'Bihar', 'India', 26.1209, 85.3647, 'active'),
    ('a0000000-0000-0000-0000-000000000002', 'Patna', 'patna', 'Bihar', 'India', 25.5941, 85.1376, 'active'),
    ('a0000000-0000-0000-0000-000000000003', 'Delhi NCR', 'delhi-ncr', 'Delhi', 'India', 28.7041, 77.1025, 'active')
ON CONFLICT (slug) DO NOTHING;
