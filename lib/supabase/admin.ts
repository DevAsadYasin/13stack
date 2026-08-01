import "server-only";
import { createClient } from "@supabase/supabase-js";
import { assertServerSupabaseConfig } from "@/lib/supabase/env";

type AdminClient = ReturnType<typeof createAdminClient>;

function createAdminClient() {
  const { url, serviceRoleKey, schema } = assertServerSupabaseConfig();

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: { schema },
  });
}

let adminClient: AdminClient | null = null;

export function getSupabaseAdmin() {
  if (!adminClient) {
    adminClient = createAdminClient();
  }
  return adminClient;
}
