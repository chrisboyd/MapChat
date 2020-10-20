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
  * [Use Case Diagrams](#use-case-diagrams)
* [Conclusions](#conclusions)
* [Lessons Learned](lessons-learned)
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

### Non-Functional Requirements

## Architecture Comparison

### Microservice Architecture

### Model-View-Controller

### Layered Architecture

### Implicit Invocation Architecture

## Architecture Overview

### MapChat Proposed Architecture

### Proposed Services

### Activity Diagrams

### Sequence Diagrams

## External Interfaces

## Use Cases

### SignUp

### CreateMapGroup

### SendFriendInvite

## Lessons Learned

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
