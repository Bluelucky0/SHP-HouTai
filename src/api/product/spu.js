import request from '@/utils/request'

//获取spu属性列表 
export const reqSpuList = (page,limit,category3Id) =>request({
    url:`/admin/product/${page}/${limit}`,
    method:'get',
    params:{category3Id}
})

//获取spu的列表
export const reqSpu = (spuId) =>request({
    url:`/admin/product/getSpuById/${spuId}`,
    method:'get'
})

//获取spu品牌的列表
export const reqTrademarkList = ()=>request({
    url:'/admin/product/baseTrademark/getTrademarkList',
    method:'get'
})

//获取spu图片的列表
export const reqSpuImageList = (spuId) =>request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:'get'
})

//获取销售属性的列表 /admin/product/baseSaleAttrList
export const reqSaleAttrList = () =>request({
    url:`/admin/product/baseSaleAttrList`,
    method:'get'
})

//新增或修改保存时发请求
export const reqAddOrUpdateSpu = (spuInfo) =>{
    //所带的参数中如果带鱼ID，说明是修改数据的保存
    //没有ID时为添加数据中请求
    if(spuInfo.id){
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }else{
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
    }
}

//删除spu
export const reqDeleteSpu = (spuId) =>request({
    url:`/admin/product/deleteSpu/${spuId}`,
    method:'delete'
})

//获取图片数据 /admin/product/spuImageList/{spuId}
// export const reqSpuImageList =(spuId) =>request({
//     url:`/admin/product/spuImageList/${spuId}`,
//     method:'get'
// })

//获取销售属性列表 /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) =>request({
    url:`/admin/product/spuSaleAttrList/${spuId}`,
    method:'get'
})

//获取平台属性列表 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id,category2Id,category3Id) =>request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:'get'
})

//添加sku保存
export const reqAddSku = (skuInfo) =>request({
    url:'/admin/product/saveSkuInfo',
    method:'post',
    data:skuInfo
})

//获取查看所有sku列表的sku列表
export const reqSkuList = (spuId) =>request({
    url:`/admin/product/findBySpuId/${spuId}`,
    method:'get'
})