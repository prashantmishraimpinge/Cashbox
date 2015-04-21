#Cashbox Web
The Angular application http://web.cashbox.cash  
Run in stubbed mode: http://web.cashbox.cash?nobackend

##Installation
###1. Install Node.js.
```
#!sh
sudo apt-get install nodejs
```
Make sure `node` and `npm` are available on the command line.

###2. Install Ruby

```
#!sh
sudo apt-get install ruby-full
```
Make sure `ruby` and `gem` are available on the command line.

###3. Install Compass
```
#!sh
sudo gem install compass
```
Make sure `compass` is available on the command line.

###4. Install Bower and Grunt

```
#!sh

sudo npm install -g bower grunt-cli
```
Make sure `bower` and `grunt` are available on the command line.

That's it. You've installed all the tools required for development and building.

##Development
Point current directory to the root of cloned sources and run:

```
#!sh
npm install && bower install
```
These two command install application dependencies (front-end and development). You should run it *every time* when dependency list changes.

You can now run
```
#!sh
grunt serve
```
to start local web server. The application is available in http://localhost:9000
Once you change any file in the /app folder the page in the browser would automatically reload.

##Build
To get ready-to-deployment version, run following command in the source root:

```
#!sh
grunt build
```
It would create minified, concat and versioned files in the /dist folder that can be deployed.

##Deploy
To deploy to staging server add remote repository and push source code to it:

```
#!sh
git remote add staging ssh://cashbox@178.62.236.224/home/cashbox/build/web.cashbox.git
git push staging master:master
```