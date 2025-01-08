import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import {
  Airplay, AppWindowMac, BabyIcon, ChevronLeftIcon, ChevronRightIcon,
  CloudLightning, Footprints, ShirtIcon, WashingMachine, WatchIcon
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProduct, getProductDetails } from '@/store/shop/productslice';
import ShoppingProductTile from '@/components/shoppingView/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cartslice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/shoppingView/product-details';

function ShoppingHome() {
  const {toast}=useToast();
  const slides = [bannerOne, bannerTwo, bannerThree];
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList,productDetails } = useSelector(state => state.shopProducts);
  const dispatch = useDispatch();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const navigate = useNavigate();
  const {user}=useSelector(state => state.auth);
  const categoriesWithIcons = [
    { id: "men", label: "Men", Icon: ShirtIcon },
    { id: "women", label: "Women", Icon: CloudLightning },
    { id: "kids", label: "Kids", Icon: BabyIcon },
    { id: "accessories", label: "Accessories", Icon: WatchIcon },
    { id: "footwear", label: "Footwear", Icon: Footprints },
  ];

  const brandsWithIcons = [
    { id: "nike", label: "Nike", Icon: ShirtIcon },
    { id: "adidas", label: "Adidas", Icon: WashingMachine },
    { id: "puma", label: "Puma", Icon: AppWindowMac },
    { id: "levi", label: "Levi's", Icon: CloudLightning },
    { id: "zara", label: "Zara", Icon: Airplay },
    { id: "h&m", label: "H&M", Icon: Footprints },
  ];
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId)
    dispatch(getProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    console.log({ userId: user?.id, productId: getCurrentProductId, quantity: 1 });

    if (user && user.id) {
      dispatch(addToCart({ userId: user.id, productId: getCurrentProductId, quantity: 1 }))
        .then((data) => {
          if (data.payload.success) {
            dispatch(fetchCartItems({ userId: user.id }));
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
 
  const handleNavigateToListingPage = (item, section) => {
    sessionStorage.removeItem('filters');
    const currentFilters = { [section]: [item.id] };
    sessionStorage.setItem('filters', JSON.stringify(currentFilters));
    navigate('/shop/listing');
  };

  const handleNextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => handleNextSlide(), 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(fetchAllFilteredProduct({ filterParams: {}, sortParams: 'price-lowtohigh' }));
  }, []); // Empty dependency array to avoid unnecessary re-renders
  // handleGetProductDetails(product?._id)
  useEffect(() => {
    if (productDetails?._id) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            alt={`Slide ${index + 1}`}
          />
        ))}
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80"
          onClick={handlePrevSlide}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80"
          onClick={handleNextSlide}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop By Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 px-6 lg:grid-cols-5 gap-4">
          {categoriesWithIcons.map(({ id, label, Icon }) => (
            <Card key={id} onClick={() => handleNavigateToListingPage({ id }, 'category')} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Icon className="w-12 h-12 text-primary mb-4" />
                <span className="font-bold">{label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop By Brand</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 px-6 lg:grid-cols-6 gap-4">
          {brandsWithIcons.map(({ id, label, Icon }) => (
            <Card key={id} onClick={() => handleNavigateToListingPage({ id }, 'brand')} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Icon className="w-12 h-12 text-primary mb-4" />
                <span className="font-bold">{label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Feature Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0 ? productList.map(product => (
              <ShoppingProductTile handleGetProductDetails={handleGetProductDetails}  handleAddToCart={handleAddToCart} key={product._id} product={product} />
            )) : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
    </div>
  );
}

export default ShoppingHome;
