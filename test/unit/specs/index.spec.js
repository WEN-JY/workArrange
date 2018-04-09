import Vue from 'vue'
import index from '@/components/index'

describe('index', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(index)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
    .toEqual('欢迎使用南京动车段宿舍管理')
  })
})
