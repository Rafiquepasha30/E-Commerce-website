import React, { useContext } from 'react'
import { ShopContext } from '../ShopeContext'
import { useParams } from 'react-router-dom';
import Breadcrums from '../../Comp/Breadcrums/Breadcrums';
import ProductDisplay from '../../Comp/ProductDisplay/ProductDisplay';
import Description from '../../Comp/Description/Description';
import RelatedProduct from '../../Comp/RelatedProduct/RelatedProduct';

const Product = () => {
    const {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e)=>e.id === Number(productId))
  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <Description />
      <RelatedProduct/>
    </div>
  )
}

export default Product
