import OmniScriptStep from "vlocity_cmt/omniscriptStep";
import { OmniscriptBaseMixin } from "vlocity_cmt/omniscriptBaseMixin";
import tmpl from "./omniscriptStepOverride.html";
import { track } from "lwc";

export default class OmniscriptStepOverride extends OmniscriptBaseMixin(
  OmniScriptStep
) {
  @track stepLogo;
  render() {
    return tmpl;
  }

  connectedCallback() {
    this.stepLogo = "/resource/omniscriptStepLogo";
    console.info('jsonDef:',JSON.stringify(this.jsonDef));
  }

  navigateNext(event){
    if (event) {
      this.omniNextStep();
    }
  }

  navigateStep(event){
    if(event?.target?.dataset?.index){
      this.omniNavigateTo(event.target.dataset.index);
    }
  }
}