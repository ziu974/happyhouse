import Badge from "../components/ui/Badge.vue";
import BaseAlert from "../components/ui/BaseAlert.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import BaseCheckbox from "../components/ui/BaseCheckbox.vue";
import BaseInput from "../components/ui/BaseInput.vue";
import BasePagination from "../components/ui/BasePagination.vue";
import BaseProgress from "../components/ui/BaseProgress.vue";
import BaseRadio from "../components/ui/BaseRadio.vue";
import BaseSlider from "../components/ui/BaseSlider.vue";
import BaseSwitch from "../components/ui/BaseSwitch.vue";
import Card from "../components/ui/Card.vue";
import Icon from "../components/ui/Icon.vue";

export default {
  install(Vue) {
    Vue.component(Badge.name, Badge);
    Vue.component(BaseAlert.name, BaseAlert);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BasePagination.name, BasePagination);
    Vue.component(BaseProgress.name, BaseProgress);
    Vue.component(BaseRadio.name, BaseRadio);
    Vue.component(BaseSlider.name, BaseSlider);
    Vue.component(BaseSwitch.name, BaseSwitch);
    Vue.component(Card.name, Card);
    Vue.component(Icon.name, Icon);
  },
};
