export function getEmptyMessage(
  searchTerm?: string,
  selectedCategoryId?: string | number,
): string {
  if (searchTerm && selectedCategoryId) {
    return "Tidak ada kata yang cocok dengan pencarian dan kategori yang Anda pilih.";
  } else if (searchTerm) {
    return "Tidak ada kata yang cocok dengan pencarian Anda.";
  } else if (selectedCategoryId) {
    return "Tidak ada kata dalam kategori ini.";
  } else {
    return "Kamus masih kosong.";
  }
}

export function getEmptyMessageForSavedPage(
  searchTerm?: string,
  hasAnyItemsSavedOverall?: boolean,
): string {
  if (!hasAnyItemsSavedOverall) {
    return "Anda belum menyimpan item apapun. Tekan ikon bookmark pada entri kamus atau percakapan untuk menyimpannya.";
  }

  if (searchTerm) {
    return "Tidak ada item tersimpan yang cocok dengan pencarian Anda.";
  }

  return "";
}
