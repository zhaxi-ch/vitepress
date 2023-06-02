# 将vitepress 部署到github page页面
##  将自己写法的文档部署到Github pages,创建仓库

要将您的 VitePress 项目发布到 GitHub Pages，您需要遵循以下步骤：

1. 首先，确保您已经在本地安装了 [VitePress](https://vitepress.vuejs.org/) 并创建了一个项目。如果您还没有创建项目，请参考 [VitePress 文档](https://vitepress.vuejs.org/guide/getting-started.html)。

2. 在项目根目录下创建一个名为 .github/workflows 的文件夹。在该文件夹中，创建一个名为 deploy.yml 的文件。这个文件将包含 GitHub Actions 的配置，用于自动构建和部署您的 VitePress 项目。

3. 在 deploy.yml 文件中，添加以下内容：
``` yml
name: Deploy

on:
  push:
    branches:
      - main  # 将此处的 'main' 替换为您的默认分支名称

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: 14

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./docs/.vitepress/dist


```

4. 将您的项目推送到 GitHub。确保您已经创建了一个与您的本地项目同名的 GitHub 仓库。

5. 在 GitHub 仓库的设置页面中，找到 "GitHub Pages" 部分。在 "Source" 下拉菜单中，选择 "gh-pages" 分支，然后点击 "Save" 按钮。

现在，每当您将更改推送到默认分支时，GitHub Actions 都会自动构建并将您的 VitePress 项目部署到 GitHub Pages。您可以在仓库设置页面的 "GitHub Pages" 部分找到部署后的站点 URL。

请注意，第一次部署可能需要几分钟的时间。在部署完成后，您应该能够通过提供的 URL 访问您的 VitePress 站点