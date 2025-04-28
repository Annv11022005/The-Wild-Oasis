import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://ezflcwrgszsfdpgtcahr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Zmxjd3Jnc3pzZmRwZ3RjYWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDM3NzgsImV4cCI6MjA2MDQ3OTc3OH0.W5yZv4-a1oaQTUIHDFcvsMxBg2EYO80OvsfFAQrknxc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
