// Vue main application
import Vue from 'vue'

// Assets (.css, .scss or .js) to be imported
// CSS
import 'element-ui/lib/theme-chalk/index.css'
import 'codemirror/lib/codemirror.css'

// SCSS
import './assets/scss/_main.scss'

// JS
import './assets/js/fontawesome-all.min.js'

// Vue packages to be imported
import ElementUI from 'element-ui'

import VueCodemirror from 'vue-codemirror'
// Element Internalization
import locale from 'element-ui/lib/locale/lang/pt-br'
import lodash from 'lodash' // Lodash Helper lib

// Vue packages to be used
Vue.use(ElementUI, {locale})
Vue.use(VueCodemirror)
Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })
