import {
    Button,
    Icon,
    Tab,
    Tabs,
    Tabbar,
    TabbarItem
} from 'vant';

export default {
    install(Vue) {
        Vue.use(Button);
        Vue.use(Icon);
        Vue.use(Tab);
        Vue.use(Tabs);
        Vue.use(Tabbar);
        Vue.use(TabbarItem);
    }
}