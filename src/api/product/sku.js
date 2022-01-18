import request from '@/utils/request'

//获取sku 列表数据
export const reqSkuList = (page,limit) =>request({
    url:`/admin/product/list/${page}/${limit}`,
    method:'get'
})

//上架
export const reqOnSave = (skuId) =>request({
    url:`/admin/product/onSale/${skuId}`,
    method:'get'
})

//下架
export const reqCancel = (skuId) =>request({
    url:`/admin/product/cancelSale/${skuId}`,
    method:'get'
})

//sku详情
export const reqSkuInfo = (skuId) =>request({
    url:`/admin/product/getSkuById/${skuId}`,
    method:'get'
})

