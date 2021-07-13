#!/bin/bash

kubeadm config images pull
kubeadm init --pod-network-cidr=192.168.0.0/16 --apiserver-advertise-address=192.168.33.10 >> /vagrant/out.log 2>&1

grep "\-token" /vagrant/out.log | grep -v "^\[" > /vagrant/kube-join.sh 


echo 'export KUBECONFIG=/etc/kubernetes/admin.conf' >> /root/.bash_aliases

mkdir -p /home/vagrant/.kube
sudo cp -i /etc/kubernetes/admin.conf /home/vagrant/.kube/config
sudo chown vagrant:vagrant /home/vagrant/.kube/config

export KUBECONFIG=/etc/kubernetes/admin.conf
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

