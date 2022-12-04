import localizeFilter from "@/filters/localize.filter";

export default  {
    install(Vue: any) :any{
        Vue.prototype.$title = function (titleKey: any) :any{
            const appName :string = process.env.VUE_APP_TITLE
            return `${localizeFilter(titleKey)} | ${appName}`
        }
    }
}
