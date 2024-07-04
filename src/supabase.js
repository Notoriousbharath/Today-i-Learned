
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://gkuxigwuirxwibgzqgeu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdXhpZ3d1aXJ4d2liZ3pxZ2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5OTQwMzUsImV4cCI6MjAyNzU3MDAzNX0.QiKeYrZZMw9_RQDwVsdrdw6LZNOxaNOyMNCJSFUYEWU'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

