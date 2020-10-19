## Team FiveGuys

```
EECS 4314: Advanced Software Engineering
https://github.com/chrisboyd/MapChat
```
# MapChat Architecture Proposal


- 1. Abstract Prepared by: Chris Boyd, Mason D’Arcy, Marc Chami, Indeep Singh and Raza Memon
- 2. Introduction and Overview
   - 2.1 Summary
   - 2.2 Report Organization
   - 2.3 Architecture Design Process
   - 2.4 MapChat Team Organization
   - 2.5 Conclusion Summary
- 3. Architecture Comparison
   - 3.1 Microservice Architecture Overview
      - 3.1.1 Microservice Architecture Advantages
      - 3.1.2 Microservice Architecture Disadvantages
   - 3.2 Model-View-Controller
      - 3.2.1 Overview
      - 3.2.2 Advantages
      - 3.2.3 Disadvantages
   - 3.3 Layered Architecture
      - 3.3.1 Overview
      - 3.3.2 Advantages
      - 3.3.3 Disadvantages
   - 3.4 Implicit Invocation Architecture
      - 3.3.1 Overview
      - 3.3.2 Advantages
      - 3.3.3 Disadvantages
      - 3.4 Architecture Comparison Table
- 4. Architecture Overview
   - 4.1 MapChat Proposed Architecture
   - 4.2 Proposed Services
      - 4.2.1 Overview
      - 4.2.2 API Gateway
      - 4.2.3 Authentication Server
      - 4.2.4 Messaging Service
      - 4.2.5 Map Service
      - 4.2.6 Flag Service
      - 4.2.7 Photo Service
      - 4.2.8 Group Service
      - 4.2.9 Friend Service
      - 4.2.10 User Service
      - 4.2.11 Vendor Service
   - 4.3 Diagrams
- 5. External Interfaces
- 6. Use Cases
   - 6.1 SignUp
      - 6.1.1. Participating actors
      - 6.1.2 Entry condition
      - 6.1.3 Normal Flow of Events
      - 6.1.4 Exceptions
         - 6.1.4.1 Account signup fails
      - 6.1.5 Exit condition
      - 6.1.6 Nonfunctional requirements
   - 6.2 CreateMapGroup
      - 6.2.1. Participating actors
      - 6.2.2 Entry condition
      - 6.2.3 Normal Flow of Events
      - 6.2.4 Exceptions
         - 6.2.4.1 Create MapGroup fails
      - 6.2.5 Exit condition
   - 6.3 SendFriendInvite
      - 6.3.1. Participating actors
      - 6.3.2 Entry condition
      - 6.3.3 Normal Flow of Events
      - 6.3.4 Exceptions
         - 6.3.4.1 Friend is not added
      - 6.3.5 Exit condition
   - 6.4 Use Case Diagrams
- 7. Conclusions
- 8. Lessons Learned


# 1. Abstract

In the beginning of MapChat's architecture design review phase, it was determined that
the primary success metric of the said architecture would be the ability to quickly and
efficiently scale. A social network, such as MapChat, can only be successful with a large
user base. As we are starting with a very small user base, we need a system that can
scale very quickly while also not requiring tremendous financial outlay prior to reaching
a sufficient user-base to be successful. The conflicting requirements of being able to
support exponential growth while limiting cash burn necessitated two things. First,
MapChat will be hosted on Amazon Web Services (AWS) to keep costs in line with
usage and limit initial start-up costs. Secondly, a modular architecture that can leverage
AWS’s virtual resources to scale up and down in line with the number of live MapChat
users. With these goals in mind, MapChat has selected a microservices-based
architecture for implementation. Thanks to the highly modular nature of microservices
architecture, MapChat’s small team size will be able to work in an agile manner to
continuously build, test and deploy small, yet fully functional, services. In this manner
MapChat will be able to develop our base functionality for release, then add further
services to enhance the user experience as time goes on. With the team members all
working remotely, GitHub Projects and kanban boards are being leveraged to organize
our workflow and track progress.

## 2. Introduction and Overview

### 2.1 Summary

The goal of MapChat’s initial architecture design study was to find the architecture best
suited to enable the product’s success. As mentioned, the microservices architecture
will form the base of the system. The why and how of this choice will be examined
through comparisons to other architecture styles. The architecture will be expanded
upon by using various activity and sequence diagrams that show planned interactions
within the system.

### 2.2 Report Organization

The meat of this report is devoted to ​3. Architecture Comparison​ and ​4. Architecture
Overview​. There you will find the full discussion of why microservices was selected for
the overall architecture as well as what the architecture looks like from a high-level
abstraction. ​4.3 Diagrams​, presents multiple sequence and activity diagrams showing
system interaction. ​6. Use Cases​, gives several diagrams and descriptions of the
common user interactions the MapChat architecture must support.


### 2.3 Architecture Design Process

