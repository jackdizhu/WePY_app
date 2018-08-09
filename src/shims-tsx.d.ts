import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
  namespace wx {
    function getUpdateManager(): any;
    // function navigateTo(obj: any): any;
  }
  namespace Object {
    function assign(obj1: any, obj2: any, obj3?: any): any;
  }
  namespace Vue {
    interface mixin {
      onUnload(): any;
    }
    function mixin(mixin: mixin): any;
  }
}
