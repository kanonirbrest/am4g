## Decision record template by Yury.S.

### Change text editor mode from inline to textField mode.
May, 2023

### Status
accepted, implemented.

### Context

We should implement Offers Feature, it gives as ability to select offers under the products.

### Decision

We decided to change data-structure. Earlier we had the following data structures to work with products
We had map `productId` to `alias`
```
step2.product = {
    id: alias
}
```
but now we transform it to the following structure
```
step2.product = {
    id: {
      alias: 'test-alias',
      offers: ['offerIdentifier1','offerIdentifier2'],
    }
}
```
also we have `allProducts` structure and same structure with `initialAllProducts`<em>(to handle modified state)</em>
now product has nested property calls 
```
products = [
{
    price, 
    title,
    offers: [{price, localizedPrice, identifier}]
}]
```
if we are talking about add product menu, we are using additional nesting, now we can choose product using the following path
```
menu
│
└───add product
│   │   
│   └───select product
│       │       
│       │   productC    
│       │   productB    
│       └───productA
                │   price  
                │   localizedPrice  
                └───offerA
                    │    price
                    │    duration  
                    └─── offerCount
```
To handle render logic for html we are using `data-offers` attribute and `.multiple` class. The logic is following:

We have `offerOptions` array, the option value is `offer.identifier + '&' + productId`, `&` - separator. When we click `+ add variant` we add 
in `languages => fields => text array` new item, that consist of 
```
{
    text: 'html copied from [0] default item', 
    offers: [`offer.identifier&productId`] - array of offerOptions, //add it for data offers as well
}
```
Inside getLangScreen method we also add `data-offers` prop to html elements on each language.
On mobile phone side we get all available offers, we sort them and compare with each item that has `data-offers` prop. 
We select it looking through all children 
of `.multiple` selector and compare `data-offers` with available offers (that we get in `loadProducts` method), 
and then we show only variants that has equal `data-offers` values, if we don't have matches default variant.

On preview we are using extra span element with `.visible/.unVisible` class that we are getting based on `text.offers` prop, and global `OfferStateContext` context value.

## Consequences
structure became more difficult, and mapping in step2.products make us to constantly find Index of offer in product to access property.
It makes parsing product data-attr more complicated, for ex.
we had `product.price` now we have in some places `product.offer.price` and `productId` is also separated by dots.
