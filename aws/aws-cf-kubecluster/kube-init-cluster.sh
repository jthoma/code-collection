#!/bin/bash

kubeadm config images pull
APIADDR=$(curl -q http://169.254.169.254/latest/meta-data/local-ipv4)
CIDR=$(echo $APIADDR | awk -F'.' '{print $1"."$2".0.0/16"}')

kubeadm init --pod-network-cidr="$CIDR" --apiserver-advertise-address="$APIADDR" > /tmp/out.log 2>&1

cat /tmp/out.log | grep "\-token" | grep -v "^\[" > /tmp/join.sh 

finishInThread()
{
    echo 'export KUBECONFIG=/etc/kubernetes/admin.conf' >> /root/.bash_aliases

    mkdir -p /home/ubuntu/.kube
    sudo cp -i /etc/kubernetes/admin.conf /home/ubuntu/.kube/config
    sudo chown ubuntu:ubuntu /home/ubuntu/.kube/config

    export KUBECONFIG=/etc/kubernetes/admin.conf
    kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

}

finishInThread >> /tmp/finishing.log 2>&1 &
