import DictionaryPageContainer from "@/modules/dictionary/components/dictionary-page-container";
import { getAllCategories } from "@/services/db/categories";

export default async function DictionaryPage() {
  const categories = await getAllCategories();

  return <DictionaryPageContainer categories={categories} />;
}
