/// <reference types="vite/client" />
// ts只支持导出导入模块，但是vue不是模块，我们需要申明一下vue是个模块，ts可以导入
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}