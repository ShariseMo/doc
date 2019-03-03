> Vue-router

```
// router.js
{
    path: '/member',
    component:Layout,
    redirect:'/member/asset',
    name: 'member',
    meta: {title: '会员', icon: '#icon-member'},
    children:[
        {
            path: 'asset',
            name: 'asset',
            component: _import('member/asset/index'),
            meta: {title: '会员资产'}
        },
        {
            path: 'detail/:id',
            name: 'detail',
            hidden:true,
            component:_import('member/detail/index'),
            meta: { title: '会员详情' }
        }
    ]
}

// /member/asset.vue
// 替换当前页面直接打开
this.$router.push({name:'detail' , params: {id: id}})

// 新页面打开
let routerData = this.$router.resolve({ path: '/member/detail/'+id})
window.open(routerData.href, '_blank')
```
