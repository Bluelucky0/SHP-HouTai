import request from '@/utils/request'

//获取spu属性列表 
export const reqSpuList = (page,limit,category3Id) =>request({
    url:`/admin/product/${page}/${limit}`,
    method:'get',
    params:{category3Id}
})