import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://bvzechfnubgziryxfkit.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2emVjaGZudWJnemlyeXhma2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxODI0NTAsImV4cCI6MTk4Mzc1ODQ1MH0.b0Kh0qwL2V4mBl_gGHvlL7DyRESXGpn5Dcn5_d2vtfU";

const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService(){
    return{
        getAllVideos(){
            return supabase.from('video')
            .select('*')
        }
    }
}