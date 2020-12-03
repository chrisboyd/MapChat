<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
--




<!-- PROJECT LOGO -->
<br />

  <h1 align="center">MapChat Hyper-Local Social Network</h1>
  <h3 align="center">Brought to you by FiveGuys Software</h3>

  <p align="center">
    The worlds best adventure-based social networking application
    <br />
    <a href="https://github.com/chrisboyd/MapChat/tree/master/Docs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/chrisboyd/MapChat/blob/master/Docs/main_GUI_example.jpg">View Demo</a>
    ·
    <a href="https://github.com/chrisboyd/MapChat/issues">Report Bug</a>
    ·
    <a href="https://github.com/chrisboyd/MapChat/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents


* [Abstract](#abstract)
* [Introduction](#introduction)
  * [MapChat Overview](#mapchat-overview)
  * [Enhancement Motivation](#enhancement-motivation)
  * [Self Healing Loop](#self-healing-loop)
  * [Report Overview](#report-overview)
* [Architecture](#architecture)
  * [Chosen Loop Architecture Review](#chosen-loop-architecture-review)
  * [Alternative Architecture Review](#alternative-loop-architecture-review)
  * [MapChat IP Throttling System](#mapchat-ip-throttling-system)
  * [Effects of MapChat IP Throttling System on Existing Architecture](#effects-of-mapchat-ip-throttling-system-on-existing-architecture)
  * [Prototype](#prototype)
  * [Code](#code)
  * [Enhancement Effects](#enhancement-effects)    
  * [Use Cases](#use-cases)
  * [Sequence Diagrams](#sequence-diagrams)
* [Log Entry Format](*log-entry-format)
* [Interfaces](#interfaces) 
* [Lessons Learned](#lessons-learned)
* [Conclusions](#conclusions)
* [References](#references)

<!-- Abstract  -->
## Abstract

Context: MapChat is a hyper-local social network with an exponential user-growth model. In progressing forward from our first prototype the MapChat team needs to be able to monitor how the system is operating in order to limit the scope of any potential problems. 

Objective: In order to monitor how MapChat was operating the team planned to implement a robust logging system. This logging system was then utilized to develop a client throttling component to prevent single users from overloading the network[1].

Implementation Methodology: MapChat required a system that could grow in complexity and scope with the rest of the system. To fit this we started with the Log4j 2 API that is simple to configure and implement[2]. To perform client throttling we implemented a Throttle component that tracks how many requests come from each IP address over a rolling window of 10 seconds. If the number of requests breaches a threshold, currently defined at 100, the IP address will be added to a BanList and published to a message broker that each microservice is subscribed to. 

Results: As planned, the team was able to add a large degree of logging to our code. At every object creation, user request or database interaction the event is logged. We currently only monitor the log entries generated from the REST controllers of each microservice, but the expanding the analysis will not require further changes to the code. 


<!-- Introduction -->

## Introduction

### MapChat Overview
Current social networks are based around producing as large and widely-distributed groups as possible. While this approach is useful for remaining in contact with people all over the world and promoting your own social brand, it provides little value in increasing your quality of life on a day-to-day basis. MapChat seeks to promote and maintain a new form of hyper-local groups.

A hyper-local group means focusing on a small geographic area. MapChat would create/maintain this new form of hyper-local groups by allowing the users to create a new community or join an existing one. The creation of a community is based on a geographical location. A community can be open for all or have restricted access, depending on the creator’s desires. Every group on the map can create their own flag. A prolific group’s flag can be a marker for adventure, thereby leading other groups to explore a new community or attraction. Each flag is linked with a picture and brief description of the area written by the group. MapChat will also have a messaging system so the users can communicate and build a vibrant community. Ultimately, the purpose of MapChat is to encourage our users to seek other adventurers in their neighbourhood.


### Enhancement Motivation
Adding the logging enhancement as supplied by our professor will help our program to be more well rounded and is deemed necessary if we wish to further develop and improve it by creating a more versatile structure. It assists in areas including, informing all developers what the system is precisely doing, creates security protocols for possible attacks, and is an overall good basis for an ever growing structure. 

As described in the new feature requirements, creating a self-healing loop implies creating an autonomic computing characteristic within our backend.The concept about autonomic computing is related to conscience systems, meaning that it must be able to self-manage it’s systems. This feature requires adaptive technology, which helps with minimal or no human interference, and also allows the system to be very cost efficient. Autonomic computing could also be understood by studying the following areas; Self configuring, Self healing, Self optimizing, and Self protecting. Taking into account the self healing attributes of an autonomic system, we implemented a system with a self-healing loop. Self-healing in autonomic computing refers to the ability to recover from a failure, after detecting from improper operations. Therefore, it is essential for systems to self-detect and self-recover, instead of causing the whole system to shut down. 

### Self Healing Loop

The design of our self-healing loop takes into account implementation concerns, efficiency, and correct functionality. Through this we have coordinated a functionality flow which will log important information of any request made to one of MapChat’s microservices (POST, DELETE, GET, etc..). The log information recorded will include the time request was made, from which IP address it was made, how many times the specific IP address has made a request in a threshold of time, and the request type made. All which will be submitted and logged to a file within the microservice it was established in. Externally, we will have a listener/monitor which will oversee any changes made to the logging files in each node instance and will specifically examine whether any singular IP address attempts to make repeated requests in a specified time period. The actual self-healing will occur in our mitigation technique of throttling clients. For example: to counter spammed requests the self-healing system will temporarily block the address and disallow any more requests to be made from that address. Our self-healing system uses the throttle client mitigation tactic, which drops requests from an IP address that has been assigned to the BanList for a short period of time. This can be further applied to multiple clients if there happens to be an orchestrated attack on our system.


The reason we chose throttle clients compared to other mitigation tactics is because tactics such as retry failed operation and performing load smoothing would either block the service completely or cause longer wait time for the users. Retry failed operation will continuously retry and notify the developers until the operation is complete. However, the service is blocked until developers solve the problem. Furthermore, using the load smoothing tactic causes longer wait times for the users because to avoid overload they are put in queue, which can take longer depending on the number of users. 

### Report Overview

Having selected the throttling clients self-healing loop, this report will detail how the specific architecture was designed through several sets of diagrams and analysis.
  -Architecture comparison between two full client throttling self-healing loops and why the selected architecture best suits our needs.
  -MapChat IP Throttling System diagram showing a high-level view of the self-healing loop
  -Effects on the throttling system on high and low architecture
  -Enhancement effects on: Maintainability, Testability, Evolvability, Performance, Privacy and Security
  -Use cases for AnalyzeRecentLogs and UpdateBanList will be examined through sequence diagrams
  -Sequence diagrams showing the process of logging an event and a client request being processed or denied based on the BanList
  -Log entry format and hierarchy of the log entries
  -Interfaces added to the MapChat system to support logging
To close out the report we will summarize the results and cover the lessons learned through the process of implementing a robust logging system and 

## Architecture

### Chosen Loop Architecture Review

Individual microservices participating in the throttle loop each log requests locally to standard out. The logging information includes timestamps and IP addresses. The logging output from each participating pod in a node collects in shared pod storage. On each node, there is a dedicated logging agent (DaemonSet) that listens for changes in shared storage, retrieves the logs, and pushes them to a remote log RDB for storage. This architecture accounts for the monitoring portion of the MAPE loop.

The remote log RDB collects the aggregation of logging data sent from each individual active node. In the MapChat architecture, we have provisioned a new component that exists as a singleton on a node, called the ThrottleManager. The ThrottleManager has access to the log RDB. Frequently, the ThrottleManager polls the log RBD, and if a sufficient number of new requests have come in, the ThrottleManager retrieves recent log data for analysis. This analysis discerns whether a single IP address has gone over a limit of 100 requests over ten seconds. This architecture accounts for the analysis portion of the MAPE loop.

If the ThrottleManager has detected an IP address or multiple IP addresses that have made over 100 requests in ten seconds, it issues a publication of a banlist. This publication is made directly to all participating MapChat services participating in the loop. These MapChat services subscribe to the ThrottleManager. Once a service has updated its local banlist from the ThrottleManager, it cross-checks new incoming requests to decide whether or not to serve or reject the request. Requests made from IPs on the banlist are rejected, whereas requests made from IPs not on the banlist are served.

### Alternative Architecture Review

Instead of having a logging agent per node, or giving participating services the responsibility of local logging, instead there will be a component that intercepts all requests made by clients. This component will act as a proxy that forwards accepted requests to the load-balancer. The component will be responsible for logging every single incoming request, and sending it to a remote DB. This accounts 

The remote DB will be polled similarly by a singleton ThrottleManager, which will go through the same actions as described above under the chosen architecture. The difference here will be that the interceptor component will be subscribed to the ThrottleManager, as opposed to the individual MapChat services subscribing. The intercepting component will reject or forward requests to the load-balancer depending on whether the IP address is contained in the banlist or not. 

### Advantages of the chosen architecture

With respect to the alternative architecture, one of the advantages of the chosen architecture is evolvability. By having a node-level logging agent, it will be possible to extract much more detailed and granular log information. For example, if there is an issue with a certain pod on a certain node, that information will be available to be sent to the ThrottleManager -- or top another new analysis component if for example the requirements of the ThrottleManager change or new requirements are added. Additionally, system information about the status of the node itself becomes accessible with the node-level agent, making a whole other dimension of the system health and information available to potential new autonomic manager components.

### Disadvantages of the chosen architecture

With respect to the alternative architecture, the chosen architecture is more complex, and comes with more potential issues and failures during development and deployment. So, there is a disadvantage concerning maintainability. Also, with a larger number of steps to complete before an IP address makes its way to all participating services’ local banlist, that address may have already used up a considerable amount of system resources. That is to say, the alternative architecture may have a performance advantage over the chosen architecture.

A major issue with the chosen architecture is keeping each participating service updated with the correct BanList. Once the ThrottleManager has determined that an IP needs to be banned, it has to distribute that directive to every participating component. With the alternative architecture, there is only one single subscription to the ThrottleManager. There is no need to have node-level agents implemented with the alternative, and there is no need to have each relevant service creating logs, making the implementation and system simpler overall, and creating a separation of concern.

### MapChat IP Throttling System
<img src="https://github.com/chrisboyd/MapChat/blob/master/Enhancement/images/Logging_System.png" alt="logging_system">


## Lessons Learned

For this project, the team encountered several problems from start to finish. At first, we spent a good amount of time deciding upon how to implement the architecture and different services. The team started off by deciding to use Node JS and to implement the application, however during the earlier implementation process it became clear that to switch from one webpage to the next, the process was quite tedious and incorporating the database (with all the users login information) would be quite difficult, so the team decided to try another approach using dynamic web application on eclipse. This approach got the front end started with the login page and main page of MapChat, and the backend team with Mapping services. Once the implementation process started, the two teams (frontend and backend) ran into requirement miscommunication, and as a result, the frontend ended up implementing part of the backend service. This caused duplication of efforts. Even with the things going in order, the team seemed to be running into several other miscommunication problems, and therefore, several other changes had to be made to both ends of the implementation. 

The team continued with implementation until it was complete before moving onto deployment. This was a mistake. Someone should have been tasked with taking the current implementation and attempting to deploy it. Had we done so, many of the issues would have been reached sooner and given the team more time to find a solution, thus saving some long nights. From our research Netflix created Eureka explicitly for running their microservice architecture on AWS[10] so it was assumed to be easy to deploy. Unfortunately we were never able to get the services to connect with the Eureka server despite it running and being reachable from outside of AWS. If the team had started off with AWS-native solution instead, it would have saved a huge amount of time. Going forward, the AWS-native solution presented here will benefit from being well integrated throughout the whole DevOps cycle.

Therefore, the biggest problems faced by the team were time management and miscommunication. The team walked back on some of the tools that make Agile software development successful, mainly using kanban cards. Going forward this will be given more attention to better assign tasks and have those tasks clearly defined.

## Conclusions

Throughout the process of creating the application we came across several difficulties that were mostly related to us being new to working with some of the frameworks that we used. However, when properly understood and applied they made creating and working on this project easier. For example, Spring Boot created an easy environment to make REST API calls for GET, POST, PUT and DELETE commands since there are many annotations available that reduce the amount of code to write [10]. Furthermore, when comparing to other big companies and their application it is easy to see that the microservice-style architecture shares many advocates. It is the go to way to develop web applications and its usage is only increasing. Therefore, using and experimenting this software is a valuable lesson for all group members since it can help them develop future projects [11].


## References
    
[1]M. Hall, "Facebook | Overview, History, & Facts", Encyclopedia Britannica, 2020. [Online]. Available: https://www.britannica.com/topic/Facebook. [Accessed: 13- Nov- 2020].
[2] A. Balalaie, A. Heydarnoori, P. Jamshidi, Microservices Migration Patterns, Technical Report No. 1, TRSUT-CE-ASE-2015-01, Automated Software Engineering Group, Sharif University of Technology, October, 2015 [Available Online at http://ase.ce.sharif.edu/pubs/techreports/TR-SUT-CE-ASE-2015-01-Microservices.pdf]
[3] O. Elgabry, "Microservices with Spring Boot — Intro to Microservices (Part 1)", Medium, 2020. [Online]. Available: https://medium.com/omarelgabrys-blog/microservices-with-spring-boot-intro-to-microservices-part-1-c0d24cd422c3. [Accessed: 13- Nov- 2020].
[4]"How to Break a Monolith Application into Microservices with Amazon Elastic Container Service, Docker, and Amazon EC2 | AWS", Amazon Web Services, Inc., 2020. [Online]. Available: https://aws.amazon.com/getting-started/hands-on/break-monolith-app-microservices-ecs-docker-ec2/ [Accessed: 13- Nov- 2020].
[5] A. Balalaie, A. Heydarnoori and P. Jamshidi, "Microservices Architecture Enables DevOps: Migration to a Cloud-Native Architecture," in IEEE Software, vol. 33, no. 3, pp. 42-52, May-June 2016, doi: 10.1109/MS.2016.64. [Online] Available: https://ieeexplore.ieee.org/document/7436659
[Accessed: 13- Nov- 2020].
[6] "Spring Framework", Spring.io, 2020. [Online]. Available: https://spring.io/projects/spring-framework. [Accessed: 13- Nov- 2020].
[7]"2. JPA Repositories", Docs.spring.io, 2020. [Online]. Available: https://docs.spring.io/spring-data/jpa/docs/1.5.0.RELEASE/reference/html/jpa.repositories.html. [Accessed: 13- Nov- 2020].
[8]M. Yap, "Scaling Your Amazon RDS Instance Vertically and Horizontally | Amazon Web Services", Amazon Web Services, 2020. [Online]. Available: https://aws.amazon.com/blogs/database/scaling-your-amazon-rds-instance-vertically-and-horizontally/. [Accessed: 13- Nov- 2020].
[9]G. Parimi, "Securing Spring Boot Microservices with JSON Web Tokens (JWT) - DZone Microservices", dzone.com, 2020. [Online]. Available: https://dzone.com/articles/securing-spring-boot-microservices-with-json-web-t. [Accessed: 13- Nov- 2020].
[10]"Spring Boot Reference Guide", Docs.spring.io, 2020. [Online]. Available: https://docs.spring.io/spring-boot/docs/2.0.9.RELEASE/reference/html/. [Accessed: 15- Nov- 2020].
[11]P. Francesco, I. Malavolta and P. Lago, "Research on Architecting Microservices: Trends, Focus, and Potential for Industrial Adoption", 2017 IEEE International Conference on Software Architecture (ICSA), 2017. Available: https://ieeexplore.ieee.org/abstract/document/7930195. [Accessed 15 November 2020].



<!-- CONTACT -->
## Contact
### FiveGuys Software 
* Chris Boyd - chrisboyd360@gmail.com
* Mason D’Arcy - masondarcy@gmail.com
* Marc Chami - whimm337@my.yorku.ca
* Indeep Singh - indeep.singh99@gmail.com
* Raza Memon - raza9999ali@gmail.com

Project Link: [https://github.com/chrisboyd/MapChat](https://github.com/chrisboyd/MapChat)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [GitHub Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [AWS Educate](https://aws.amazon.com/education/awseducate/)
* [Best README Template](https://github.com/othneildrew/Best-README-Template)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/chrisboyd/MapChat/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/chrisboyd/MapChat/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/chrisboyd/MapChat/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/chrisboyd/MapChat/blob/master/LICENSE
[product-screenshot]: images/screenshot.png
