import supabase from './supabase';

export async function getSettings() {
  let { data, error } = await supabase.from('settings').select('*').single();
  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }
  return data;
}

// Chúng tôi mong đợi một đối tượng newSetting trông giống như {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    // Chỉ có MỘT hàng cài đặt và nó có ID=1, vì vậy đây là hàng đã cập nhật
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }
  return data;
}
