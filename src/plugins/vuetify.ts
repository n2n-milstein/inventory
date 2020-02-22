import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, { iconfont: "md", theme: { primary: colors.blue } });

export default new Vuetify({});
