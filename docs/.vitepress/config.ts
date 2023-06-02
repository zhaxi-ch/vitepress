
import { defineConfig } from 'vitepress';

export default defineConfig({
  // 打包输出目录
  outDir: '../dist',
  base:'/MyBlog',

  // 站点语言标题等
  lang: 'zh-CN',
  title: '扎西记录的内容',
  description: '学海无涯苦作舟',

  themeConfig: {
    i18nRouting: false,
    logo: '/log.png',
    nav: [

     { text: '运维相关',
      items: [
        { text: '名词解释', link: '/yunwei/basicalkn/' },
        { text: '服务侧运维', link: '/yunwei/network/' },
        { text: '网络侧运维', link: '/yunwei/network/' }
      ]},
      { text: '学习内容' ,
      items: [
        { text: 'Vitepress', link: '/study/vitepress/' },
        { text: '学习目标', link: 'https://notes.fe-mm.com/nav' }
      ]
    },
      {
        text: '日常记录',
        items: [
          { text: 'Linux相关', link: '/workrecord/linux/' },
          { text: 'MySQL相关', link: '/workrecord/mysql/' }
        ]
      },

      { text: 'Guide', link: '/guide/', activeMatch: '/guide/what-is-vitepress' },
      {
        text: '下拉选择框',
        items: [
          { text: 'options-1', link: '/' },
          { text: 'options-2', link: 'http://www.baidu.com' }
        ]
      }
    ],
   sidebar:[
    { text: 'Vitepress', link: '/study/vitepress/' },
    { text: 'es6', link: '/study/es6/' },
    { text: 'blog', link: '/study/zhaxiblog/' },
    { text: 'page', link: '/study/zhaxiblog/gitpage/' },
    { text: 'git相关', link: '/study//git/' },
    {
      text: '运维相关',
      items: [
        { text: '名词解释', link: '/yunwei/basicalkn/' },
        { text: '服务运维', link: '/yunwei/server/' },
        { text: '网络运维', link: '/yunwei/network/' }
      ]
    },

   ],







    socialLinks: [{ icon: 'github', link: 'https://zhaxi-ch.github.io/MyBlog/' }],

    footer: {
      copyright: 'Copyright © MIT Zhaxi'
    },

    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }







  }
});




// module.exports = {
//     title: 'Hello VitePress',
//     description: 'Just playing around.',

//   }