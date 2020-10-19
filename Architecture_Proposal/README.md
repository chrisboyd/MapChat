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
* [Architecture Comparison](#architecture-comparison)
  * [Microservice Architecture](#microservice-architecture)
    * [Overview](#overview)
    * [Advantages](#advantages)
    * [Disadvantages](#disadvantages)
  * [Model-View-Controller](#model-view-controller)
    * [Overview](#overview)
    * [Advantages](#advantages)
    * [Disadvantages](#disadvantages)
  * [Layered Architecture](#layered-architecture)
    * [Overview](#overview)
    * [Advantages](#advantages)
    * [Disadvantages](#disadvantages)
  * [Implicit Invocation Architecture](#implicit-invocation-architecture)
    * [Overview](#overview)
    * [Advantages](#advantages)
    * [Disadvantages](#disadvantages)
* [Architecture Overview](#architecture-overview)
  * [MapChat Proposed Architecture](#mapchat-proposed-architecture)
  * [Proposed Services](#proposed-services)
    * [Overview](#overview)
* [Economic Benefits](#economic-benefits)
* [Value Beyond Existing Platforms](#value-beyond-existing-platforms)
* [User Story](#user-story)
* [Priorities](#priorities)
* [Challenges](#challenges)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

Current social networks are based around producing as large and widely-distributed groups as possible. While this approach is useful for remaining in contact with people all over the world and promoting your own social brand, it provides little value in increasing your quality of life on a day-to-day basis. MapChat seeks to promote and maintain a new form of hyper-local groups.

A hyper-local group means focusing on a small geographic area or around a well defined community. MapChat would create/maintain this new form of hyper-local groups by allowing the users to create a new community or join an existing one. The creation of a community is based on a geographical location. A community can be open for all or have restricted access, depending on the creator’s desires. Every group on the map can create their own flag. A prolific group’s flag can be a marker for adventure, thereby leading other groups to explore a new community or attraction. Each flag is linked with a picture and brief description of the area written by the group. MapChat will also have a messaging system so the users can communicate and build a vibrant community. Ultimately, the purpose of MapChat is to encourage our users to seek other adventurers in their neighbourhood.



### Built With
MapChat will be hosted on AWS. Further technologies are still being discussed. Any recommendations will be greatly appreciated and rewarded with a digital pint of beer.



<!-- GETTING STARTED -->
## Getting Started

Check back in once we have passed the initial Project Proposal Stage.

### Prerequisites

Check back in once we have passed the initial Project Proposal Stage.

### Installation

MapChat runs entirely within your mobile web browser so there will never be additional software to install.

### Interface

A clean and efficient interface will be key to the success of MapChat. Our first interface iteration is: 


<img src="https://github.com/chrisboyd/MapChat/blob/master/Docs/main_GUI_example.jpg" alt="Interface" width="360" height="663">


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
## Overview

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
## Overview
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
