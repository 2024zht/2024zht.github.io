---
title: test
date: 2024-11-22 10:30:14
tags:
---

## 题目:

银河编译传说

Description

公元4202年，地球上的学子们向往着知识的殿堂。在那一年，实验室里的一位马师姐报名参加了RL狮饭大学举办的夏令营活动。为了能够正式加入这个精英汇聚的夏令营，她需要通过一个难度颇高的入营考核。目前，马师姐在准备这项考核时遇到了一些挑战，因此她请求你的帮助。

此次夏令营布置了一套题目，其中一道是关于编译链的构建。在这项任务中，马师姐遭遇了一个棘手的`link error`问题，对此她感到束手无策。于是，她将自己一部分的操作步骤详细地记录下来并发给了你。现在，作为一位经验丰富的程序设计员，你被要求根据她的描述，将文件a和文件b成功编译成一个可以运行的库文件。在这个过程中，你需要解决所有的编译问题，确保最终成果能够顺利通过夏令营的考验。随着这个问题的解决，马师姐将更加接近于实现她的学术梦想，而这段经历也将成为她人生中的一个重要篇章。

以下是马师姐的思路和实现的详细步骤：

```bash
# 目前我需要编译好一个叫做ans.cpp的文件,以下是我的步骤:

# 我的初始文件夹层级如下，其中*代表省略文件夹的内容。
# /home/ma/task

# task/
# ├── BLAS-3.12.0/
# │   └── *
# ├── CBLAS/
# │   └── *
# └── source/
#     ├── lib/
#     ├── include/
#     │  ├── cblas.h
#     │  └── matrix.h 
#     └── src/
#         ├── ans.cpp
#         └── matrix.cpp 

# 以下是我的操作步骤(其中gfortran和g++等相关编译器都安装完成)：
cd /home/ma/task/BLAS-3.12.0/

mdkir build && cd build

cmake ..

make -j16
# 这一步之后生成了一个文件 libblas.a

cd ../../CBLAS
# 之后修改CBLAS的Makefile.in文件，这一步的目的就是把编译相关路径设置好，其中我把BLLIB修改为了task/CBLAS/lib/blas_LINUX.a，也就是说编译出来的文件会在lib文件夹中

cp ../BLAS-3.12.0/libblas.a ./lib

make -j16
# 这一步在lib文件夹下生成了cblas_LINUX.a（这一步发生了报错，但是后来发现不影响cblas_LINUX.a的生成）

cd ../source

g++ -lgfortran -I include/ -o ans lib/cblas_LINUX.a lib/libblas.a src/ans.cpp
# 这一步是最终编译，这一步报错了
# 最主要的报错如下
# collect2: error: ld returned 1 exit status

# ref:
# 1.https://www.cnblogs.com/humid1ch/articles/18263026
# 2.https://zhuanlan.zhihu.com/p/88255667
# 3.https://www.netlib.org/blas/
```

