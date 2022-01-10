import request from '@/utils/request'

//获取品牌列表
export const reqTradeMarkList = (page,limit)=>request({
    url:`/admin/product/baseTrademark/${page}/${limit}`,
    method:'get'
})

//添加或修改品牌信息 
//根据是否有ID判断 有ID为修改，无则为添加
export const reqAddOrUpdateTradeMark = (tradeMark) =>{
    if(tradeMark.id){
        return request({
            url:'/admin/product/baseTrademark/update',
            method:'put',
            data:tradeMark
        })
    }else{
        return request({
            url:'/admin/product/baseTrademark/save',
            method:'post',
            data:tradeMark
        })
    }
}

//删除品牌
export const reqDeleteTradeMark = (id)=>request({
    url:`/admin/product/baseTrademark/remove/${id}`,
    method:'delete'
})