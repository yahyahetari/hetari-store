import ProductsList from "@/components/ProductsList";
import { connectToDB } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { Category } from "@/models/Category";

export async function getServerSideProps({ params }) {
  await connectToDB();
  const { query } = params;

  // استخدام التعبير العادي للبحث الجزئي
  const searchRegex = new RegExp(query, 'i');

  // البحث في المنتجات
  const searchedProducts = await Product.find(
    { title: searchRegex },
    null,
    { sort: { '_id': -1 } }
  );

  // البحث في الفئات
  const searchedCategories = await Category.find({ name: searchRegex });

  // جمع المنتجات التي تنتمي للفئات التي تم العثور عليها
  const productsInCategories = await Product.find({
    category: { $in: searchedCategories.map(cat => cat._id) }
  });

  // دمج النتائج وإزالة التكرارات
  const allProducts = [...searchedProducts, ...productsInCategories];
  const uniqueProducts = Array.from(new Set(allProducts.map(p => p._id.toString())))
    .map(_id => allProducts.find(p => p._id.toString() === _id));

  return {
    props: {
      searchedProducts: JSON.parse(JSON.stringify(uniqueProducts)),
      query,
    },
  };
}

export default function SearchPage({ searchedProducts, query }) {
  return (
    <div className="py-5 px-10">
      <h1 className="text-xl font-semibold my-2">
        {`نتائج البحث عن "${query.replace(/"/g, '&quot;')}"`}
      </h1>
      {searchedProducts.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold my-2">لم يتم العثور على نتائج</h2>
        </div>
      ) : (
        <ProductsList products={searchedProducts} />
      )}
    </div>
  );
}
