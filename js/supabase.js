// ======================================================
// Supabase Configuration
// ======================================================

import { createClient }
from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
"https://vbuogidvjvgdsystxuda.supabase.co";

const SUPABASE_ANON_KEY =
"YOUR_PUBLISHABLE_KEY";

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// Bucket Name
const BUCKET_NAME = "portfolio-files";

export {
    supabase,
    BUCKET_NAME
};
