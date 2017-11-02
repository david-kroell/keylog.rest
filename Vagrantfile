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
         apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
         echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
         curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
         apt-get update
         apt-get install -y nodejs mongodb-org
         npm install -g express-generator nodemon apidoc
    SHELL
  end
end
