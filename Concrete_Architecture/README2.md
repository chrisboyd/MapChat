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
  * [Architecture Review](#architecture-review)
  * [Report Overview](#report-overview)
* [Architecture](#architecture)
  * [Conceptual Architecture Review](#conceptual-architecture-review)
  * [Concrete Architecture Diagram](#concrete-architecture-diagram)
  * [Concrete Architecture Description](#concrete-architecture-description)
  * [Architecture Quality Attributes](#architecture-quality-attributes)
    * [Availability](#availability)
    * [Performance](#performance)
    * [Modifiability](#modifiability)
    * [Security](#security)
  * [Package Diagram: MapGroup](#package-diagram-mapgroup)
  * [Use Case: CreateMapGroup](#usecase-create-mapgroup)
  * [Sequence Diagram: CreateMapGroup Use Case](#sequence-diagram-createmapgroup-use-case)
  * [Deployment Diagram](#deployment-diagram)
    * [Deployment Diagram Description](#deployment-diagram-description)
    * [Alternative Deployments Considered](#alternative-deployments-considered)
* [Interfaces](#interfaces)
  * [Client Website](#client-website)
    * [Protocols Used](#protocols-used)
    * [Message Format](#message-format)
  * [User Microservice](#user-microservice)
    * [Protocols Used](#protocols-used)
    * [Message Format](#message-format)
  * [MapGroup Microservice](#mapgroup-microservice)
    * [Protocols Used](#protocols-used)
    * [Message Format](#message-format)
  * [Map Microservice](#map-microservice)
    * [Protocols Used](#protocols-used)
    * [Message Format](#message-format)
* [Lessons Learned](#lessons-learned)
* [Conclusions](#conclusions)
* [References](#references)
d
<!-- Abstract  -->
## Abstract

Context: MapChat is a hyper-local social network with an exponential user-growth model. During the team’s architecture proposal phase a microservices-based design was selected as the most capable of supporting the rapid growth[1][2] and changing requirements of a successful social-network. In transitioning from the architecture proposal to implementation many components have evolved.

Objective: Our intention was to design an architecture that provides the structure to implement a small number of initial use cases while also supporting rapid development to meet all use cases. Success will prove the validity of a microservices architecture by leveraging existing systems wherever possible to promote continuous deployment and easy expansion of MapChat. 

Implementation Methodology: We wanted to start with a familiar technology in Java. Spring Boot provided an ideal framework for developing Java code into a web application. This code could then be encapsulated within a set of Docker images for deployment on Amazon Web Services (AWS).  

Results: While successful, the implementation did not proceed without overcoming some deficiencies in the pre-implementation planning. Initially the implementation was carried out on a local system making use of Netflix’s Eureka for client discovery and a Zuul API Gateway[3]. Unfortunately, the transition to AWS was not compatible with our implementation of Eureka and Zuul. Despite much effort we were unable to succeed in transitioning from local to the cloud. At this point the team was able to leverage the modular nature of the base Java / Spring Boot microservices contained within Docker images. This modularity allowed the removal of Eureka and Zuul for AWS-native solutions. In particular, we were able to employ AWS’s Elastic Container Service and Elastic Load Balancing with Target Groups to deploy our microservices[4] with minimal changes to the initial code base. 

<!-- Introduction -->

## Introduction
MapChat will be hosted on AWS. Further technologies are still being discussed. Any recommendations will be greatly appreciated and rewarded with a digital pint of beer.

### MapChat Overview
Current social networks are based around producing as large and widely-distributed groups as possible. While this approach is useful for remaining in contact with people all over the world and promoting your own social brand, it provides little value in increasing your quality of life on a day-to-day basis. MapChat seeks to promote and maintain a new form of hyper-local groups.

A hyper-local group means focusing on a small geographic area. MapChat would create/maintain this new form of hyper-local groups by allowing the users to create a new community or join an existing one. The creation of a community is based on a geographical location. A community can be open for all or have restricted access, depending on the creator’s desires. Every group on the map can create their own flag. A prolific group’s flag can be a marker for adventure, thereby leading other groups to explore a new community or attraction. Each flag is linked with a picture and brief description of the area written by the group. MapChat will also have a messaging system so the users can communicate and build a vibrant community. Ultimately, the purpose of MapChat is to encourage our users to seek other adventurers in their neighbourhood.


### Architecture Review
During the Architectural Proposal Phase, the MapChat team reviewed multiple potential architectural patterns for the implementation of our hyper-local social network. Including, but not limited to: Model-View-Controller, Monolithic, n-tier and microservices. It was determined that the modular nature of microservices best fit our requirement for a dynamic system that could be quickly scaled in both concurrent users and scope of implementation[5]. We feel this decision will be further validated when additional features are requested. Our microservices architecture will be adaptable and expandable with minimal changes to existing, tested and deployed systems.

### Report Overview

Having selected the microservices architecture, this report will detail how the architecture has evolved from the proposal to the current implementation. This evolution and implementation will be examined through several sets of diagrams and models of analysis.
* From concept to implementation: an analysis of what architectural changes were required for the implementation. The primary differences being the removal of a distinct API Gateway and the event bus for inter-service communication.
* Detailed description of the high level architecture: including the communication and technologies leveraged for each component.
* Quality attributes: identify what MapChats non-functional requirements are and how they affected our architectural evolution and implementation
* Package diagram: detailed UML-diagram for the MapGroup service, being the core microservice of the implemented use case.
* Use case: showing the process of a logged in User creating a MapGroup by providing a name, location and range (distance from location) for the group.
* Sequence diagram: showing the complete interaction of components for the use case of creating a new MapGroup.
* Component diagram: describes the interfaces provided by each service and which services interact with one another.
* Deployment diagram: outlines the AWS technologies used to enable continuous deployment and allow for rapid scaling to meet a growing user base.
* Interfaces: detailed overview of each components interface including communication protocols and messages.
* To close out the report we will summarize the results and cover some key lessons learned during the concrete architecture and prototype phase.

<!-- Architecture -->
## Architecture

### Conceptual Architecture Diagram

Link the image here

### Conceptual Architecture Review

Early in the Architectural Proposal Phase the MapChat team came across the microservices pattern and, from the start, it felt right conceptually. The thought of continuously deploying small services that could be self-contained and deployed in the cloud quickly became the most viable option in our minds. In hindsight, our opinion on this has not changed. Our failing during the proposal phase was in leaving the design too far on the conceptual side. More research investigating available technologies for implementation and deployment would have saved a great deal of effort. As such, there were several changes made to the conceptual architecture during the implementation phase:

* Removal of distinct API Gateway: using AWS Target Groups allows for routing of REST API calls and load balancing amongst active instances of microservices without the need for an additional layer to manage, such as the proposed API Gateway.
 
* Removal of Event Bus: during implementation we discovered that our microservices had minimal interaction that eliminated the need for an additional layer of complexity and development incurred by including the event bus. Instead the services use the same REST API interface provided to the client.

* Removal of separate Authentication Server: a secondary service for authentication was deemed irrelevant and the authentication will be incorporated into the User microservice.

* Incorporate Messaging Service into Group Service (and rename MapGroup): it was determined that these two services were too tightly coupled to justify having separate services.

* Incorporate Friend Service into User Service: as with messaging and groups, implementation quickly showed that these services were not unique enough to warrant separation.

* Removal of Services: the number of services was greatly reduced to what was necessary for the early stages of prototyping for MapChat.

### Concrete Architecture Diagram

Link image here

### Concrete Architecture Description

* Mobile Client: Static website hosted on GitHub Pages to demonstrate the implemented Use Case of creating and viewing a MapGroup.
* AWS Application Load Balancer and Target Groups: Together these replace the API Gateway of the proposed architecture.
  * Load Balancer routes traffic to the desired microservice based on the URL path of the client’s HTTP request as defined in the Target Groups. This will allow the team to enable new features via new microservices with a small update to the client side code and the creation of a new Target Group.
* User / MapGroup / Map Microservices: Each microservice uses the 3-tier architecture internally and is developed using Java and the Spring Boot Framework (see Class Diagram) [6]. 
* Each service provides a REST API and implements GET/POST/PUT/DELETE using JSON for data exchange (see External Interfaces for details).	
* Each service has a dedicated mySQL database and communicates through Spring’s Data JPA Interface over SSL [7] (see External Interfaces for details).
  * The databases will not be capable of read/write horizontal scaling in tandem with the attached microservice. However, by taking advantage of AWS’s vertical and read-only horizontal scaling we felt it was a reasonable trade off for implementation efficiency [8].
* Each microservice is deployed within their own Docker container using AWS Elastic Container Registry running on AWS Elastic Container Service (see Deployment Diagram for details).
* User Microservice: responsible for creating, updating user information and authentication of users with by means of  JSON Web Tokens[9].
* MapGroup Microservice: responsible for organization of the MapGroups, which consists of: a unique mapId, a set of users in the group, the messages sent between said users via a chat window communal to the whole group and image posted to the MapGroup.
  * MapGroup has two databases due to the incorporation of the Messaging Service from the Conceptual Architecture.	
  * MapGroup uses the same REST API to interact with both User and Map.
* Map Microservice: responsible for interacting with the Google Maps API to retrieve a map for at a given latitude and longitude with a range, in meters, from said point.
  * Early prototypes will store/use a static copy of the map stored within the database while future versions will use a dynamic version capable of seeing public flags posted near the user’s current location.

### Architecture Quality Attributes

#### Availability

In order to achieve a higher availability (greater than 99%), MapChat will use the retry design tactic and redundancy. For example, If a POST REST request to the MapGroup service fails to get a response, the rest request will be automatically retried. If the retry fails, the load-balancer will send the request to a redundant copy of the MapGroup service.

##### Availability Concrete Scenario

Link image

#### Performance

The response time of our services is important to the end-users. For example, in the PostMedia use case when a user posts an image to the map, it should have a response time (update the image on the map) of less than 5 seconds 90% of the time.

The design tactics Mapchat will use to achieve this is to directly increase resource capacity on the cloud. Additionally, using a load balancer, MapChat can maintain multiple computational copies.


##### Performance Concrete Scenario

Link image

#### Modifiability

By using independent microservices, MapChat is highly modular. With a much more granular set of components, the system can run into issues with complexity if many components are added and suffer performance issues from inter-service communication. 

In order to increase performance, one change might be to merge the MapGroup and Map service components. To reduce the development time of this kind of change, the design tactic of deferring bindings can be employed. Services will be bound at runtime by using name servers, to reduce the complexity of modifying the system.


##### Modifiability Concrete Scenario

Link image

#### Security

MapChat will be saving media that many users may deem private, and the collection of images they have posted in their MapGroup may also expose details about their habits and other relationships. Thus, keeping this data private from attackers is a high priority and quality attribute of MapChat. 

In order to achieve this quality attribute, MapChat can use the design tactic of verifying message integrity and authorization -- rejecting unauthorized attempts to access the MapGroup service. Additionally, creating logs of unauthorized access attempts will help to identify attackers and block their IP addresses (revoke access).


##### Security Concrete Scenario

Link image

### Package Diagram: MapGroup

link image

### Use Case: CreateMapGroup

Participating Actors
* End-user
Entry Condition
* User is logged on
* User has access to primary dashboard
Normal Flow of Events
* User navigates to the Create MapGroup activity
* System prompts User for a MapGroup name
* User selects a name for the new MapGroup
* System prompts End-user for an origin latitude and longitude
User selects origin latitude and longitude
* System prompts user for a range parameter
* User submits information
Exceptions
Create MapGroup Fails 
* Invalid latitude and/or longitude
Exit Condition
* User is redirected to the MapGroup activity of the newly created MapGroup

### Sequence Diagram: CreateMapGroup Use Case

link image

### Component Diagram

link image

### Deployment Diagram

link image

### Deployment Diagram Description

In hindsight, the failure of deploying the locally-developed implementation will be a positive in the long run. Now the deployment relies on proven systems in Amazon’s Elastic Container Registry, Elastic Container Service, Elastic Compute Cloud, Relational Database ServiceLoad Balancer and Target Groups which are all designed to work together seamlessly. With minimal effort and no code changes we are able to vertically scale our deployment by allocating more powerful EC2 instances and horizontally scale by adding more EC2 instances to the pool.
Going forward the MapChat team will be able to make strong use of these existing platforms and DevOps strategies to continuously build and deploy updates through the GitHub, Docker Hub Amazon ECR and ECS deployed on scalable EC2 instances pipeline.

### Alternative Deployment's Considered

Upon the initial deployment troubles the team had a back-up plan of enabling the system to run on a team members local system and allocating a static IP address from their network provider. This was considered a last ditch option, but it was considered. Fortunately we did not have to cross this path in the end.

## Interfaces

### Client Website

Protocols Used
* HTTP
Message Format
* REST: GET, POST, PUT and DELETE with JSON to each of User, MapGroup and Map microservices (details for each outlined below)

### User Microservice

Protocols Used
* HTTP, SSL (for database connection)
Message Format
* GET
  * Input: JSON
    *{"id": 1}
  * Response: JSON
* POST
  * Input: JSON
    * { "firstName": "Fingolfin", "lastName": "High King of the Noldor", "email": "valiant@gmail.com", "phoneNumber": "121-589-1453"}
  * Response: JSON, id’s are automatically generated
    * { “id”: 5, "firstName": "Fingolfin", "lastName": "High King of the Noldor", "email": "valiant@gmail.com", "phoneNumber": "121-589-1453"}
* PUT
  * Input: JSON, existing id will update their information, non-existing id will create a new User with the provided information
    * { “id”: 5, "firstName": "Fingolfin", "lastName": "High King of the Noldor", "email": "valiant@gmail.com", "phoneNumber": "358-589-1453"}
  * Response: JSON
    * { “id”: 5, "firstName": "Fingolfin", "lastName": "High King of the Noldor", "email": "valiant@gmail.com", "phoneNumber": "358-589-1453"}
* DELETE
  * Input: JSON
    * {“id”:5}
  * Response: Status 200, OK
* SSL for Database Connection: Managed through the Spring Data JPA interface, further details at [7].

### MapGroup Microservice

Protocols Used
* HTTP, SSL (for database connection)

Message Format
* GET
  * Input: JSON
    * {“id”:28}
  * Response: JSON, where members is a list of member id’s and map is the mapId
    * Note: MapGroup media is not currently implemented, once it is a link to the media attached to the MapGroup will be included in the responses
    * { "createdAt": "2020-11-12T22:48:30.955+00:00", "updatedAt": "2020-11-12T22:48:30.955+00:00", "id": 28,  "name": "Pyongyang", "members": "1,2", "map": 37} 
* POST
  * Input: JSON
    * {  "name": "Gondolin", "mapId": 33, "members": "1,2"}
  * Response: JSON, id’s are automatically generated
    * { "createdAt": "2020-11-12T22:48:30.955+00:00", "updatedAt": "2020-11-12T22:48:30.955+00:00", "id": 30,  "name": "Gondolin", "members": "1,2", "map": 33}
* PUT
  * Input: JSON, existing id will update the group information, non-existing id will create a new MapGroup with the provided information
    * { “id”:30, "name": "Gondolin", "mapId": 33, "members": "1,2,3,4"}
  * Response: JSON
    * { "createdAt": "2020-11-12T22:48:30.955+00:00", "updatedAt": "2020-11-12T22:48:30.955+00:00", "id": 30,  "name": "Gondolin", "members": "1,2,3,4", "map": 33}
* DELETE
  * Input: JSON
    * {“id”:30}
  * Response: Status 200, OK
* SSL for Database Connection: Managed through the Spring Data JPA interface, further details at [7].

### Map Microservice

Protocols used
  * HTTP, SSL (for database connection)
Message Format
* GET
  * Input: JSON
    * {"id":37}
  * Response: JSON
    *  {"id": 37, "longitude": 125.73303223, "latitude": 39.02291795, "range": 10 }
* POST
  * Input: JSON
    * { "longitude": 145, "latitude": 45, "range": 101}
  * Response: JSON, id’s are automatically generated
    * { "id": 43, "longitude": 145.0, "latitude": 45.0, "range": 101 }
* PUT
  * Input: JSON, existing id will update the map information, non-existing id will create a new Map with the provided information
    * { "id": 43, "longitude": 145.0, "latitude": 45.0, "range": 55 }
  * { "id": 43, "longitude": 145.0, "latitude": 45.0, "range": 55 }
* DELETE
  * Input: JSON
    * {“id”:30}
  * Response: Status 200, OK
* SSL for Database Connection: Managed through the Spring Data JPA interface, further details at [7].

## Lessons Learned

* Further investigation of technologies needed during proposal phase
  * Spent many hours figuring out basics of implementation, various techniques for service discovery, service interaction, 
* Research deployment before beginning implementation
  * Back-end: couldn’t figure out how to use Netflix’s Eureka and Zuul within AWS, should have started with AWS-native solutions would have saved a huge amount of time and effort
     * Positive was deployment issues highlighted positives of microservice architecture and Spring Boot Framework: transition from Eureka/Zuul to AWS-native required removing 2 lines of code from each microservice and 1 line from a configuration file
     * Problems with deployment were very hard to troubleshoot, and this comes into a problem with microservices of isolating faults. In the initial transition from local development to deployed on AWS the process started well. We were able to get the services in Docker containers and the ECS and ECR systems configured on AWS. The Eureka server even ran and was reachable from the instances URL. However, none of the other services were able to connect with the eureka server or Zul gateway. They would load and run, but consistently fail to connect to any other resources. The only source of information to attempt to track down a solution was the java exception being thrown and the hope that others had the same issue. Neither of which produced a solution that worked for us. 
  * Front-end: ran out of time to succeed in deploying initial prototype to AWS, which also highlighted another issue learned, communication and lack of awareness for concurrent work 
     * Team was not clear on requirements for front end and there was a disconnect from front and back-end development leading to a duplication of work on the front end (creating databases) for components that were in the back-end domain
  * When researching implementation tutorials give strong preference to newer tutorials, was many hours into a seemingly perfect Microservices with Spring Boot Tutorial [3] that addressed all of the basics
    * Code was several versions behind and determining how to adapt to current versions was not clear, team was fortunate that a fork of tutorial code was created by a third party which addressed shortcomings in the tutorial
  * Better time management, without a project extension, completion would have been near impossible and the end result would have shown poorly. The team spent close to a week in unstructured research that did not produce any worthwhile results
* The team walked back on some of the tools that make Agile software development successful, mainly the use of kanban cards, going forward this will be given more attention to better assign tasks and have those tasks clearly defined

## Conclusion

* Despite implementation difficulties the team is satisfied with the choice of the microservices architecture. 
  * Spring Boot has turned out to be a wonderful framework that made many things easier than expected
    * Mapping get/post/put/delete REST API calls is straightforward, many annotations that limit amount of code written[10]
  * Research shows that microservice-style architecture is the way web development is progressing so getting some experience with the style will provide the team members a lot of insight to bring to future projects[11]

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
