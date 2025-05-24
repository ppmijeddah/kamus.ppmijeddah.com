export function getEmptyMessage(
  searchTerm?: string,
  selectedCategoryId?: string | number,
): string {
  if (searchTerm && selectedCategoryId) {
    return "Tidak ada kata tersimpan yang cocok dengan pencarian dan kategori yang Anda pilih.";
  } else if (searchTerm) {
    return "Tidak ada kata tersimpan yang cocok dengan pencarian Anda.";
  } else if (selectedCategoryId) {
    return "Tidak ada kata tersimpan dalam kategori ini.";
  } else {
    return "Belum ada kata tersimpan. Tambahkan dengan menekan ikon bookmark pada entri kamus.";
  }
}
