import SavedPageContainer from "@/modules/saved/components/saved-page-container";
import { getAllCategories } from "@/services/db/categories";

export default async function SavedPage() {
  const categories = await getAllCategories();

  return <SavedPageContainer categories={categories} />;
}
