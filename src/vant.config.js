import {
    Button,
    Cell,
    CellGroup,
    DropdownMenu,
    DropdownItem,
    Icon,
    IndexBar,
    IndexAnchor,
    Image as VanImage,
    Lazyload,
    List,
    Rate,
    Search,
    Tab,
    Tabs,
    Tabbar,
    TabbarItem,
    TreeSelect,
    ShareSheet,
} from 'vant';

export default {
    install(Vue) {
        Vue.use(Button);
        Vue.use(Cell);
        Vue.use(CellGroup);
        Vue.use(DropdownMenu);
        Vue.use(DropdownItem);
        Vue.use(Icon);
        Vue.use(IndexBar);
        Vue.use(IndexAnchor);
        Vue.use(List);
        Vue.use(Lazyload);
        Vue.use(Rate);
        Vue.use(Search);
        Vue.use(Tab);
        Vue.use(Tabs);
        Vue.use(Tabbar);
        Vue.use(TabbarItem);
        Vue.use(TreeSelect);
        Vue.use(VanImage);
        Vue.use(ShareSheet);
    }
}