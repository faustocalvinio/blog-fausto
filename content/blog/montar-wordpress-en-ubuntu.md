---
external: true
url: http://azure.archive.ubuntu.com/ubuntu
title: montar-wordpress-en-ubuntu
description: montar-wordpress-en-ubuntu
date: 2025-07-30
---

Reading package lists...
Building dependency tree...
Reading state information...
apache2 is already the newest version (2.4.58-1ubuntu8.7).
mysql-server is already the newest version (8.0.42-0ubuntu0.24.04.2).
The following additional packages will be installed:
  libapache2-mod-php8.3
The following NEW packages will be installed:
  libapache2-mod-php libapache2-mod-php8.3 php php-mysql
0 upgraded, 4 newly installed, 0 to remove and 11 not upgraded.
Need to get 1861 kB of archives.
After this operation, 5690 kB of additional disk space will be used.
Get:1 file:/etc/apt/apt-mirrors.txt Mirrorlist [144 B]
Get:2 http://azure.archive.ubuntu.com/ubuntu noble-updates/main amd64 libapache2-mod-php8.3 amd64 8.3.6-0ubuntu0.24.04.5 [1851 kB]
Get:3 http://azure.archive.ubuntu.com/ubuntu noble/main amd64 libapache2-mod-php all 2:8.3+93ubuntu2 [4224 B]
Get:4 http://azure.archive.ubuntu.com/ubuntu noble/main amd64 php all 2:8.3+93ubuntu2 [4076 B]
Get:5 http://azure.archive.ubuntu.com/ubuntu noble/main amd64 php-mysql all 2:8.3+93ubuntu2 [1838 B]
Fetched 1861 kB in 0s (3819 kB/s)
Selecting previously unselected package libapache2-mod-php8.3.
(Reading database ... (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%(Reading database ... 75%(Reading database ... 80%(Reading database ... 85%(Reading database ... 90%(Reading database ... 95%(Reading database ... 100%(Reading database ... 219824 files and directories currently installed.)
Preparing to unpack .../libapache2-mod-php8.3_8.3.6-0ubuntu0.24.04.5_amd64.deb ...
Unpacking libapache2-mod-php8.3 (8.3.6-0ubuntu0.24.04.5) ...
Selecting previously unselected package libapache2-mod-php.
Preparing to unpack .../libapache2-mod-php_2%3a8.3+93ubuntu2_all.deb ...
Unpacking libapache2-mod-php (2:8.3+93ubuntu2) ...
Selecting previously unselected package php.
Preparing to unpack .../php_2%3a8.3+93ubuntu2_all.deb ...
Unpacking php (2:8.3+93ubuntu2) ...
Selecting previously unselected package php-mysql.
Preparing to unpack .../php-mysql_2%3a8.3+93ubuntu2_all.deb ...
Unpacking php-mysql (2:8.3+93ubuntu2) ...
Setting up php (2:8.3+93ubuntu2) ...
Setting up php-mysql (2:8.3+93ubuntu2) ...
Setting up libapache2-mod-php8.3 (8.3.6-0ubuntu0.24.04.5) ...

Creating config file /etc/php/8.3/apache2/php.ini with new version
Module mpm_event disabled.
Enabling module mpm_prefork.
apache2_switch_mpm Switch to prefork
apache2_invoke: Enable module php8.3
Setting up libapache2-mod-php (2:8.3+93ubuntu2) ...
Processing triggers for libapache2-mod-php8.3 (8.3.6-0ubuntu0.24.04.5) ...

Securing the MySQL server deployment.

Error: Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)

[?2004h)0[1;24r[m(B[4l[?7h[?25l[H[J[22;35H[0;7m(B[ New File ][m(B[?25h[24;1H[?2004l

---

*Este post fue generado automáticamente por GitHub Actions desde el [Issue #9](https://github.com/faustocalvinio/blog-fausto/issues/9) de GitHub.*
