import request from '@/utils/request'

//获取一级分类列表
export const reqCategory1List = ()=>request({url:'/admin/product/getCategory1',method:'get'})

//获取二级分类列表
export const reqCategory2List = (category1Id)=>request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'})

//获取三级分类列表
export const reqCategory3List = (category2Id)=>request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})

//
export const reqGetAttrList = (category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

//
export const reqAddOrUpdateAttr = (data) =>request({
    url:'/admin/product/saveAttrInfo',
    method:'post',
    data
})