The MapChat team initially discussed building a very basic prototype system with a
monolithic approach. The idea was viewed as viable to allow quick and easy interface
design iteration while the team determined what, exactly, the product goal of MapChat
was. However, this approach was dismissed before any real work began due to it being
a source of sunk resources that could not be transferred to a fully operational system.
We determined that with the interface being abstracted from any business logic a team
dedicated to enhancing the interface could be tasked at a later date.
Once the monolithic approach was dropped, the team researched several architectures
including: MVC, layered and implicit invocation. All of which are viable for large scale
web-based applications. In particular, they offer improved efficiencies in the initial
development stage over a microservice architecture. However, this initial efficiency is
lost in comparison to the efficiency in scaling a microservice-based approach. As
scalability was defined as a key to success, this metric was given the highest weighting
in our final comparison rubric.
The research into the various architectures will still be beneficial to the final product as
each microservice, being a stand-alone application, will make use of the architecture
design most beneficial to that service.
For further details about the comparison and why the selection of microservices is best
suited, see sections ​3. Architecture Comparison​ and ​4. Architecture Overview​.

### 2.4 MapChat Team Organization

With the MapChat team interacting virtually and having varying schedules and
experience levels it was important to commit to a development process and task
management technique that would foster success. MapChat, being a flat organization,
and the need to accommodate changes in outside commitments left an agile process as
the most applicable to our needs. MapChat has several 2-3 week sprint times, with
reviews after each that could require significant system changes. This potential for
consistent change prevents the team from applying a more traditional development
process.
Having the relatively consistent sprint intervals points to using a scrum framework.
However, with the team needing more fluidity in roles assigned due to changing outside
commitments, the kanban framework was selected. An additional benefit was kanban
already being integrated into GitHub. This integration will allow the use of automated


kanban cards that are tied to code issues and bugs. As issues and bugs are completed
the kanban card can be automatically transferred to being ‘Done’.

### 2.5 Conclusion Summary

As a result of the MapChat team’s architecture research, the microservice architecture
was determined to be best suited for scaling with MapChat’s goal of exponential user
growth. The multiple individual apps that make up a microservice architecture, when
deployed on AWS, can have near-instant scaling up and down to dynamically meet
MapChat load requirements.

## 3. Architecture Comparison

### 3.1 Microservice Architecture Overview

The MapChat team has determined that the microservice architecture will best suit the
systems needs now and for the foreseeable future. A microservice architecture is
composed of a set of services that can be developed, tested and deployed to AWS
independently of each other. Each service provides a REST API for communicating with
the MapChat mobile app through a common gateway API. These independent services,
in turn, can communicate with each other through a common event bus.

#### 3.1.1 Microservice Architecture Advantages

```
● Each service can be developed, test and deployed concurrently
● Highly scalable
● Smaller code bases
```
#### 3.1.2 Microservice Architecture Disadvantages

```
● Initial development cost higher than alternatives
● Difficult to test system as a whole
● Large number of individual databases to administer
```
### 3.2 Model-View-Controller

#### 3.2.1 Overview

MVC is the classic architecture for a system with some form of GUI. The user views
data presented from the model and uses the controller to affect the viewed data.


#### 3.2.2 Advantages

```
● Allows the use of multiple interfaces
● Separates the system in easy to define components
```
#### 3.2.3 Disadvantages

```
● Limited abstraction of data
● Potential for code bloat as defined components can become all encompassing
```
### 3.3 Layered Architecture

#### 3.3.1 Overview

#### 3.3.1 Overview

Layered architecture separates the system into a hierarchy of services. Each layer
communicates with the layer directly above and below itself in the hierarchy.

#### 3.3.2 Advantages

```
● Simplicity of design and implementation
● Abstraction of data and logic at each layer
```
#### 3.3.3 Disadvantages

```
● Limits scalability
● Potential high cost to implement new features
```
### 3.4 Implicit Invocation Architecture

#### 3.3.1 Overview

Implicit invocation is based around components within the system publishing events to
which other components subscribe and react to.

#### 3.3.2 Advantages

```
● Allows addition of new features by creating a new component that publishes new events
or subscribes and reacts to existing events
● High scalability
```
#### 3.3.3 Disadvantages

```
● MapChat would require a large number of components that are both publishers and
subscribers which requires special protocol
```

#### 3.4 Architecture Comparison Table

Insert here

## 4. Architecture Overview

### 4.1 MapChat Proposed Architecture

```
Fig 1. Proposed Architecture
```
### 4.2 Proposed Services

#### 4.2.1 Overview

MapChat proposes a system that makes heavy use of the modularity offered by
microservice architecture. Every service is independent and offers a REST API for
interaction through the API Gateway. The services communicate, as needed, amongst


themselves through an event bus which will be implemented with Kafka or another,
similar, service.

#### 4.2.2 API Gateway

The API Gateway is the mobile client’s interface to the services provided by MapChat.
By implementing a gateway instead of a direct interaction between MapChats services
and the client we are able to decouple MapChats implementation from the client.

#### 4.2.3 Authentication Server

In order to simplify user authentication and remove the need for each microservice to
individually implement security MapChat will make use of authentication at the gateway
level. A successful authentication will then pass a JSON Web Token to each
microservice.

