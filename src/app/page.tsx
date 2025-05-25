import DictionaryPageContainer from "@/modules/dictionary/components/dictionary-page-container";
import { fetchDictionaryEntries } from "@/modules/dictionary/api/dictionary"; // Import the function
import { DictionaryEntry } from "@/domain/dictionary"; // Import the type
import { getAllCategories } from "@/modules/search-filter/api/categories";

export default async function DictionaryPage() {
  const categories = await getAllCategories();
  const allEntries: DictionaryEntry[] = await fetchDictionaryEntries(
    {},
    "force-cache",
  );

  return (
    <DictionaryPageContainer
      categories={categories}
      initialEntries={allEntries}
    />
  );
}
