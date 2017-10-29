# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.define "develop", primary: true do |dev|
    dev.vm.box = "ubuntu/trusty64"
    
    dev.vm.hostname = "trusty64-mean"
    
    dev.vm.network "private_network", ip: "192.168.100.10"
    
    dev.vm.provider "virtualbox" do |vb|
        vb.memory = "512"
    end
      
    dev.vm.provision "shell", inline: <<-SHELL
         curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
         apt-get update
         apt-get install -y nodejs mariadb-server
         npm install -g express-generator nodemon
    SHELL
  end
end
