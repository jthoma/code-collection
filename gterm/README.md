# gTerm 

## Introduction

This is a console application and was developed in php 5 

## Why php

My first preference since I was more or less on php since fag end of 1998 starting with php 3.4.
As of most recent (2018) I had upgraded several of my code into php 7.2 and [phpmf](https://github.com/jthoma/phpmf) my [routing framework](https://github.com/jthoma/phpmf/tree/master/examples/php-lambda) is been tuned to work in AWS Serverless, though the deployment uses [Stackery Lambda Layer](https://github.com/stackery/php-lambda-layer) the framework is my own piece of code from ground up.

## Before you begin

You will need a developer association with TravelPort and need an IATA approved agency who has access into the GDS and any attempts on Production api might incur look-to-book charges. Though the POC/Development access could be free depending on the agency and contact person who will co-ordinate your access. 

## Video Demo

Welcome to view a [video demo](https://youtu.be/30wohPsWBa4) which I had created 2019 or so and uploaded on YouTube may be later than that.


## Code Explained 

Sorry this could be incomplete, as I have long forgotten the system, but what I do remember will be updated later.

The core is over XmlSelect.php which is an abstraction created using [Easy Wsdl2php](https://sourceforge.net/projects/easywsdl2php/) and further tweaked by me and later by some of my associates especially appreciate the help of [Mohammed Iqbal](https://www.linkedin.com/in/mohammed-iqbal-khan/)  and [Sruthi P](https://www.linkedin.com/in/sruthi-p-1b9221127/) who have helped in updating the code to work in php 7.

Though the code is written in php, there is a heavy hangover from Ubuntu cli and bash, as I was mostly on linux since 1997 onwards and windows was just a test platform to view layout of web applications and gradually I pulled myself out of visual applications and concenrated on headless microservices. Also the TravelPort supplied console application would work only on Windows and does not support Linux, the reason for this console application is evident.;) jthoma stands for Jiju Thomas Mathew, which is my full name
