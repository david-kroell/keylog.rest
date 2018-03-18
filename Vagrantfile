# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.define "develop", primary: true do |dev|
    dev.vm.box = "ubuntu/trusty64"
    
    dev.vm.hostname = "trusty64-dev"
    
    dev.vm.network "private_network", ip: "192.168.100.10"

    dev.vm.provider "virtualbox" do |vb|
        vb.memory = "512"
    end
      
    dev.vm.provision "shell", inline: <<-SHELL
         curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
         apt-get update
         # set mysql root pw non-interactive
         sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password password'
         sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password password'
         # install software
         apt-get install -y nodejs mysql-server-5.5
         npm install -g express-generator nodemon apidoc

         # create database
         mysql -uroot -p'password' -e "CREATE DATABASE keylogger DEFAULT CHARACTER SET utf8;"
    SHELL
  end
end
