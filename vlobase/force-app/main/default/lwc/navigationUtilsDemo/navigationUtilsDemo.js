import { LightningElement, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import {
  WebPageReference,
  RecordPageReference,
  ObjectPageReference,
  NamedPageReference,
  CommNamedPageReference,
  parseParams,
  stringifyParams,
  normalizeParams,
  deNamespace
} from "vlocity_cmt/navigationUtils";

export default class NavigationUtilsDemo extends NavigationMixin(
  LightningElement
) {
  @track inputText = "";
  @track outputText = "";

  updateInputText(event) {
    this.inputText = event.target.value;
  }

  handleClick(event) {
    let buttonAction = event.target.dataset.buttonAction;
    switch (buttonAction) {
      case "nav_to_webpage":
        console.log("Navigating to external web page! URL:" + this.inputText);
        this.navigateToWebPage(this.inputText);
        break;

      case "nav_to_account_new_browser_tab":
        console.log(
          "Navigating to account record in new browser tab! recordId:" +
            this.inputText
        );
        this.navigateToAccountRecord(this.inputText, false);
        break;

      case "nav_to_account_new_console_tab":
        console.log(
          "Navigating to account record in new console tab! recordId:" +
            this.inputText
        );
        this.navigateToAccountRecord(this.inputText, true);
        break;

      case "nav_to_object":
        console.log("Navigating to object page!");
        this.navigateToObject(this.inputText);
        break;

      case "nav_to_named_page":
        console.log("Navigating to named page!");
        this.navigateToNamedPage(this.inputText);
        break;

      case "nav_to_comm_named_page":
        console.log("Navigating to community named page!");
        this.navigateToCommNamedPage(this.inputText);
        break;

      case "parse-params-demo":
        console.log("Parse example shown from example query string");
        this.parseParamsDemo();
        break;

      case "stringify-params-demo":
        console.log("Stringify example shown:");
        this.stringifyParamsDemo();
        break;

      case "normalize-params-demo":
        console.log("Normalize example shown:");
        this.normalizeParamsDemo();
        break;

      case "denamespace-demo":
        console.log("deNamespace example shown:");
        this.deNamespaceDemo();
        break;

      default:
        break;
    }
  }

  navigateToWebPage(url) {
    // Navigate to a URL
    const webPageRef = new WebPageReference(url);
    this[NavigationMixin.Navigate](
      webPageRef,
      false // Replaces the current page in your browser history with the URL
    );
  }

  navigateToAccountRecord(recordId, openNewConsoleTab) {
    // Navigate to a record page
    const recPageRef = new RecordPageReference(recordId, "Account", "view");
    if (openNewConsoleTab) {
      this[NavigationMixin.Navigate](
        recPageRef,
        false // Replaces the current page in your browser history with the URL
      );
    } else {
      this[NavigationMixin.GenerateUrl](recPageRef).then((url) => {
        // Open the URL in a new browser tab
        window.open(url, "_blank");
      });
    }
  }

  navigateToObject(objectApiName) {
    const objectName = objectApiName ? objectApiName : "Account";
    const objectPageRef = new ObjectPageReference(objectName);
    console.log(objectPageRef);
    // Output: PageReference object with type 'standard__objectPage'

    this[NavigationMixin.Navigate](
      objectPageRef,
      false // Replaces the current page in your browser history with the URL
    );
  }

  navigateToNamedPage(namedPage) {
    const pageName = namedPage ? namedPage : "home";
    const namedPageRef = new NamedPageReference(pageName);
    console.log("Standard Named Page: " + JSON.stringify(namedPageRef));
    // Output: PageReference object with type 'standard__namedPage'

    this[NavigationMixin.Navigate](
      namedPageRef,
      false // Replaces the current page in your browser history with the URL
    );
  }

  navigateToCommNamedPage(commNamedPage) {
    const commPageName = commNamedPage ? commNamedPage : "Home";
    const commNamedPageRef = new CommNamedPageReference(commPageName);
    console.log("Community Named Page: " + JSON.stringify(commNamedPageRef));
    // Output: PageReference object with type 'comm__namedPage'

    this[NavigationMixin.Navigate](
      commNamedPageRef,
      false // Replaces the current page in your browser history with the URL
    );
  }

  parseParamsDemo() {
    const queryString = this.inputText ? this.inputText : "?name=John&age=30";
    const params = parseParams(queryString);
    console.log("params:" + params);
    this.outputText =
      "Query string: " +
      queryString +
      " After parsing: " +
      JSON.stringify(params);
    // Output: { name: 'John', age: '30' }
  }

  stringifyParamsDemo() {
    const params = this.inputText
      ? JSON.parse(this.inputText)
      : { name: "John", age: 30 };
    const queryString = stringifyParams(params);
    console.log("queryString:" + queryString);
    this.outputText =
      "Parameters: " +
      JSON.stringify(params) +
      " After stringify: " +
      queryString;
    // Output: '?c__name=John&c__age=30'
  }

  normalizeParamsDemo() {
    const namespacedParams = this.inputText
      ? this.inputText
      : { c__name: "John", c__age: 30 };
    const normalizedParams = normalizeParams(namespacedParams);
    console.log("normalizedParams:" + normalizedParams);
    this.outputText =
      "Parameters: " +
      JSON.stringify(namespacedParams) +
      " After normalize: " +
      JSON.stringify(normalizedParams);
    // Output: { name: 'John', age: 30 }
  }

  deNamespaceDemo() {
    const namespacedSymbol = this.inputText
      ? this.inputText
      : "c__navigateAction";
    const [name, namespace] = deNamespace(namespacedSymbol);
    this.outputText =
      "Before deNamespace: " +
      namespacedSymbol +
      " After denamepace, name: " +
      name +
      " and namespace: " +
      namespace;
    console.log(name, namespace);
    // Output: 'navigateAction', 'c'
  }
}
