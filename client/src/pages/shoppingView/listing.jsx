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
import { fetchAllFilteredProduct, getProductDetails } from "../../store/shop/productslice/index";
import ShoppingProductTile from "@/components/shoppingView/product-tile";
import e from "cors";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shoppingView/product-details";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',');
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);

    }
  }
  return queryParams.join('&');
}
function ShoppingListing() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [sort, setSort] = useState({});
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(fetchAllFilteredProduct({ filterParams: filters, sortParams: sort }));
  }, [dispatch, sort, filters]);
  function handleSort(value) {
    console.log(value);
    setSort(value);
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(getProductDetails(getCurrentProductId));
      console.log('Product details',productDetails);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    console.log(getSectionId, getCurrentOption);
    let cpyFilter = { ...filters };

    if (!cpyFilter[getSectionId]) {

      cpyFilter[getSectionId] = [getCurrentOption];
    } else {

      const indexOfCurrentOption = cpyFilter[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {

        cpyFilter[getSectionId].push(getCurrentOption);
      } else {

        cpyFilter[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    sessionStorage.setItem('filters', JSON.stringify(cpyFilter));


    setFilters(cpyFilter);
  }


  useEffect(() => {
    const storedFilters = JSON.parse(sessionStorage.getItem('filters') || '{}');
    if (storedFilters) {
      setFilters(storedFilters);
    }
  }, []);


  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    console.log("Product details:", productDetails);
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
      console.log("Opening dialog");
    }
  }, [productDetails]);
  
  return (
    <div className="  grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-4ß gap-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All products</h2>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">
              {productList?.length} products
            </span>
            <DropdownMenu >
              <DropdownMenuTrigger asChild className="z-3">
                <Button size="sm" className="flex items-center gap-1 hover:bg-gray-100 border-gray-300 rounded-lg">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="bottom"

                className="w-[300px] rounded-lg shadow-md border border-gray-200 z-40 text-black bg-white"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem

                      value={sortItem.id}
                      key={sortItem.id}
                      className="hover:bg-gray-100 text-black p-2 rounded-md w-full  mx-5"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>


              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid relative grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} key={productItem._id} product={productItem} />
            ))
          ) : (
            <p>No products available</p>
          )}
    
      
     
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
      </div> 
    </div>
    
  );
}

export default ShoppingListing;
