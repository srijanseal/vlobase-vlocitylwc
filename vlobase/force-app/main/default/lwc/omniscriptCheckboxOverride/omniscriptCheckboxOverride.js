import omniscriptCheckbox from "vlocity_cmt/omniscriptCheckbox";
import template from "./omniscriptCheckboxOverride.html";
import template_nds from "./omniscriptCheckboxOverride_nds.html";

export default class OmniscriptCheckboxOverride extends omniscriptCheckbox {
  connectedCallback() {
    super.connectedCallback();
    console.log("layout:" + this.layout);
  }
  handleChange(event) {
    super.handleChange(event);
    console.log("handlechange is called. value: " + event.target.checked);
  }

  render() {
    return this.layout === "newport" ? template_nds : template;
  }
}
