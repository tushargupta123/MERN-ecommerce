import { useDispatch, useSelector } from "react-redux";
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectBrands, selectCategories, selectProductById, updateProductAsync } from "../../product/productSlice";
import { useForm } from "react-hook-form";
import {  useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductForm = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const params = useParams();
  const product = useSelector(selectProductById);
  const {
    register,
    handleSubmit,
    reset,
    setValue
  } = useForm();

  const [inboxBrand,setInboxBrand] = useState(false);
  const [inboxCategory,setInboxCategory] = useState(false);

  useEffect(() => {
    if(params.id){
      dispatch(fetchProductByIdAsync(params.id));
    }else{
      dispatch(clearSelectedProduct())
    }
  },[params.id,dispatch])

  useEffect(() => {
    if(product && params.id){
      setValue('title',product.title);
      setValue('description',product.description);
      setValue('price',product.price);
      setValue('stock',product.stock);
      setValue('discountPercentage',product.discountPercentage);
      setValue('thumbnail',product.thumbnail);
      setValue('image1',product.images[0]);
      setValue('image2',product.images[1]);
      setValue('image3',product.images[2]);
      setValue('image4',product.images[3]);
      setValue('brand',product.brand);
      setValue('category',product.category);
    }
  },[product,params.id,setValue]);;
  const navigate = useNavigate();

  const handleDelete = () => {
    const item= {...product};
    item.deleted = true;
    dispatch(updateProductAsync(item));
    navigate('/admin')
  }

  return (
    <div>
      <form noValidate onSubmit={handleSubmit((data) => {
        const product = {...data}
        product.images = [product.image1,product.image2,product.image3,product.image4]
        product.rating = 0;
        delete product['image1']
        delete product['image2']
        delete product['image3']
        delete product['image4']
        product.price = +product.price;   // this will convert string to number
        product.discoutPercentage = +product.discoutPercentage;   // this will convert string to number
        product.stock = +product.stock;   // this will convert string to number
        if(params.id){
          product.id = params.id;
          product.rating = product.rating || 0;
          dispatch(updateProductAsync(product));
        }else{
          dispatch(createProductAsync(product));
        }
        reset();
        navigate('/admin'); 
      })}>
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register('title')}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register('description')}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about your product.
                </p>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      {...register('price')}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      {...register('discountPercentage')}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      {...register('stock')}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register('thumbnail')}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register('image1')}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register('image2')}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("image3")}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="image4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 4
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("image4")}
                      id="image4"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                 {
                  inboxBrand ? 
                  <>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("brand")}
                      id="brand"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  </>:
                  <select {...register('brand')} onChange={(e) => { 
                    if (e.target.value === 'add') {
                      setInboxBrand(true);
                    }
                  }}>
                 <option value="">--- choose brand ---</option>
                 <option value="add" ><strong>ADD NEW BRAND</strong></option>
                  {brands.map(brand => {
                    return(
                      <option value={brand.value}>{brand.label}</option>
                    )
                  })}
                 </select>
                 }
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="categories"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Categories
                </label>
                <div className="mt-2">
                {
                  inboxCategory ? 
                  <>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("category")}
                      id="category"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  </>:
                  <select {...register('category')} onChange={(e) => { 
                    if (e.target.value === 'add') {
                      setInboxCategory(true);
                    }
                  }}> 
                   <option value="">--- choose category ---</option>
                 <option value="add" ><strong>ADD NEW CATEGORY</strong></option>
                  {categories.map(category => {
                    return(
                      <option value={category.value}>{category.label}</option>
                    )
                  })}
                 </select>
                }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => {reset(); navigate('/admin')}}
          >
            Cancel
          </button>
          {
            product && 
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
          }
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
