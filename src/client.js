import { createClient } from "@supabase/supabase-js";

const URL = "https://jjrojuhiksjbwvilgwew.supabase.co";
const API_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqcm9qdWhpa3NqYnd2aWxnd2V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzODYwMzksImV4cCI6MjAzMzk2MjAzOX0.fSP5U_RVu1fZcpHxkVg2pCtiF8xfEu3gusgD9aoLw-I";

export const supabase = createClient(URL, API_KEY);
