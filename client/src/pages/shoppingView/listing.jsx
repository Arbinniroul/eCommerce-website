import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllFilteredProduct, getProductDetails } from "../../store/shop/productslice/index";
import ShoppingProductTile from "@/components/shoppingView/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shoppingView/product-details";
import ProductFilter from "./filter"; // Importing the filter component
import { addToCart, fetchCartItems } from "@/store/shop/cartslice";
import { useToast } from "@/hooks/use-toast";

// Helper function to create query parameters from filter data
function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

export default function ShoppingListing() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [sort, setSort] = useState({});
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { toast } = useToast();

  function handleAddToCart(getCurrentProductId) {
    console.log({ userId: user?.id, productId: getCurrentProductId, quantity: 1 });

    if (user && user?.id) {
      dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
        .then((data) => {
          if (data.payload.success) {
            dispatch(fetchCartItems({ userId:user?.id}));
            toast({
              title: 'Product is Added to cart',
            });
          }
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      console.error("User is not logged in.");
    }
  }

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(fetchAllFilteredProduct({ filterParams: filters, sortParams: sort }));
  }, [dispatch, sort, filters]);

  function handleSort(value) {
    setSort(value);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(getProductDetails(getCurrentProductId));
  }

  function handleFilter(getSectionId, getCurrentOption) {
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

    sessionStorage.setItem("filters", JSON.stringify(cpyFilter));
    setFilters(cpyFilter);
  }

  useEffect(() => {
    const storedFilters = JSON.parse(sessionStorage.getItem("filters") || "{}");
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
    if (productDetails?._id) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 py-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-white rounded-lg shadow-md w-full h-full px-5">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm ">{productList?.length} Products</span>
            {/* Sort Dropdown Component */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="flex items-center gap-1 border border-gray-300 rounded-md hover:bg-gray-100 hover:text-black px-2 py-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-44 z-40 bg-white border border-gray-300 rounded-md shadow-lg"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                      className="hover:bg-gray-100 p-2 rounded-md z-50 text-gray-800"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {productList?.length > 0 ? (
            productList.map((product) => (
              <ShoppingProductTile
                handleAddToCart={handleAddToCart}
                key={product.id}
                handleGetProductDetails={handleGetProductDetails}
                product={product}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </div>
  );
}
