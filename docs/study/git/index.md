## git相关的内容

### 1.git init

git init 是 Git 命令之一，用于在当前目录中初始化一个新的 Git 仓库。执行 git init 命令后，Git 会在当前目录中创建一个名为 .git 的子目录，用于存储 Git 仓库的相关信息。这些信息包括版本历史记录、分支、标签等等。在执行 git init 命令后，您可以使用其他 Git 命令来管理和维护您的代码库
### 2.git add 

git add 是 Git 命令之一，用于将当前目录中的所有文件添加到 Git 仓库的暂存区。执行 git add . 命令后，Git 会将当前目录中的所有文件添加到暂存区，但不会将它们提交到版本库中。这意味着您可以在提交之前对文件进行更改或编辑。如果您只想添加特定的文件！后面跟上指定的文件


### 3. git commit 初始版本
git commit -m "Initial commit" 是 Git 命令之一，用于将更改提交到 Git 仓库。执行 git commit -m "Initial commit" 命令后，Git 会将当前暂存区中的更改提交到版本库中，并将提交消息设置为 "Initial commit"。这意味着您已经完成了第一次提交，并为您的代码库创建了一个初始版本

###  4. git branch 设置主分支
git branch -M main 是 Git 命令之一，用于将当前分支重命名为 "main"。执行 git branch -M main 命令后，Git 会将当前分支重命名为 "main"，并将其设置为默认分支。这意味着在推送代码时，Git 将使用 "main" 分支而不是默认的 "master" 分支。这是因为 GitHub 已经决定将 "master" 分支更名为 "main" 分支，以避免使用一个带有历史负担的术语。 

### 5. git remote add  origin

git remote add origin 是 Git 命令之一，用于将远程 Git 仓库的 URL 添加到本地 Git 仓库中。执行 git remote add origin `<url>` 命令后，Git 会将指定的 URL 添加到本地 Git 仓库中，并将其命名为 "origin"。这意味着您可以使用 "origin" 作为远程 Git 仓库的别名，而不必每次都输入完整的 URL。例如，如果您要将本地代码推送到远程 Git 仓库，可以使用以下命令：
其中，"origin" 是远程 Git 仓库的别名
git push -u origin main
``` git
git remote add origin https://github.com/zhaxi-ch/vitepress.git
```
### 6.提交到仓库
```
git push -u origin main
```

### 7.报错对应 

fatal: unable to access 'https://github.com/zhaxi-ch/vitepress.git/': Encountered end of file

解决办法： 修改github对应的域名和ip

#### SSH 密钥生成
``` shell
ssh-keygen -t rsa -b 4096 -C "417550867@qq.com"

```
———————————————————————————————————

###  将仓库内容推送到远程的仓库






```git
git  push -f  git@github.com/zhaxi-ch/MyBlog.git  main:gh-pages
```

要查询当前本地仓库的名称，可以使用 git remote 命令。这个命令会显示当前本地仓库所关联的远程仓库的名称。例如，如果你想要查询当前本地仓库所关联的远程仓库的名称，可以运行以下命令：
```
git remote
```
这将显示当前本地仓库所关联的远程仓库的名称。如果你想要查看更详细的信息，可以使用 git remote -v 命令查看每个远程仓库的 URL。例如，如果你想要查看每个远程仓库的 URL，可以运行以下命令：
```
git remote -v
```
希望这可以帮助你查询当前本地仓库的名称 
如何删除远程仓库的关联
要删除远程仓库的关联，可以使用 git remote remove 命令。这个命令会将本地仓库与指定的远程仓库的关联删除。例如，如果你想要删除本地仓库与名为 origin 的远程仓库的关联，可以运行以下命令：
```
git remote remove origin
```
这将删除本地仓库与名为 origin 的远程仓库的关联。请注意，这不会删除远程仓库本身，只会删除本地仓库与远程仓库的关联。希望这可以帮助你删除远程仓库的关联 

---

### 常用的问题
* .git提交的时候，如何将一些不需要的文件不提交
1. 创建一个名为 .gitignore 的文件，将不需要提交的文件名添加到该文件中。例如，如果您想排除名为 node_modules 的文件夹，可以在 .gitignore 文件中添加以下内容：
2. 将 .gitignore 文件添加到 Git 中：
```
git add .gitignore
```
3. 提交更改：
```
git commit -m "Add .gitignore file"

```
4. 现在，Git 将忽略 .gitignore 文件中列出的所有文件。如果您已经将不需要提交的文件添加到 Git 中，可以使用以下命令将其从 Git 中删除：

```
git rm -r --cached node_modules
```
其中，filename 是您要删除的文件名。这将从 Git 中删除该文件，但不会删除实际的文件。希望这可以帮助您解决问题 