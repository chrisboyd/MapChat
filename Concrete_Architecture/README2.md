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
From concept to implementation: an analysis of what architectural changes were required for the implementation. The primary differences being the removal of a distinct API Gateway and the event bus for inter-service communication.
Detailed description of the high level architecture: including the communication and technologies leveraged for each component.
Quality attributes: identify what MapChats non-functional requirements are and how they affected our architectural evolution and implementation
Package diagram: detailed UML-diagram for the MapGroup service, being the core microservice of the implemented use case.
Use case: showing the process of a logged in User creating a MapGroup by providing a name, location and range (distance from location) for the group.
Sequence diagram: showing the complete interaction of components for the use case of creating a new MapGroup.
Component diagram: describes the interfaces provided by each service and which services interact with one another.
Deployment diagram: outlines the AWS technologies used to enable continuous deployment and allow for rapid scaling to meet a growing user base.
Interfaces: detailed overview of each components interface including communication protocols and messages.
To close out the report we will summarize the results and cover some key lessons learned during the concrete architecture and prototype phase.

<!-- GOALS -->
## Goals

* Creation and deletion of user accounts
* Creation and removal of hyper-local groups
* Discovery of nearby groups
* Post location-related media to group members
* Interaction of group members

The overall goal of MapChat is to help individuals build a group based on venturing out in the world. 
This group is maintained with our messaging system. Other groups can be discovered by viewing public flags in your area. Users can either use MapChat to find existing groups in an area or create a new group to invite others to join. MapChat places a strong emphasis on privacy and no data will be shared with third parties.


<!-- SOCIAL BENEFITS -->
## Social Benefits

Anyone that has travelled alone or moved to a new city or neighbourhood has felt the frustration of trying to connect with new people in their area. MapChat will give users the ability to quickly create a new social network on the fly, wherever they may be in the world. With local users placing descriptive flags in communities, tourists will be able to rely on verified locals for travel destinations and tips. Finally, MapChat is focused on connecting people to build a strong sense of community centered around shared adventures.

<!-- ECONOMIC BENEFITS -->
## Economic Benefits

Aside from the secondary economic benefit of promoting individuals to socialize, MapChat’s long term goal is to develop a partnership model with local businesses. Using this framework, businesses would be able to offer short term deals to any active local MapChat groups. By using these partnerships MapChat will not have to rely on general ad placements that negatively affect the user experience. This is a business advantage that does not exist with other applications. Additionally, MapChat has a wide target audience with very little restrictions. It will include anyone who wants to connect with other adventurous locals and get to know an area and all of its hidden secrets. 

<!--VALUE BEYOND EXISTING PLATFORMS -->
## Value Beyond Existing Platforms

Many of MapChat’s features exist across other platforms. MapChat bundles a unique set of them. For example, Facebook Messenger allows users to add friends, share media, and create groups. Google My Maps allows users to associate media with map-flags and share them. These are all features planned for MapChat. 

Where other social networking platforms attempt to implement everything, MapChat aims to implement only what is necessary to promote social interaction. Similar apps have a lot of features, for example, Facebook’s wall, timeline, inbox, and video calls. By paring these features down, the service will be much more accessible to users.

Due to the geographical constraints of the app, users are required to interact with the people in their immediate environment which enables easily accessible, in-person connections. The service becomes a game, allowing users to create and build up an area with friends, new or old. 

One new feature MapChat introduces is the idea of hidden map-flags, where the media must be unlocked by visiting the location. These hidden-flags could be time-sensitive and consumable (disappear upon discovery). Another idea would be to make the flags themselves hidden, and push a notification to the user when they happened upon them near the physical location. 

<!-- USER STORY -->
## User Story

* Story Name: Join an existing MapChat Social Group
* Description: User wants to find an existing Social Group so they can make new friends
* Conversation:
  * What is User’s activity goal with their new friends?
  * When does User want to perform said activity?
  * What are User’s requirements for a new Social Group?
    * Selections for: age, distance, gender, interests
  * How long does User want to be a part of their new Social Group?
* Confirmation:
  * As a user can I find local Social Groups?
  * As a user can I join local Social Groups?
  * As a user can I interact with other members of the local Social Group?
  * As a user can I leave a local Social Group?
  
<!-- PRIORITIES -->
## Priorities
**Priority 1**
1. Users can sign up for an account through an account creation process. 
1. Users can login through a login process.
1. Users can create a map-group by selecting a location.
1. Users can invite other users to join their own map-group. 
1. Users can upload a photo or video to a map-group (through mobile app), where it will appear as a flag for other users to interact with. Media has the coordinate meta data.
1. Users can select a flag in a map-group (mouse-click, touchscreen press), that will launch the picture or video for viewing.
1. Users can jump between different map-groups through a GUI.

**Priority 2**
1. Users with sufficient privileges can remove other users from a map group. 
1. A map-group interface will have a chat box.
1. A user can choose to make the content of their flag hidden, requiring another user to visit the location in order to access the content.
1. A user can create a chain of flags meant to be visited in sequence, where each node unlocks the next successive node.
1. Administrator users (those who created a map-group) can delegate group-member privileges: invitation, removal, chat-enabled, chat-muted.
1. User can choose to display only certain layers of flags. e.g: choose to only see one other user’s flags).
1. Implementation and of hidden, time-sensitive map flags.

**Priority 3**
1. Implement recommendation system for discovering new groups.
1. Enable businesses to sponsor pop-up events for groups

<!-- CHALLENGES -->
## Challenges
1. Differentiating from other services: this is very similar to Google My Maps
   1. Come up with some way to incentivize people going outside
   1. Strip down the features of My Maps to make it simpler to use
1. Map generation: This can be a blackbox in the prototype, Google Maps integration may be needed.
   1. Basic Custom map generation: scrape google maps or another service, take a static snapshot from the map
   1. Third party software or service: connect it to the system as a component
   1. Develop more advanced map generation
1. High volume of users


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the AGPL-3.0 License. See `LICENSE` for more information.



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
