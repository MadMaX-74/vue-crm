declare const M :any;
export default {
    install(Vue :any, options :any) {
        Vue.prototype.$message = function(text :string) {
            M.toast({ html: text })
        }

        Vue.prototype.$error = function(html :string) {
            M.toast({ html: `[Ошибка]: ${html}` })
        }
    }
}