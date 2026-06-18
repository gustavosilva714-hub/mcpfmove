import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xlrvtcoczskvexgqllsv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhscnZ0Y29jenNrdmV4Z3FsbHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwMTAxNzgsImV4cCI6MTkzMjU4NjE3OH0.48N6OGbfXLh6xP-T_rMa4PAqB18FsYaFQzZX_Tz99m0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function adicionarFilme() {
  try {
    const { data, error } = await supabase
      .from('movies')
      .insert([
        {
          title: 'JORGE DA CAPADÓCIA',
          video_url: 'https://mega.nz/embed/DuoTDKgT#521UGQv-bpyYqzLRKZk0KcB4uqlGtNSdcvb04fJQ5zA',
          description: 'Filme sobre Jorge da Capadócia',
          genre: 'Drama',
          class_series: 'Geral',
          duration: 90,
          year: 2026,
          is_award_winner: false,
          thumbnail_url: 'https://via.placeholder.com/400x300?text=Jorge',
          created_by: 'admin',
        }
      ])
      .select();

    if (error) {
      console.error('❌ Erro ao adicionar filme:', error.message);
    } else {
      console.log('✅ Filme adicionado com sucesso!');
      console.log('Dados:', JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('❌ Erro:', err.message);
  }
}

adicionarFilme();