#### 4.2.4 Messaging Service

Implement all features related to sending, receiving and storing messages between
individuals and groups.

#### 4.2.5 Map Service

Responsible for interacting with the Google Maps API and storing a local map for the
user to limit loading delays while using MapChat.

#### 4.2.6 Flag Service

Allow users to place flags, consume other users flags and attach media to flags.

#### 4.2.7 Photo Service

Interacts with the mobile clients camera, storage or third party photo service to load
photos into MapChat

#### 4.2.8 Group Service

Manage the users MapChat group creation and modification.

#### 4.2.9 Friend Service

Maintains MapChat’s User Graph. Each user will have a set of friends managed through
this service. Friends can be found through MapChat accounts, email or phone number.


#### 4.2.10 User Service

This service maintains information about each MapChat user such as name and contact
information.

#### 4.2.11 Vendor Service

This service is intended as a future growth feature to show the expandability of the
architecture. Once MapChat has reached a suitable user base we will reach out to local
businesses to promote their business through pop-up flag-consumption based deals.

#### 4.2.12 Event Bus

Handles interservice communication.

### 4.3 Diagrams

Sequence and activity diagrams

## 5. External Interfaces

At this stage MapChat is only determining a broad outline for the system’s external
interfaces. Most importantly the system will implement the Gateway API as a means of
communicating with the system. This is the external interface our mobile application will
use. MapChat will also leverage the Google Maps API to implement our MapGroups
feature.

## 6. Use Cases

### 6.1 SignUp

#### 6.1.1. Participating actors

```
● End-user
```
#### 6.1.2 Entry condition

```
● User is inside the signup activity
```
#### 6.1.3 Normal Flow of Events

```
● User enters their email string into the email field
```

```
● User enters their desired alphanumeric password into the password field
● User enters a duplicate password into the duplicate password field
● User submits information
● System prompts the user with success
● System gives the user a unique ID
```
#### 6.1.4 Exceptions

##### 6.1.4.1 Account signup fails

```
● A duplicate email exists in the system
● User enters a non-alphanumeric password (illegal characters)
● User enters a password with insufficient length (minimum 8)
● User enters a non-duplicate password in the duplicate password field
```
#### 6.1.5 Exit condition

```
● System prompts the user with success
● User is redirected to the mapchat dashboard
```
#### 6.1.6 Nonfunctional requirements

```
● Account creation success email should be dispatched to the user email within a
reasonable amount of time
● Email and password data will be handled with sufficient security and privacy
protocols
```
### 6.2 CreateMapGroup

#### 6.2.1. Participating actors

```
● End-user
```
#### 6.2.2 Entry condition

```
● User is logged on
● User has access to primary dashboard
```
#### 6.2.3 Normal Flow of Events

```
● User navigates to the Create MapGroup activity
● System prompts user for a MapGroup name
● User selects a name for the new MapGroup
● System prompts user for an origin coordinate
```

```
● User selects origin coordinate
● System prompts user for a visibility parameter
● User selects visibility scope of the MapGroup (public, private)
● System prompts user for default privileges of invited members
● User selects default privileges of invited members
● System prompts user to invite friends
● User selects users from their friends list (if any) to invite to the MapGroup
● User submits information
```
#### 6.2.4 Exceptions

##### 6.2.4.1 Create MapGroup fails

```
● Invalid name (keyword restriction)
```
#### 6.2.5 Exit condition

```
● User is redirected to the MapGroup activity of the newly created MapGroup
```
### 6.3 SendFriendInvite

#### 6.3.1. Participating actors

```
● End-user
```
#### 6.3.2 Entry condition

```
● User is logged on
● User has access to primary dashboard
```
#### 6.3.3 Normal Flow of Events

```
● User selects the add friend view component from the dashboard
● System prompts user for friend ID
● User inputs friend ID
● System launches invite to friend
```
#### 6.3.4 Exceptions

##### 6.3.4.1 Friend is not added

```
● Invalid ID
```

#### 6.3.5 Exit condition

```
● User receives a success acknowledgement that the invite is sent
```
### 6.4 Use Case Diagrams

Insert

## 7. Conclusions

As a result of the MapChat team’s architecture research, the microservice architecture
was determined to be best suited for scaling with MapChat’s goal of exponential user
growth. The multiple individual apps that make up a microservice architecture, when
deployed on AWS, can have near-instant scaling up and down to dynamically meet
MapChat load requirements. This scalability comes at a cost of a longer initial
development time to implement a functioning product compared to MVC, layered or
implicit invocation systems. MapChat will still utilize these alternative architectures
within each microservice as applicable.

## 8. Lessons Learned

With such a variety of architecture styles available to choose from the initial research
phase is crucial for a project to start out right. The MapChat team could have chosen a
simple short-term implementation strategy, such as a layered approach. While viable,
this would bring numerous headaches down the road. With this eye to the future the
MapChat team has decided to face the steep climb and accept the high initial
investment cost of a microservices architecture.


