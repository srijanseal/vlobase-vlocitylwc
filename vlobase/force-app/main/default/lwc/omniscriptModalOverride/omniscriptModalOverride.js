import { LightningElement, track } from "lwc";
import { OmniscriptBaseMixin } from "vlocity_cmt/omniscriptBaseMixin";
import template from "./omniscriptModalOverride.html";

export default class OmniscriptModalOverride extends OmniscriptBaseMixin(
  LightningElement
) {
  @track modalVisible = false;
  @track type = "info"; //Available values: success, error, info
  @track layout = "lightning"; //Available values: lightning, newport

  connectedCallback() {
    this.render();
  }
  showModal() {
    const modalTemplate = this.template.querySelector(
      "vlocity_cmt-omniscript-modal[data-omni-key=omnimodaloverride]"
    );
    modalTemplate.openModal();
  }
  hideModal() {
    const modalTemplate = this.template.querySelector(
      "vlocity_cmt-omniscript-modal[data-omni-key=omnimodaloverride]"
    );
    modalTemplate.closeModal();
  }
  render() {
    return template;
  }
}