文件夹附件可以从这里下载（BLAS和CBLAS是没有解压的喔）：[点我下载文件](http://120.26.104.144/public/upload/313e2e8458.zip)

注意：请查看页面最下方的提示。

Input

只需要提交相关修改指令即可，最后使用g++进行编译成功在/home/ma/task/source生成一个ans可执行文件即为正确。

当然，不可以直接创建一个ans的可执行文件，这样也会被系统判别为错误（也就是说你必须使用g++编译器生成，不要使用其他编译器）。

例如，在/home/ma/task/x文件夹下创建一个y.cpp文件之后可以使得g++编译没有错误，那么你只需要提交以下指令

```bash
cd /home/ma/task/x && touch y.cpp
cd /home/ma/task/source
g++ -lgfortran -I include/ -o ans lib/cblas_LINUX.a lib/libblas.a src/ans.cpp
```

当然，提交的结果不唯一，以下也是可以的

```bash
touch /home/ma/task/x/y.cpp

g++ -lgfortran -I /home/ma/task/source/include -o ans /home/ma/task/source/lib/cblas_LINUX.a /home/ma/task/source/lib/libblas.a /home/ma/task/source/src/ans.cpp
```

这里有很多提示

1.Linux指令不熟悉的，加油，现用现学吧。

2.BLAS(Basic Linear Algebra Subprograms)是一个基础线性代数程序集，是使用gfortran语言写的，而CBLAS是BLAS的C语言接口，CBLAS依赖于BLAS，也就是说如果你想要使用CBLAS库写相关程序的话，那么编译这个程序的依赖是BLAS和CBLAS。

3.只有明白编译链接的过程是什么样的，才能把问题的关键点找到喔。

## 解题过程：

### 1.准备所需文件和环境

```
apt-get update
apt-get install zip
unzip 313e2e8458.zip
cd task
tar -zxvf blas-3.12.0.tgz -C ./
tar -zxvf blas-3.12.0.tgz -C ./
apt-get install cmake
apt-get install build-essential
apt-get install gfortran
apt-get install vim
```

### 2.解题

原解题步骤的错误是

```
/usr/bin/ld: cannot find lib/cblas_LINUX.a: No such file or directory
/usr/bin/ld: cannot find lib/libblas.a: No such file or directory
collect2: error: ld returned 1 exit status
```

显示找不到cblas_LINUX.a和libblas.a，修改路径。

```
g++ -lgfortran -I include/ -o ans src/ans.cpp ../CBLAS/lib/cblas_LINUX.a ../CBLAS/lib/libblas.a
```

依旧发生错误

```
/usr/bin/ld: /tmp/cc6bfFeU.o: in function `main':
ans.cpp:(.text+0x39): undefined reference to `Matrix::Matrix(int, int)'
/usr/bin/ld: ans.cpp:(.text+0x5b): undefined reference to `Matrix::set(int, int, double)'
/usr/bin/ld: ans.cpp:(.text+0x7d): undefined reference to `Matrix::set(int, int, double)'
/usr/bin/ld: ans.cpp:(.text+0x9f): undefined reference to `Matrix::set(int, int, double)'
/usr/bin/ld: ans.cpp:(.text+0xc1): undefined reference to `Matrix::set(int, int, double)'
/usr/bin/ld: ans.cpp:(.text+0xe3): undefined reference to `Matrix::set(int, int, double)'
/usr/bin/ld: /tmp/cc6bfFeU.o:ans.cpp:(.text+0x105): more undefined references to `Matrix::set(int, int, double)' follow
/usr/bin/ld: /tmp/cc6bfFeU.o: in function `main':
ans.cpp:(.text+0x30a): undefined reference to `Matrix::getRows() const'
/usr/bin/ld: ans.cpp:(.text+0x385): undefined reference to `Matrix::getCols() const'
/usr/bin/ld: ans.cpp:(.text+0x394): undefined reference to `Matrix::data()'
/usr/bin/ld: ans.cpp:(.text+0x3a3): undefined reference to `Matrix::getCols() const'
/usr/bin/ld: ans.cpp:(.text+0x3b2): undefined reference to `Matrix::getRows() const'
/usr/bin/ld: ../CBLAS/lib/libblas.a(xerbla.f.o): in function `xerbla_':
xerbla.f:(.text+0x80): undefined reference to `_gfortran_st_write'
/usr/bin/ld: xerbla.f:(.text+0x99): undefined reference to `_gfortran_string_len_trim'
/usr/bin/ld: xerbla.f:(.text+0xc0): undefined reference to `_gfortran_transfer_character_write'
/usr/bin/ld: xerbla.f:(.text+0xde): undefined reference to `_gfortran_transfer_integer_write'
/usr/bin/ld: xerbla.f:(.text+0xed): undefined reference to `_gfortran_st_write_done'
/usr/bin/ld: xerbla.f:(.text+0x101): undefined reference to `_gfortran_stop_string'
collect2: error: ld returned 1 exit status
```

查看要编译的ans.cpp文件

```
#include <iostream>
#include <vector>
#include <cblas.h>
#include "matrix.h"

int main() {
    Matrix A(4, 4);

    A.set(0, 0, 1);
    A.set(1, 0, 2);
    A.set(2, 0, 3);
    A.set(3, 0, 4);
    A.set(0, 1, 1);
    A.set(1, 1, 1);
    A.set(2, 1, 1);
    A.set(3, 1, 1);
    A.set(0, 2, 3);
    A.set(1, 2, 4);
    A.set(2, 2, 5);
    A.set(3, 2, 6);
    A.set(0, 3, 5);
    A.set(1, 3, 6);
    A.set(2, 3, 7);
    A.set(3, 3, 8);

    std::vector<double> x = {1, 2, 1, 1};

    std::vector<double> y(A.getRows(), 0.0);

    // 矩阵与向量乘法 y = A * x
    double alpha = 1.0;
    double beta = 0.0;

    cblas_dgemv(CblasColMajor, CblasNoTrans, A.getRows(), A.getCols(),
                alpha, A.data(), A.getCols(), x.data(), 1,
                beta, y.data(), 1);

    // 打印结果
    std::cout << "Result of A * x:" << std::endl;
    for (int i = 0; i < y.size(); ++i) {
        std::cout << "y[" << i << "] = " << y[i] << std::endl;
    }

    return 0;
}
```

可以看到，编译ans.cpp需要的依赖有cblas.h，matrix.h。

matrix.h的内容为

```
#ifndef MATRIX_H
#define MATRIX_H

#include <vector>
#include <iostream>

class Matrix {
public:
    Matrix(int rows, int cols);
    void set(int row, int col, double value);
    double get(int row, int col) const;
    int getRows() const;
    int getCols() const;
    double* data(); // 返回数据指针

private:
    int rows;
    int cols;
    std::vector<double> data_; // 更改为 data_ 以避免冲突
};

#endif // MATRIX_H
```

这又需要编译matrix.cpp

至此，问题已经很明显了，就是matrix.h和matrix.cpp没有编译

修改指令：

```
g++ -lgfortran -I include/ -o ans src/ans.cpp src/matrix.cpp ../CBLAS/lib/cblas_LINUX.a ../CBLAS/lib/libblas.a -lgfortran
```

在当前目录下生成ans可执行文件

```
root@b91c4f0ae294:/tmp/task/source# ls
ans  include  lib  src
root@b91c4f0ae294:/tmp/task/source# ./ans
Result of A * x:
y[0] = 12
y[1] = 5
y[2] = 22
y[3] = 32
```

结束！
