import {
    Button,
    Cell,
    CellGroup,
    Icon,
    Tab,
    Tabs,
    Tabbar,
    TabbarItem,
    Image as VanImage,
    Lazyload,
    List,
    IndexBar,
    IndexAnchor,
<<<<<<< HEAD
    Rate 
=======
    Search
>>>>>>> 3eac6026fb6ebfa16670ee27ce44dfb522c1e7cf
} from 'vant';

export default {
    install(Vue) {
        Vue.use(Button);
        Vue.use(Cell);
        Vue.use(CellGroup);
        Vue.use(List);
        Vue.use(Lazyload);
        Vue.use(Icon);
        Vue.use(Tab);
        Vue.use(Tabs);
        Vue.use(Tabbar);
        Vue.use(TabbarItem);
        Vue.use(VanImage);
        Vue.use(IndexBar);
        Vue.use(IndexAnchor);
<<<<<<< HEAD
        Vue.use(Rate);
=======
        Vue.use(Search);
>>>>>>> 3eac6026fb6ebfa16670ee27ce44dfb522c1e7cf
    }
}