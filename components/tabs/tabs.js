// components/tabs/tabs.js
Component({
  properties: {
    tabData: {
      type: Array,
      value: []
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
  },
  methods: {
    tabTap(e) {
      console.log(e)
      let dataset = e.target.dataset
      this.triggerEvent('tabChange', {dataset}, {})
    }
  }
})