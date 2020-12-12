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
  * [Enhancement Effects](#enhancement-effects)    
  * [Use Cases](#use-cases)
  * [Sequence Diagrams](#sequence-diagrams)
* [Log Entry](#log-entry)
* [Interfaces](#interfaces) 
* [Lessons Learned](#lessons-learned)
* [Conclusions](#conclusions)
* [Throttling Prototype](#throttle-prototype)
* [Code](#code)
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

### Effects of MapChat IP Throttling System on Existing Architecture

Our initial choice of going with the microservice architecture has once again been ratified by our ability to add in multiple components to enable an IP throttling system with little change to existing components. 

At a low level we added a large amount of code to write the log entries after each state change to track what the system is doing. This side of the logging system did not require any structural changes or additions other than singular lines of code that wrote to the log files. 

Looking at a higher level we added another database for a centralized log location and a service to read from said database. This sequence handled the analysis component of the self-healing loop. For the blocking of IP addresses added to the BanList we used RabbitMQ to deliver the updated BanList to each microservice. This, in turn, required some low level modifications to our code base but it was very minimal.    

### Enhancement Effects on Maintainability, Testability, Evolvability, Performance, Privacy and Security

Maintainability
Implementing the proposed enhancement will have a moderate effect on the overall maintainability of the MapChat service. The following will give a brief overview of the effects with respect to corrective maintenance. 

Corrective Maintenance
Corrective maintenance concerns rectifying errors or faults in the program code in order to ensure its fulfilling its functional requirement. Any modifications here will be initiated by recognizing a failure due to the enhancement implementations. 

Errors or issues could arise in several places, including the new ThrottleManager which reads and analyzes log data and publishes banlists, the relational database for log storage, the node-level service daemon which collects log data from shared pod storage, and the standard output logging at the MapChat microservice level. Additionally, faults or errors could occur at the microservice application level with respect to successfully subscribing to the IP ban list published by the ThottleManager component. 

The complexity and responsibilities of the new components are low. For example, the analysis of the ThrottleManager simply measures frequency of particular IP addresses over a short period. No complex analysis takes place. Logging data is also elementary, including a timestamp and IP address. Therefore, faults should be straightforward to detect and correct. 

Testability
In terms of testability, the enhancements do not present or introduce any components that will significantly frustrate testing. For example, the loop itself can be tested by running a quick succession of requests from a simulated client, say one-hundred requests in a period of five seconds. The system will detect the high frequency by analyzing the logs, then update the banlist subscribed to by the MapChat microservices. 
When testing different individual components of MapChat (for example the MapGroup service), the logging and analytical components may interfere. For example, if there was a stress-test designed to see how the service performs under high demand, it would be necessary to either turn off the ThrottleManager if the high load was being simulated by a small number of IP addresses. 


Evolvability 
Evolvability is similar to adaptive maintenance, which refers to maintenance that could arise from mutating current requirements of MapChat, or from new requirements altogether. For example, a new requirement may prompt the need to log additional information, include that information in the analysis, and add additional mitigation strategies. This requirement alteration would require changes in several components, including the local logging statements in the application services themselves, the node-level service daemon, and the relational database schema which stores the logs gathered by the service daemon. Depending on the change to the mitigation strategy, there may need to be an additional component created, or it could be folded into the existing singleton ThrottleManager component.

In the event that new services at the application level of MapChat are added, depending on their nature they may need to have logging functionality implemented to become part of the enhancement loop. Additionally, they would have to subscribe to the ThrottleManager to keep their IP ban-list updated.

Performance 
The enhancement brings a cost to certain requests made on the system, for example POST requests to create a mapgroup. At the application level, each MapChat service involved will be required to keep an updated ban-list of IPs that they periodically update by subscribing to the ThrottleManager component. These updates will need to be very frequent, in order to quickly throttle any IP that is spamming requests. Additionally, involved services will be required to cross-check requests against the banlist before servicing them. Successfully serviced requests will also need to be logged to the standard output, stored in node-level shared pod file. Altogether, this amounts to a nontrivial amount of overhead.

On the other hand, abnormal amounts of requests will be successfully throttled by the enhancement, leading to less strain on the system from individual IPs. 

Privacy 
Client privacy is an issue with the enhancement, even though it is only logging IP addresses and timestamps. MapChat will comply with each of the seven GDPR privacy principles, including lawfulness, fairness and transparency, purpose limitation, data minimization, accuracy, storage limitation, and accountability. Logs containing IP addresses and timestamps will therefore only be stored for a very limited period, with the express purpose of analyzing and detecting IP addresses that are overusing services. Logs will not be shared or sold to any third-parties.

Security
Similarly related to privacy, issues arise with the new enhancement. Not only will MapChat be storing this new log data in pod-level files and in a persistent database, but it will be relaying the banned IP addresses through communication channels between the ThrottleManager component and each subscribed service. 
If an attacker were able to gain access to the log data, they could piece together an idea of where a customer was geographically, and also by the timestamps, expose information about their habits and schedule. For this reason, it is necessary to protect the log-data with security protocols. For example, messages containing banned IP addresses sent to subscribed MapChat services will be encrypted using standard protocols including HTTPs. Authorization will be required for access to the relational database storing log-data, and the pod-level shared files. 

### Use Cases

#### Analyze Recent Logs

Participating Actors
90 end-users
Entry Condition
IP request < 100 in 10 seconds or less
Normal Flow of Events
Throttle manager checks the logs stored in logging database
Retrieves recently saved logs 
Analyzes recently saved log to check if threshold has been surpassed
Exceptions
Requests surpass 100 in less than 10 seconds
Exit Condition
Recently saved log in successfully analyzed and creates or adds to the counter of how many times that related IP has a requested a service

#### Update BanList

Participating Actors
101 end-users
Entry Condition
IP request > 100 in 10 seconds or less
Normal Flow of Events
Throttle manager checks the logs stored in logging database
Retrieves recently saved logs 
Analyzes recently saved log to check if threshold has been surpassed 
<<Event>> new BanList publishes in MapGroup Service local list
Exceptions
Less than 100 requests in less than 10 seconds
Exit Condition
BanList holds an additional IP address of the newly added subscribed user. 

### Sequence Diagrams

#### Throttling Manager Publishing a BanList

<img src="https://github.com/chrisboyd/MapChat/blob/master/Enhancement/images/throttle_manager_sequence.png" alt="throttle_sequence">

The above diagram represents how we will unsubscribe IPs and establish a banlist within our MapGroup Service. The throttler manager will retrieve newly logged data from our Logging DB (by constantly listening) and analyze whether an unnecessary amount of requests were made within a service. If it was found that the IP address being analyzed has exceeded the  threshold of requests in a period of time , a new banlist will be published. 

#### Logging sequence at node level

<img src="https://github.com/chrisboyd/MapChat/blob/master/Enhancement/images/node-level-logging-sequence.png" alt="node_logging_sequence">

This sequence diagram represents the kubernetes nodes and how they play a part in our logging enhancement. Firstly, it is important to observe the shared pod storage which will hold all logs, which can be easily accessed by daemon services at a node level.  Although, for developer use the logs will be pushed to our logging DB which will collectively hold all logs. 

#### Client Request

<img src="https://github.com/chrisboyd/MapChat/blob/master/Enhancement/images/front_end_throttling_sequence.png" alt="front_end_throttle_sequence">

Now that we have established a banlist and the sequence in which logs are made, how will we determine if a new request is allowed to be made based on our banlist? Every request made will go through the MapGroup Service, as before, where the banlist will be stored and checked in an efficient way. If the IP corresponding to the request exists on the banlist, the log will be printed out using stdout and the request will be rejected. If the IP is allowed, the log will be printed out using stdout and the action corresponding to the request will be executed.

## Log Entry

[%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} “message on a per log entry basis”
Each log entry starts with one of five standard hierarchy levels (in ascending order of importance):
* TRACE
* DEBUG
* INFO
* WARN
* ERROR
* FATAL

Currently MapChat makes use of INFO for all status messages such as a REST controller receiving a request and ERROR for the notice that an IP address has breached the request threshold and has been added to the BanList.

Sample Log File: 
https://github.com/chrisboyd/MapChat/blob/master/Enhancement/mapgroup.log

## Interfaces

### Writing to Log Files

Each pod writes to their respective log file through the stderr interface. Our logging system uses a policy to roll the log file over once it reaches 10MB. At which point a new log file will be created and the old one compressed.

### DaemonSet writing to Log Database

DaemonSet uses a standard SSH connection to write to the SQL database.

### ThrottleManager
* JPA interface to read from the log entry database.
* RabbitMQ to publish the BanList for MapChat microservices to subscribe too 

## Lessons Learned

Adding the logging and self-healing loop presented an interesting learning experience for the team. None of us had any experience with a logging framework before or, even, an awareness of how prevalent and mature they are. In hindsight this should be obvious but it was a collective blindspot in our knowledge. At first the concept of logging every state change the code goes through seems like a great deal of inefficiency and overhead. Looking into the performance of the Log4j2 and it becomes apparent that the overhead cost is minimal [3]. We barely took a step down the path of analysis, but here too, there is a lot for us to explore in future iterations of MapChat. Further steps must be taken for us to better develop as professional software engineers. 
Fortunately the team did put into practice some lessons learned from the previous deliverable. We had a much clearer division of responsibility and lines of communication that led to little wasted efforts and more concurrent work. 


## Conclusions

The MapChat feels as though we have implemented a robust base logging system that allows us to add a great deal of functionality through complex analysis in the future. This follows our goals from the start of the project of building a modular system that can be easily evolved to cover many unforeseen use cases and additions.

## Throttling Prototype

If you press the 'Log Error' button it will simulate a user breaching the request threshold and trigger an error log entry. It will send an email to mapchatlogger@gmail.com. 

https://masondarcy.github.io/

## Code

https://github.com/chrisboyd/mapchat-microservices/tree/aws

## References
[1]"Throttling pattern - Cloud Design Patterns", Docs.microsoft.com, 2020. [Online]. Available: https://docs.microsoft.com/en-us/azure/architecture/patterns/throttling. [Accessed: 03- Dec- 2020]

[2]R. Goers, "Getting the most out of the Log4j 2 API", Ralphgoers.com, 2020. [Online]. Available: https://www.ralphgoers.com/post/getting-the-most-out-of-the-log4j-2-api. [Accessed: 03- Dec- 2020]

[3]R. Popma, "Log4j – Performance", Logging.apache.org, 2020. [Online]. Available: https://logging.apache.org/log4j/2.x/performance.html. [Accessed: 03- Dec- 2020]




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
