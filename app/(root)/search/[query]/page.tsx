import ProductCard from '@/components/ProductCard'
import { getSearchedProduct } from '@/lib/actions/actions'
import React from 'react'

const SearchPage = async ({params} : { params : { query : string }}) => {
  const searchedProducts = await getSearchedProduct(params.query) 
  const decodedQuery = decodeURIComponent(params.query)
  return (
    <div className="py-5 px-10 ">
      <p className="text-heading3-bold my-10">
        Search Results for {decodedQuery}
      </p>
      {!searchedProducts || searchedProducts.length === 0 && (
        <div className="text-center">
          <h1 className="text-heading3-bold my-5">No results found</h1>
          </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchedProducts?.map((product:any) => (
          <ProductCard  key={product._id} product={product}/>
        ))}
        </div>
    </div>
  )
}

export default SearchPage
