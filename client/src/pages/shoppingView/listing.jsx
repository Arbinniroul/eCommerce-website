import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import ProductFilter from "./filter"; // No curly braces needed
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllFilteredProduct } from "../../store/shop/productslice/index";
import ShoppingProductTile from "@/components/shoppingView/product-tile";

function ShoppingListing() {
  const dispatch = useDispatch();
  const[filters,setFilters]=useState(null);

  const [sort,setSort]=useState(null);
  const { productList } = useSelector((state) => state.shopProducts);

  useEffect(() => {
    dispatch(fetchAllFilteredProduct());
  }, [dispatch]);
function handleSort({value}){
setSort(value);
}
  console.log(productList, "productList");

  function handleFilter(getSectionId, getCurrentOption) {
    console.log(getSectionId, getCurrentOption);
    // Add your filter logic here
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-4ß gap-6 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All products</h2>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">
              {productList?.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="z-3">
                <Button variant="outline" size="sm" className="flex items-center gap-1 hover:bg-gray-100 border-gray-300 rounded-lg">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="bottom"
                className="w-[200px] bg-white rounded-lg shadow-md border border-gray-200 z-40"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                      onSelect={() => console.log(`Sort by ${sortItem.label}`)}
                      className="hover:bg-gray-100 p-2 rounded-md"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile key={productItem._id} product={productItem} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
