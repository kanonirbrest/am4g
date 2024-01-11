# Text Editor
## We are using https://www.tiny.cloud/ editor with plugins

Decided to use this editor because it has lots of free features and online/offilne mode.
Specific react support. AHuge api for custom menu-s and buttons, ability to create own plugins.

## What do we use?
- Quickbars plugin for toolbar
- Noneditable plugin for template var-s
- addNestedMenuItem to create custom menu https://www.tiny.cloud/docs/tinymce/6/custom-nested-menu-items/

# Template var-s


- to create template var-l we add class Noneditable and then to style it we should make it editable and then
  after changes we should change it back to non-editable. We use `onBeforeExecCommand` andd` onObjectSelected`. We should handle toolbar as well (we use 2 different toolbars for it).
- We add aliases, to make it more comfortable for users to work with template var-s.
- Template var-l consist of productAlias[property]. for example {testProduct.price}.
- When we show it on preview we should replace template var-s. We use `parseTemplateVariable` method for it.
- We use data-attrs to make the work with template var-l on mobile html and on preview easier
  We use such attr-s as:
    - `data-field` for ex "price". Name of product property.
    - `data-productid` for ex "com.mosaic.platforms.sample.1m_7dt". Unique Id property of product.
    - `data-oldtemplate` for ex "12$". Test value that we show on preview. (maybe remove in future if possible, now we replace value using this field).
    - We send it to mobile phone in HTML page like `{{com.mosaic.platforms.sample.1m_7dt.productId}}`
    - and we add to each template var-l span class - `.template`

After we send HTMl to server we should make all template var-s not visible, we add css property to template class in mobile HTML css. We use amBridge.loadProducts method to get data with products from mobile phone.
After loadProducts we make template var-s visible.

We have map `productId` to `alias`
```
step2.product = {
    id: alias
}
```
We use {{alias.price}} format and use these map and data-productId to handle it.
We preserve only aliases between sessions and don't preserve test values.
We have an ability to change product alias aftewards.

| Library | README |
| ------ | ------ |
| TinyMce | [https://github.com/tinymce/tinymce/blob/develop/README.md] |

