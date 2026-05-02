-- Lock down SECURITY DEFINER functions: only postgres/db triggers can call them
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- has_role is used inside RLS policies — those run as the policy owner, not the caller,
-- so we just need postgres + service_role to be able to invoke it directly.
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO postgres, service_role;

-- Set search_path on touch_updated_at to silence the mutable search_path warning
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;