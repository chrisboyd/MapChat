# MapChat
Hyper-local social network

## Explanation of project

A lightweight, social media network focused on map-groups and uploading pictures as flags to those groups. 

## Economic benefits

A town or city can have their own official map-group
Popular restaurants (or unpopular) could pay to have their restaurant as a flag
Tourist locations are marked by flags
Important city locations are flagged (public libraries, city hall, firehouse, post office . . )
Different layers for city 
Restricted privileges for users

## Social benefits

Getting outside to build a collection of images / story with friends
Similar to Pokemon GO in some sense, gives certain people a reason / reward to exercise or just go outside
Exploring locations in your home city / place you may not have been before

## High-level Requirements

1. Users can sign up for an account, through an account creation process.
Priority: 1

2. Users can create a map-group, by selecting a location 
Priority: 1

3. Users can invite other users to join their own map-group.
Priority: 1

4. Users with sufficient privileges can remove other users from a map group.
Priority: 2

5. A map-group interface will have a chat box.
Priority: 2

6. Users can upload a photo to a map-group (through mobile app), where it will appear as a flag for other users to interact with. Photo has the coordinate meta data.
Priority: 1

7. Users can select a flag in a map-group (mouse-click, touchscreen press), that will launch the picture for viewing.
Priority: 1

8. Users can jump between different map-groups through a GUI. 
Priority : 1

9. Administrator users (those who created a map-group) can delegate group-member privileges: invitation, removal, chat-enabled, chat-muted
Priority: 2

10. User can choose to display only certain layers of flags. e.g: choose to only see one other user’s flags)
Priority: 2

## Challenges 

Map generation: This can be a blackbox in the prototype, but could be interesting or necessary to design. 

1. Handcraft maps for major cities (New York, Tokyo, Delhi . .), or start with Ontario and do the major cities. probably not feasible

2. Basic Custom map generation: scrape google maps or another service, take a static image from the map

3. Third party software or service: connect it to the system as a component

4. Develop more advanced map generation

High volume of users

## Functional requirements or use cases

Probably not necessary for assignment 1 

## Nonfunctional requirements

These could be worth mentioning in our presentation

## Priorities

1 = Essential
2 = Important
3 = Desirable, not completely necessary

Priority 1 items must be implemented for the system to operate.

Priority 2 items should be implemented, but can be leveraged if needed, and the system will still function.

Priority 3 items can be absent, but would be nice to have and would improve the product.

## Architecture styles

Model-view-controller





