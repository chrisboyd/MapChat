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

  <h1 align="center">MapChat Architecture Proposal</h1>
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
* [Introduction and Overview](#introduction-and-overview)
  * [Summary](#summary)
  * [Report Organization](#report-organization)
  * [Architecture Design Process](#architecture-design-process)
  * [MapChat Team Organization](#mapchat-team-organization)
  * [Conclusion Summary](#conclusion-summary)
* [Requirements](#requirements)
  * [End-User Requirements](#end-user-requirements)
  * [MapGroup Requirements](#mapgroup-requirements)
  * [Non-Functional Requirements](#non-functional-requirements)
* [Architecture Comparison](#architecture-comparison)
  * [Microservice Architecture](#microservice-architecture)
  * [Model-View-Controller](#model-view-controller)
  * [Layered Architecture](#layered-architecture)
  * [Implicit Invocation Architecture](#implicit-invocation-architecture)
  * [Achitecture Comparison Table](#architecture-comparison-table)
* [Architecture Overview](#architecture-overview)
  * [MapChat Proposed Architecture](#mapchat-proposed-architecture)
  * [Proposed Services](#proposed-services)
  * [Activity Diagrams](#activity-diagrams)
  * [Sequence Diagrams](#sequence-diagrams)
* [External Interfaces](#external-interfaces)
* [Use Cases](#use-cases)
  * [SignUp](#signup)
  * [CreateMapGroup](#createmapgroup)
  * [SendFriendInvite](#sendfriendinvite)
  * [Use Case Diagram](#use-case-diagram)
* [Conclusions](#conclusions)
* [Lessons Learned](#lessons-learned)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- Abstract -->
## Abstract
In the beginning of MapChat's architecture design review phase, it was determined that the primary success metric of the said architecture would be the ability to quickly and efficiently scale. A social network, such as MapChat, can only be successful with a large user base. As we are starting with a very small user base, we need a system that can scale to a large number of concurrent users very quickly while also not requiring tremendous financial outlay prior to reaching a sufficient user-base to be successful. The conflicting requirements of being able to support exponential growth while limiting cash burn necessitated two things. First, MapChat will be hosted on Amazon Web Services (AWS) to keep costs in line with usage and limit initial start-up costs. Secondly, a modular architecture that can leverage AWS’s virtual resources to scale up and down in line with the number of live MapChat users. With these goals in mind, MapChat has selected a microservices-based architecture for implementation. Thanks to the highly modular nature of microservices architecture, MapChat’s small team size will be able to work in an agile manner to continuously build, test and deploy small, yet fully functional, services. In this manner MapChat will be able to develop our base functionality for release, then add further services to enhance the user experience as time goes on. With the team members all working remotely, GitHub Projects and kanban boards are being leveraged to organize our workflow and track progress.

## Introduction and Overview

### Summary
In the beginning of MapChat's architecture design review phase, it was determined that the primary success metric of the said architecture would be the ability to quickly and efficiently scale. A social network, such as MapChat, can only be successful with a large user base. As we are starting with a very small user base, we need a system that can scale to a large number of concurrent users very quickly while also not requiring tremendous financial outlay prior to reaching a sufficient user-base to be successful. The conflicting requirements of being able to support exponential growth while limiting cash burn necessitated two things. First, MapChat will be hosted on Amazon Web Services (AWS) to keep costs in line with usage and limit initial start-up costs. Secondly, a modular architecture that can leverage AWS’s virtual resources to scale up and down in line with the number of live MapChat users. With these goals in mind, MapChat has selected a microservices-based architecture for implementation. Thanks to the highly modular nature of microservices architecture, MapChat’s small team size will be able to work in an agile manner to continuously build, test and deploy small, yet fully functional, services. In this manner MapChat will be able to develop our base functionality for release, then add further services to enhance the user experience as time goes on. With the team members all working remotely, GitHub Projects and kanban boards are being leveraged to organize our workflow and track progress.

The goal of MapChat’s initial architecture design study was to find the architecture best suited to enable the product’s success. As mentioned, the microservices architecture will form the base of the system. The why and how of this choice will be examined through comparisons to other architecture styles. The architecture will be expanded upon by using various activity and sequence diagrams that show planned interactions within the system.

### Report Organization
The meat of this report is devoted to [Architecture Comparison](#architecture-comparison) and [Architecture Overview](#architecture-overview). There you will find the full discussion of why microservices was selected for the overall architecture as well as what the architecture looks like from a high-level abstraction. Multiple activity and sequence diagrams are shown in [Activity Diagrams](#activity-diagrams) and [Sequence Diagrams](#sequence-diagrams), respectively. [Use Cases](#use-cases), gives several diagrams and descriptions of the common user interactions the MapChat architecture must support.
### Architecture Design Process
The MapChat team initially discussed building a very basic prototype system with a monolithic approach. The idea was viewed as viable to allow quick and easy interface design iteration while the team determined what, exactly, the product goal of MapChat was. However, this approach was dismissed before any real work began due to it being a source of sunk resources that could not be transferred to a fully operational system. We determined that with the interface being abstracted from any business logic a team dedicated to enhancing the interface could be tasked at a later date.
Once the monolithic approach was dropped, the team researched several architectures including: MVC, layered and implicit invocation. All of which are viable for large scale web-based applications. In particular, they offer improved efficiencies in the initial development stage over a microservice architecture. However, this initial efficiency is lost in comparison to the efficiency in scaling a microservice-based approach. As scalability was defined as a key to success, this metric was given the highest weighting in our final comparison rubric. 

The research into the various architectures will still be beneficial to the final product as each microservice, being a stand-alone application, will make use of the layered architecture. 

For further details about the comparison and why the selection of microservices is best suited, see [Architecture Comparison](#architecture-comparison) and [Architecture Overview](#architecture-overview).

### MapChat Team Organization
With the MapChat team interacting virtually and having varying schedules and experience levels it was important to commit to a development process and task management technique that would foster success. MapChat, being a flat organization, and the need to accommodate changes in outside commitments left an agile process as the most applicable to our needs. MapChat has several 2-3 week sprint times, with reviews after each that could require significant system changes. This potential for consistent change prevents the team from applying a more traditional development process. 

Having the relatively consistent sprint intervals points to using a scrum framework. However, with the team needing more fluidity in roles assigned due to changing outside commitments, the kanban framework was selected. An additional benefit being that kanban is integrated into GitHub. This integration will allow the use of automated kanban cards that are tied to code issues and bugs. As issues and bugs are completed the kanban card can be automatically transferred to being ‘Done’. 

### Conclusion Summary
As a result of the MapChat team’s architecture research, the microservice architecture was determined to be best suited for scaling with MapChat’s goal of exponential user growth. The multiple individual apps that make up a microservice architecture, when deployed on AWS, can have near-instant scaling up and down to dynamically meet MapChat’s active user’s requirements. 

## Requirements

### End-User Requirements
1. An End-User can quickly and intuitively create an account
2. An End-User can add friends, send messages and create/join MapGroups
3. An End-User can terminate their account and remove all stored data
4. An End-User can post media to a MapGroup
5. An End-User can leave a MapGroup
6. The End-User should be able to report any misconduct or inappropriate behaviours by others

### MapGroup Requirements
1. Mapgroups can be created and stored persistently in the system. Mapgroups are a collection of users associated with a particular MapFlag
2. While inside the create MapGroup activity, an End-User can define a location 
3. While inside a create mapgroup activity, an End-User can set the visible scope of their MapGroup (private, public)
4. From the main dashboard, an End-User can use an interactive component to select a MapGroup they are members of and launch the respective MapGroup activity
5. An End-User in a MapGroup activity can interact with any MapFlag on the map, launching the media associated with that MapFlag into a viewport
6. An End-User can navigate between all MapGroups they are members of through a GUI component
7. End-Users with sufficient privileges can remove other users from a MapGroup
8. A MapGroup has a chatbox

### Non-Functional Requirements
1. The application should be accessible from all platforms
2. The application should be available on all platforms 24/7
3. Account details should only be accessible to the account owner 
4. The End-User should be notified about any policy updates via email, and on their MapChat account
5. MapChat will strictly follow Canada’s Personal Information Protection and Electronic Documents Act

## Architecture Comparison

### Microservice Architecture
#### Overview
The MapChat team has determined that the microservice architecture will best suit the systems needs now and for the foreseeable future. A microservice architecture is composed of a set of services that can be developed, tested and deployed to AWS independently of each other. Each service provides a REST API for communicating with the MapChat mobile app through a common gateway API. These independent services, in turn, can communicate with each other through a common event bus.

#### Advantages
* Each service can be developed, test and deployed concurrently
* Highly scalable
* Smaller code bases

#### Disadvantages
* Initial development cost higher than alternatives
* Difficult to test system as a whole
* Large number of individual databases to administer

### Model-View-Controller
#### Overview
MVC is the classic architecture for a system with some form of GUI. The user views data presented from the model and uses the controller to affect the viewed data. 

#### Advantages
* Allows the use of multiple interfaces
* Separates the system in easy to define components

#### Disadvantages
* Limited abstraction of data 
* Potential for code bloat as defined components can become all encompassing

### Layered Architecture
#### Overview
Layered architecture separates the system into a hierarchy of services. Each layer communicates with the layer directly above and below itself in the hierarchy. 

#### Advantages
* Simplicity of design and implementation
* Abstraction of data and logic at each layer

#### Disadvantages
* Limits scalability
* Potential high cost to implement new features

### Implicit Invocation Architecture
#### Overview
Implicit invocation is based around components within the system publishing events to which other components subscribe and react to.

#### Advantages
* Allows addition of new features by creating a new component that publishes new events or subscribes and reacts to existing events
* High scalability

#### Disadvantages
* MapChat would require a large number of components that are both publishers and subscribers which requires special protocol

### Architecture Comparison Table
|                      | Microservices | Monolithic | Layered | Implicit Invocation | MVC |
| ---                  |:-------------:|:----------:|:-------:|:-------------------:|:---:|
| Scalability          |X              |            |         |X                    |X    |
| Flexibility          |X              |            |         |X                    |     |   
| Resource Sharing     |X              |X           |X        |X                    |X    |
| Independent Services |X              |            |X        |                     |X    |
| Extendable           |X              |Issues      |X        |X                    |X    |
| Fault Tolerance      |X              |            |X        |                     |X    |
| Concurrency          |X              |            |X        |                     |X    |
| Openess              |X              |X           |Issues   |X                    |     |

## Architecture Overview

### MapChat Proposed Architecture
<img src="https://github.com/chrisboyd/MapChat/blob/master/Docs/Images/MapChat_Architecture_V0.3.png" alt="Architeture" width="732" height="618">


### Proposed Services
#### Overview
MapChat proposes a system that makes heavy use of the modularity offered by  microservice architecture. Every service is independent and offers a REST API for interaction through the API Gateway. The services communicate, as needed, amongst themselves through an event bus which will be implemented with Kafka or another, similar, service.

#### API Gateway 
The API Gateway is the mobile client’s interface to the services provided by MapChat. By implementing a gateway instead of a direct interaction between MapChats services and the client we are able to decouple MapChats implementation from the client. 

#### Authentication Server 
In order to simplify user authentication and remove the need for each microservice to individually implement security MapChat will make use of authentication at the gateway level. A successful authentication will then pass a JSON Web Token to each microservice.

#### Messaging Service
Implement all features related to sending, receiving and storing messages between individuals and groups.

#### Map Service
Responsible for interacting with the Google Maps API and storing a local map for the user to limit loading delays while using MapChat.

#### Flag Service
Allow users to place flags, consume other users flags and attach media to flags.

#### Media Service
Interacts with the mobile clients camera or storage to load photos and/or other media into MapChat

#### Group Service
Manage the users MapChat group creation and modification.

#### Friend Service
Maintains MapChat’s User Graph. Each user will have a set of friends managed through this service. Friends can be found through MapChat accounts, email or phone number.

#### User Service
This service maintains information about each MapChat user such as name and contact information.

#### Vendor Service
This service is intended as a future growth feature to show the expandability of the architecture. Once MapChat has reached a suitable user base we will reach out to local businesses to promote their business through pop-up flag-consumption based deals. 

#### Event Bus
Handles interservice communication.

### Activity Diagrams
#### Activity Diagrams Legend
<img src="https://github.com/chrisboyd/MapChat/blob/master/Docs/Images/activity_legend.png" alt="Legend">

#### Post Media Activity Diagram
<img src="https://github.com/chrisboyd/MapChat/blob/master/Docs/Images/post_media_activity_img.png" alt="Post Media" width="500" height="500">

#### Modify MapGroup Member Activity Diagram
<img src="https://github.com/chrisboyd/MapChat/blob/master/Docs/Images/administrator_user_activity.png" alt="Modify MapGroup" width="400" height="500">

#### Create MapGroup Activity Diagram
<img src="https://github.com/chrisboyd/MapChat/blob/master/Docs/Images/create_mapgroup_activity_hq.png" alt="Create MapGroup" >

#### Multiple Action Activity Diagram
<img src="https://github.com/chrisboyd/MapChat/blob/master/Docs/Images/end_user_activity_img.png" alt="MapChat Activity Overview">


### Sequence Diagrams
##### PostMedia Sequence Diagram
<img src="https://github.com/chrisboyd/MapChat/blob/master/Docs/Images/postmedia_sequence.png" alt="PostMedia Sequence">

#### Create MapGroup Sequence Diagram
<img src="https://github.com/chrisboyd/MapChat/blob/master/Docs/Images/create_mg_sequence_img.png" alt="Create MapGroup Sequence" >

## External Interfaces
At this stage MapChat is only determining a broad outline for the system’s external interfaces. Most importantly the system will implement the Gateway API as a means of communicating with the system. This is the external interface our mobile application will use. MapChat will also leverage the Google Maps API to implement our MapGroups feature. 

## Use Cases

### SignUp
#### Participating Actors
* End-User
#### Entry Condition
* User is inside the signup activity
#### Normal Flow of Events
* User enters their email string into the email field
* User enters their desired alphanumeric password into the password field
* User enters a duplicate password into the duplicate password field
* User submits information
* System prompts the user with success
* System gives the user a unique ID

#### Exceptions
##### Account Signup Fails
* A duplicate email exists in the system
* User enters a non-alphanumeric password (illegal characters)
* User enters a password with insufficient length (minimum 8)
* User enters a non-duplicate password in the duplicate password field

#### Exit Coniditon
* System prompts the user with success
* User is redirected to the mapchat dashboard

#### Non-functional Requirements
* Account creation success email should be dispatched to the user email within a reasonable amount of time
* Email and password data will be handled with sufficient security and privacy protocols

### CreateMapGroup

#### Participating Actors
* End-User
#### Entry Condition
* User is logged on
* User has access to primary dashboard

#### Normal Flow of Events
* User navigates to the Create MapGroup activity
* System prompts User for a MapGroup name
* User selects a name for the new MapGroup
* System prompts End-user for an origin coordinate
* User selects origin coordinate
* System prompts user for a visibility parameter
* User selects visibility scope of the MapGroup (public, private)
* System prompts End-user for default privileges of invited members
* User selects default privileges of invited members
* System prompts user to invite friends
* User selects users from their friends list (if any) to invite to the MapGroup
* User submits information

#### Exceptions
##### Create MapGroup Fails
* Invalid name (keyword restriction)

#### Exit Coniditon
* User is redirected to the MapGroup activity of the newly created MapGroup

### SendFriendInvite

#### Participating Actors
* End-User

#### Entry Condition
* User is logged on
* User has access to primary dashboard

#### Normal Flow of Events
* User selects the add friend view component from the dashboard
* System prompts User for friend ID
* User inputs friend ID
* System launches invite to friend

#### Exceptions
##### Friend is not added
* Invalid ID

#### Exit Coniditon
* User receives a success acknowledgement that the invite is sent

### Use Case Diagram
<img src="https://github.com/chrisboyd/MapChat/blob/master/Docs/Images/enduser_usercase_alternate_img.png" alt="Use Case" >

## Conclusions
As a result of the MapChat team’s architecture research, the microservice architecture was determined to be best suited for scaling with MapChat’s goal of exponential user growth. The multiple individual apps that make up a microservice architecture, when deployed on AWS, can have near-instant scaling up and down to dynamically meet MapChat load requirements. This scalability comes at a cost of a longer initial development time to implement a functioning product compared to MVC, layered or implicit invocation systems. MapChat will still utilize these alternative architectures within each microservice as applicable.

## Lessons Learned
With such a variety of architecture styles available to choose from, the initial research phase is crucial for a project to start out right. The MapChat team could have chosen a simple short-term implementation strategy, such as a layered approach. While viable, this would bring numerous headaches down the road. With this eye to the future the MapChat team has decided to face the steep climb and accept the high initial investment cost of a microservices architecture. This is a big lesson taught for us, that is, thinking ahead to keep flexibility within development and trying our best to not restrict ourselves down the road. 
One of the hurdles we have overcome was maintaining fluent workflow between team members. Since this team consists of 5 people the management overhead is relatively small. As such, shared documents for writing reports has been sufficient. To manage the work occurring within Google Docs and to keep the team operating concurrently we have made use of kanban cards integrated into our GitHub repository. At this stage the organizational management is very basic. As the project grows, particularly through the prototype iterations, more attention will have to be dedicated to task management. As the team moves into the implementation phase we will make use of automated kanban cards to efficiently track workflows.


## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the AGPL-3.0 License. See `LICENSE` for more information.

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
