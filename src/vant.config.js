import {
    Button,
    Cell,
    CellGroup,
    DropdownMenu,
    DropdownItem,
    Form,
    Field,
    Icon,
    IndexBar,
    IndexAnchor,
    Image as VanImage,
    Lazyload,
    List,
    NavBar,
    NoticeBar,
    Rate,
    Search,
    Tab,
    Tabs,
    Tabbar,
    TabbarItem,
    Toast,
    TreeSelect,
    ShareSheet,
    Sticky,
    Swipe,
    SwipeItem,
    Empty
} from 'vant';

export default {
    install(Vue) {
        Vue.use(Button);
        Vue.use(Cell);
        Vue.use(CellGroup);
        Vue.use(DropdownMenu);
        Vue.use(DropdownItem);
        Vue.use(Form);
        Vue.use(Field);
        Vue.use(Icon);
        Vue.use(IndexBar);
        Vue.use(IndexAnchor);
        Vue.use(List);
        Vue.use(Lazyload);
        Vue.use(NavBar);
        Vue.use(NoticeBar);
        Vue.use(Rate);
        Vue.use(Search);
        Vue.use(Tab);
        Vue.use(Tabs);
        Vue.use(Tabbar);
        Vue.use(TabbarItem);
        Vue.use(Toast);
        Vue.use(TreeSelect);
        Vue.use(VanImage);
        Vue.use(ShareSheet);
        Vue.use(Swipe);
        Vue.use(SwipeItem);
        Vue.use(Sticky);
        Vue.use(Empty);
        Vue.use(Swipe);
        Vue.use(SwipeItem);
    }
}